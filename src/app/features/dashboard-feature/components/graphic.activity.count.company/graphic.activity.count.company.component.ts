import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { StatisticsService } from '../../services/statistics.service';
import { StatisticsDto } from '../../models/statisticsDto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphic-activity-count-company',
  templateUrl: './graphic.activity.count.company.component.html',
  styleUrls: ['./graphic.activity.count.company.component.css']
})
export class GraphicActivityCountCompanyComponent {

  constructor(private stattisticsService: StatisticsService) { }

  data: StatisticsDto[] = [];
  codes: string[] = [];
  counts: number[] = [];


  ngOnInit(): void {

    this.getStatistics();
  }

  getStatistics(): void {

    this.stattisticsService.getActivityCountCompanyStatistics()
      .subscribe((data) => {
        this.data = data;
      
        this.codes = data.map(item => `CIIU: ${item.code}`);
        this.counts = data.map(item => Number(item.count));
      
        this.barChartData.labels = this.codes;

        this.barChartData.datasets[0].data = this.counts;
        this.chart?.chart?.update();

      });

  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'bottom'
      }
    },
    backgroundColor: '#9eeaf9'
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DatalabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Cantidad de empresas a la que está asociada esta actividad económica'
      },
    ],

  };

}
