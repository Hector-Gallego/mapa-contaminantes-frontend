import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticsService } from '../../services/statistics.service';
import { StatisticsDto } from '../../models/statisticsDto';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graphic-residuals-count-companies',
  templateUrl: './graphic.residuals.count.companies.component.html',
  styleUrls: ['./graphic.residuals.count.companies.component.css']
})
export class GraphicResidualsCountCompaniesComponent {

  constructor(private stattisticsService: StatisticsService) { }

  data: StatisticsDto[] = [];
  codes: string[] = [];
  counts: number[] = [];
  max: number = 0;


  ngOnInit(): void {

    this.getStatistics();
  }

  getStatistics(): void {

    this.stattisticsService.getResidualCountCompaniesStatistics()
      .subscribe((data) => {
        this.data = data;

        this.codes = data.map(item => `Corriente: ${item.code}`);
        this.counts = data.map(item => Number(item.count));
        this.max = Math.max(...this.counts) + 100;



        this.pieChartData.labels = this.codes;
        this.pieChartData.datasets[0].data = this.counts;

        this.chart?.chart?.update();

      });

  }
 
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
          return;
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'cantidad de empresas asociadas a este residuo'
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];









}


