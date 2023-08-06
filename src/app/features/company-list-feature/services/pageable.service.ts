import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PageableService {

  constructor(private http: HttpClient) { }
  getResults(page: number , size: number) : Observable<Result>{
    const resultUrl = `${environment.apiUrl}/companies/pages?page=${page}&size=${size}`;
    return this.http.get<Result>(resultUrl);
  }

}
