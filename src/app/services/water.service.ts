import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Water } from '../models/water_coords/water';


@Injectable({
  providedIn: 'root'
})
export class WaterService {

  private waterUrl = 'http://localhost:8080/api/geojson/data_water_bolivar';

  constructor(private http: HttpClient) { }

  getWater() : Observable<Water>{
    return this.http.get<Water>(this.waterUrl);
  }
}
