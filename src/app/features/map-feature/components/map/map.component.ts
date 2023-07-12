import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { forkJoin } from 'rxjs';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMapComponent } from '../modal.map/modal.map.component'; 
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from 'src/app/core/services/company.service';
import { WaterService } from '../../services/water.service';
import { Water } from '../../models/water_coords/water';
import { Company } from 'src/app/core/models/company';





@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  map: Map | undefined;
  id: number = 1;
  companies: Company[] = [];
  water: Water | undefined;
  allCoordinates: number[][] = [];
  companyWaterCoords: number[][] = [];
  showLayers: boolean = false;
  addedSources: string[] = [];
  addedLayers: string[] = [];



  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private companyService: CompanyService,
    private waterService: WaterService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    const storedShowLayers = localStorage.getItem('showLayers');
    this.showLayers = storedShowLayers ? JSON.parse(storedShowLayers) : false;


  }


  ngOnDestroy(): void {
    this.map?.remove();
  }

  openModal() {
    this.modalService.open(ModalMapComponent); 
  }
  

 

  ngAfterViewInit(): void {

    this.getCompaniesAndWaterCoords();

    const initialState = { lng: -75.51672075924253, lat: 10.393758078010434, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=xs2zdJT6IQ73XlwWH5an`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    this.map.addControl(new NavigationControl({}), 'top-right');

  }


  getCompaniesAndWaterCoords(): void {

    forkJoin([
      this.companyService.getCompanies(),
      this.waterService.getWater()
    ]).subscribe(([companies, water]) => {

      this.companies = companies;
      this.water = water;

      water.features.forEach((feature) => {
        const coordinates = feature.geometry.coordinates;
        this.allCoordinates.push(...coordinates);
      });


      for (const company of this.companies) {
        
        const empresaLat = Number(company.latitude);
        const empresaLon = Number(company.longitude);

        const nearestRiverPoint = this.findNearestRiverPoint(empresaLat, empresaLon, this.allCoordinates);
        const distanceToNearestRiverPoint = this.calculateDistance(empresaLat, empresaLon, nearestRiverPoint[1], nearestRiverPoint[0]);

        this.companyWaterCoords.push([empresaLon, empresaLat]);
        this.companyWaterCoords.push(nearestRiverPoint);

        this.addedSources.push(`line-source-${company.name}`);
        this.addedLayers.push(`line-layer-${company.name}`);

        this.loadLayersMap(company);
        this.loadPopupAndMarker(company, distanceToNearestRiverPoint); 

        this.companyWaterCoords.splice(0);
      }

    });
  }

  removeLayers(): void {

    this.map?.setLayoutProperty('water-bodies-layer', 'visibility', this.showLayers ? 'visible' : 'none');

    for (const layerName of this.addedLayers) {
      if(this.map?.getLayer(layerName)){
        this.map?.setLayoutProperty(layerName, 'visibility', this.showLayers ? 'visible' : 'none');
      }   
    }
  }

  updateComponent(): void {
    localStorage.setItem('showLayers', JSON.stringify(this.showLayers));
    window.location.reload();
  }

  loadPopupAndMarker(company: Company, distRiver : number) : void{

    const url = `http://localhost:4200/company/detail`;
    const economyStr = this.getEconomyActivities(company);

    var popup = new Popup({ offset: 25, className: 'card-container' })
          .setMaxWidth('350px')
          .setHTML(
            ` 
            <div class="card">
              <div class="card-header text-bg-primary ">Información Basica</div>
              <div class="card-body">
                <h5 class="card-title">${company.name}</h5>
                <h6 class="card-subtitle mb-2 mt-3 text-body-secondary">Dirección</h6>
                <p class="card-text">${company.adress}</p>
              </div>
               
              
              <ul class="list-group list-group-flush">
                <h6 class="ms-3 mt-3 card-subtitle mb-2 text-body-secondary">Actividades Económicas</h6>
                <li class="list-group-item">${economyStr}</li>
              </ul>
              
              <div class="card-body">
                <a href="${url}/${company.id}" class="btn btn-primary">Detalles</a>
              </div>
              <div class="card-footer text-bg-primary">
                Distancia al cuerpo de agua mas cerano: ${distRiver.toFixed(3)} Km.
              </div>

            </div>
          `
          );

        new Marker({ color: "#FF0000" })
          .setLngLat([parseFloat(company.longitude), parseFloat(company.latitude)])
          .setPopup(popup)
          .addTo(this.map!);

  }
  

  loadLayersMap(company : Company): void{

    const lonCompany = this.companyWaterCoords[0][0];
        const latCompany = this.companyWaterCoords[0][1];
        const lonWater = this.companyWaterCoords[1][0];
        const latWater = this.companyWaterCoords[1][1];

    this.map?.on('style.load', () => {

      if (!this.map?.getSource('water-bodies')) {
        this.map?.addSource('water-bodies', {
          type: 'geojson',
          data: 'http://localhost:8080/api/geojson/data_water_bolivar'
        });

        this.map?.addLayer({
          id: 'water-bodies-layer',
          type: 'line',
          source: 'water-bodies',
          paint: {
            'line-color': 'blue', // Cambia 'red' por el color deseado, por ejemplo, '#ff0000' para rojo
            'line-width': 3 // Ancho de la línea en píxeles
          }
        });
      }

      this.map?.addSource(`line-source-${company.name}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              // Aquí colocas las coordenadas de la empresa y el río
              [lonCompany, latCompany],
              [lonWater, latWater],
            ],
          },
        },
      });

      this.map?.addLayer({
        id: `line-layer-${company.name}`,
        type: 'line',
        source: `line-source-${company.name}`,
        paint: {
          'line-color': 'red', // Cambia 'blue' por el color deseado
          'line-width': 1, // Cambia 2 por el grosor deseado en píxeles
        },
      });
      this.removeLayers();
    });

  }


  getEconomyActivities(company: Company): string {
    let economyActivitiesString = '';
    if (company && company.economyActivityCIIUs && company.economyActivityCIIUs.length > 0) {
      for (const activity of company.economyActivityCIIUs) {
        economyActivitiesString += activity.name + ', ';
      }
      economyActivitiesString = economyActivitiesString.slice(0, -2);
    }
    return economyActivitiesString;
  }



  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) : number{

    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }



   findNearestRiverPoint(empresaLat: number, empresaLon: number, riverPoints: any) {

    let minDistance = Infinity;
    let nearestPoint = null;

    for (const point of riverPoints) {
      
      const lat = point[1]; // Acceder a la latitud del punto
      const lon = point[0]; // Acceder a la longitud del punto

      const distance = this.calculateDistance(empresaLat, empresaLon, lat, lon);

      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    }
    return nearestPoint;
  }

}
