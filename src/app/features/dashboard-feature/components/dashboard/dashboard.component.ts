import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StatisticsService } from '../../services/statistics.service';
import { TotalStatisticsByCompanyDto } from '../../models/totalStatisticsByCompanyDto';
import { TotalAllStatisticsDto } from '../../models/totalAllStatisticsDto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(private stattisticsService: StatisticsService) { }

  totalStatisticsByCompanies: TotalAllStatisticsDto | undefined;
  totalAllStatistics: TotalAllStatisticsDto | undefined;

  AsoComData:number[] = [];
  totalData: number[] = [];



  getTotalStatistics(): void {

    forkJoin([

      this.stattisticsService.getCountAllCompanysActivitiesResiduals(),
      this.stattisticsService.getAllCountCompaniesResidualsAndActivities()

    ]).subscribe(([totalAllStatistics, totalStatisticsByCompanies]) => {

      this.totalAllStatistics = totalAllStatistics;
      this.totalStatisticsByCompanies = totalStatisticsByCompanies;

      this.totalData.push(this.totalAllStatistics.countCompany);
      this.totalData.push(this.totalAllStatistics.countEconomyActivities);
      this.totalData.push(this.totalAllStatistics.countResidualsCurrents);

      this.AsoComData.push(0);
      this.AsoComData.push(this.totalStatisticsByCompanies.countEconomyActivities);
      this.AsoComData.push(this.totalStatisticsByCompanies.countResidualsCurrents);

      
      this.barChartData.datasets[0].data = this.AsoComData;
      this.barChartData.datasets[1].data = this.totalData;
      this.chart?.chart?.update();

      console.log(this.totalData);
      console.log(this.totalStatisticsByCompanies);
      
      

    });

  }

  ngOnInit(): void{
    this.getTotalStatistics();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['Empresas', 'Actividades Económicas', 'Corrientes de residuos'],
    datasets: [
      { data: [18, 30, 20], label: 'Asociados con empresas' },
      { data: [0, 48, 40], label: 'Registros totales' }
    ]
  };


}
