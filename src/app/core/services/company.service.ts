import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Company } from '../models/company';
import { CompanyDto } from '../models/company.dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companysUrl = `${environment.apiUrl}/companies`;

  constructor(private http: HttpClient) { }

  getCompanies() : Observable<CompanyDto[]>{
    return this.http.get<CompanyDto[]>(this.companysUrl);
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

  getEconomyActivitiesDto(company: CompanyDto): string {
    let economyActivitiesString = '';
    if (company && company.economyActivities && company.economyActivities.length > 0) {
      economyActivitiesString = company.economyActivities.join(', ');
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
