import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companysUrl = 'http://localhost:8080/api/companies'

  constructor(private http: HttpClient) { }

  getCompanies() : Observable<Company[]>{
    return this.http.get<Company[]>(this.companysUrl);
  }

  getCompany(id:number) : Observable<Company>{
    const url = `${this.companysUrl}/${id}`;
    return this.http.get<Company>(url);
  }
}