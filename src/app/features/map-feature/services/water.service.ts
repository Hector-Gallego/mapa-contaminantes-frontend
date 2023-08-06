import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Water } from '../models/water_coords/water';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WaterService {
 
  //private waterUrl = `${environment.apiUrl}/geojson/data_water_bolivar`;
  private waterUrl = `https://hector-gallego.github.io/api-json/data_water_bolivar_4.geojson`;
  constructor(private http: HttpClient) { }

  getWater() : Observable<Water>{
    return this.http.get<Water>(this.waterUrl);
  }
}
