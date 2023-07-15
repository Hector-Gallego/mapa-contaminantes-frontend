import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StatisticsService } from '../../services/statistics.service';
import { TotalStatisticsByCompanyDto } from '../../models/totalStatisticsByCompanyDto';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-graphic-companies-count-residuals-activities',
  templateUrl: './graphic.companies.count.residuals.activities.component.html',
  styleUrls: ['./graphic.companies.count.residuals.activities.component.css']
})
export class GraphicCompaniesCountResidualsActivitiesComponent {

  totalStatistics: TotalStatisticsByCompanyDto[] = [];
  companiesNames: string[] = [];
  residualsCount: number[] = [];
  economyActivitiesCount: number[] = [];


  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void {

    this.statisticsService.getCompaniesCountResidualsAndActivities()
      .subscribe((data) => {

        this.companiesNames = data.map(item => String(item.companyName));
        this.economyActivitiesCount = data.map(item =>(item.activityCount));
        this.residualsCount = data.map(item => (item.residualCount));

        this.totalStatistics = data;
        this.radarChartData.labels = this.companiesNames;
      

        this.radarChartData.datasets[0].data = this.economyActivitiesCount;
        this.radarChartData.datasets[1].data = this.residualsCount;

      

        this.chart?.chart?.update();
        

      });

  }


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
 


  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Actividades Economicas asociadas'
      },
      {
        data: [],
        label: 'Corrientes de Residuos asociadas'
      }
    ]
  };





  public radarChartType: ChartType = 'radar';

}
