import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { forkJoin } from 'rxjs';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMapComponent } from '../modal.map/modal.map.component';
import { CompanyService } from 'src/app/core/services/company.service';
import { WaterService } from '../../services/water.service';
import { Water } from '../../models/water_coords/water';
import { Company } from 'src/app/core/models/company';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  map: Map | undefined;
  companies: Company[] = [];
  water: Water | undefined;
  allCoordinatesLine: number[][] = [];
  allCoordinatesPolygon: number[] = [];
  companyWaterCoords: number[][] = [];
  hasParams: boolean = false;
  initialState = {
    lat: 10.327510146503977,
    lng: -75.5022481625158,
    zoom: 10
  };
  showLayers: boolean = false;
  addedSources: string[] = [];
  addedLayers: string[] = [];
  loading: boolean = true;

  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  constructor(private companyService: CompanyService,
    private waterService: WaterService,
    private modalService: NgbModal,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const storedShowLayers = localStorage.getItem('showLayers');
    this.showLayers = storedShowLayers ? JSON.parse(storedShowLayers) : false;
    this.verifyParams();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.getCompaniesAndWaterCoords();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  initializeMap(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=xs2zdJT6IQ73XlwWH5an`,
      center: [this.initialState.lng, this.initialState.lat,],
      zoom: this.initialState.zoom
    });
    this.map.addControl(new NavigationControl({}), 'top-right');
  }

  getCompaniesAndWaterCoords(): void {

    forkJoin([
      this.companyService.getCompanies(),
      this.waterService.getWater()
    ]).subscribe(([companies, water])=>{
        this.companies = companies;
        this.water = water;
        this.extractCoordinatesFromFeatures(this.water);
        this.calculateMinDistanceAndaddLayersToMap(this.companies);
        this.loading = false;   
    });

  }

  verifyParams(): void {

    const params = this.activatedRoute.snapshot.params;
    this.hasParams = params.hasOwnProperty('lat') && params.hasOwnProperty('lng');

    if (this.hasParams) {
      const lat = Number(params['lat']);
      const lon = Number(params['lng']);
      this.initialState.lat = lat;
      this.initialState.lng = lon;
      this.initialState.zoom = 20;
    }

  }

  loadPopupAndMarker(company: Company, distRiver: number): void {

    const url = `http://localhost:4200/company/detail`;
    const economyStr = this.companyService.getEconomyActivities(company);

    var popup = new Popup({ offset: 25, className: 'card-container' })
      .setMaxWidth('350px')
      .setHTML(
        ` 
     
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-primary">${company.name}</h5>
                 </div>
                <ul class="list-group list-group-flush">
                    <li  class="list-group-item">
                        <h6><i class="bi bi-pin-map-fill me-3"></i>Dirección:</h6>
                        <p>${company.adress}</p>       
                    </li>
                    <li class="list-group-item">
                        <h6 ><i class="bi bi-gear me-3"></i>Actividades económicas</h6>
                        <p>${economyStr}</p>
                        
                    </li>
                   
                </ul>
                <div class="card-body">
                  <a href="${url}/${company.id}" class="btn btn-outline-primary w-100">Detalles</a>
             
                </div>
                <div class="card-footer">
                  Distancia al cuerpo de agua más cercano: ${distRiver.toFixed(3)} Km.
                </div>
              </div>
          `
      );

    new Marker({ color: "#FF0000" })
      .setLngLat([parseFloat(company.longitude), parseFloat(company.latitude)])
      .setPopup(popup)
      .addTo(this.map!);

  }

  loadLayersMap(company: Company): void {

    const lonCompany = this.companyWaterCoords[0][0];
    const latCompany = this.companyWaterCoords[0][1];
    const lonWater = this.companyWaterCoords[1][0];
    const latWater = this.companyWaterCoords[1][1];

    this.map?.on('load', () => {

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
            'line-color': 'blue',
            'line-width': 3
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
          'line-color': 'red',
          'line-width': 1,
        },
      });
      this.removeLayers();
    });

  }

  removeLayers(): void {

    this.map?.setLayoutProperty('water-bodies-layer', 'visibility', this.showLayers ? 'visible' : 'none');
    for (const layerName of this.addedLayers) {
      if (this.map?.getLayer(layerName)) {
        this.map?.setLayoutProperty(layerName, 'visibility', this.showLayers ? 'visible' : 'none');
      }
    }
  }

  extractCoordinatesFromFeatures(water: Water): void {

    water.features.forEach((feature) => {
      if (feature.geometry.type === 'LineString') {
        const coordinatesLine = feature.geometry.coordinates;
        this.allCoordinatesLine.push(...coordinatesLine);
      } else {
        const coordinatesPolygon = feature.geometry.coordinates;
        this.allCoordinatesPolygon = this.allCoordinatesPolygon.concat(...coordinatesPolygon);
      }
    });

  }

  calculateMinDistanceAndaddLayersToMap(companies: any): void {

    for (const company of companies) {

      const empresaLat = Number(company.latitude);
      const empresaLon = Number(company.longitude);
      const nearestRiverPointPolygono = this.findNearestRiverPoint(empresaLat, empresaLon, this.allCoordinatesPolygon);
      const nearestRiverPointLine = this.findNearestRiverPoint(empresaLat, empresaLon, this.allCoordinatesLine);
      const distanceToNearestRiverPointPolygono = this.calculateDistance(empresaLat, empresaLon, nearestRiverPointPolygono[1], nearestRiverPointPolygono[0]);
      const distanceToNearestRiverPoinLine = this.calculateDistance(empresaLat, empresaLon, nearestRiverPointLine[1], nearestRiverPointLine[0]);

      this.companyWaterCoords.push([empresaLon, empresaLat]);

      if (distanceToNearestRiverPointPolygono <= distanceToNearestRiverPoinLine) {
        this.companyWaterCoords.push(nearestRiverPointPolygono);
        this.loadPopupAndMarker(company, distanceToNearestRiverPointPolygono);
      } else {
        this.companyWaterCoords.push(nearestRiverPointLine);
        this.loadPopupAndMarker(company, distanceToNearestRiverPoinLine);
      }

      this.addedSources.push(`line-source-${company.name}`);
      this.addedLayers.push(`line-layer-${company.name}`);
      this.loadLayersMap(company);
      this.companyWaterCoords.splice(0);
    }

  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {

    const R = 6371;
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

      const x = 1;
      const lat = point[1];
      const lon = point[0];
      const distance = this.calculateDistance(empresaLat, empresaLon, lat, lon);

      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    }
    return nearestPoint;
  }

  updateComponent(): void {
    localStorage.setItem('showLayers', JSON.stringify(this.showLayers));
    window.location.reload();
  }

  openModal() {
    this.modalService.open(ModalMapComponent);
  }
}

