import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { StatisticsService } from '../../services/statistics.service';
import { StatisticsDto } from '../../models/statisticsDto';

@Component({
  selector: 'app-graphic-residuals-count-activities',
  templateUrl: './graphic.residuals.count.activities.component.html',
  styleUrls: ['./graphic.residuals.count.activities.component.css']
})
export class GraphicResidualsCountActivitiesComponent {

  constructor(private stattisticsService: StatisticsService) { }

  data: StatisticsDto[] = [];
  codes: string[] = [];
  counts: number[] = [];
  max : number = 0;


  ngOnInit(): void {

    this.getStatistics();
  }

  getStatistics(): void {

    this.stattisticsService.getResidualCountActivitiesStatistics()
      .subscribe((data) => {
        this.data = data;
      
        this.codes = data.map(item => `Corriente: ${item.code}`);
        this.counts = data.map(item => Number(item.count));
        this.max = Math.max(...this.counts) + 100;

       

        this.barChartData.labels = this.codes;
        this.barChartData.datasets[0].data = this.counts;

        this.chart?.chart?.update();
        


      });

  }
  //bar
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        anchor: 'end',
        align: 'bottom'
      }
    },
    backgroundColor: '#ffa1b5'
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
        label: 'Cantidad de Actividades economicas asociadas a este residuo'
      },
    ],

  };

}
