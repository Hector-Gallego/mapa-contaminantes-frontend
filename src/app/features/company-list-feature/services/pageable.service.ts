import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';



@Injectable({
  providedIn: 'root'
})
export class PageableService {

  constructor(private http: HttpClient) { }
  getResults(page: number , size: number) : Observable<Result>{
    const resultUrl = `http://localhost:8080/api/companies/pages?page=${page}&size=${size}`
    return this.http.get<Result>(resultUrl);
  }

}
