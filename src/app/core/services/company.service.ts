import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  searchCompany(term: string): Observable<Company[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Company[]>(`${this.companysUrl}/term/${term}`);
  }
}
