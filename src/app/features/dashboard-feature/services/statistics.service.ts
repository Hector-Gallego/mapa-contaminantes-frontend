import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StatisticsDto } from "../models/statisticsDto";
import { TotalStatisticsByCompanyDto } from "../models/totalStatisticsByCompanyDto";
import { TotalAllStatisticsDto } from "../models/totalAllStatisticsDto";

@Injectable({
    providedIn:'root'
})

export class StatisticsService{

    private staticsUrl = 'http://localhost:8080/api/statistics';

    constructor(private http: HttpClient){}

    //listo
    getActivityCountCompanyStatistics(): Observable<StatisticsDto[]>{
        return this.http.get<StatisticsDto[]>(`${this.staticsUrl}/activity-count-company`)
    }

    //listo
    getResidualCountActivitiesStatistics(): Observable<StatisticsDto[]>{
        return this.http.get<StatisticsDto[]>(`${this.staticsUrl}/residual-count-activity`)
    }

    getResidualCountCompaniesStatistics(): Observable<StatisticsDto[]>{
        return this.http.get<StatisticsDto[]>(`${this.staticsUrl}/residual-count-company`)
    }

    //listo
    getCompaniesCountResidualsAndActivities(): Observable<TotalStatisticsByCompanyDto[]>{
        return this.http.get<TotalStatisticsByCompanyDto[]>(`${this.staticsUrl}/company-count-residual-activity`)
    }

    //listo
    getAllCountCompaniesResidualsAndActivities(): Observable<TotalAllStatisticsDto>{
        return this.http.get<TotalAllStatisticsDto>(`${this.staticsUrl}/total-statistics`)
    }

    //listo
    getCountAllCompanysActivitiesResiduals(): Observable<TotalAllStatisticsDto>{
        return this.http.get<TotalAllStatisticsDto>(`${this.staticsUrl}/total-all-statistics`)
    }
    

    
   


}