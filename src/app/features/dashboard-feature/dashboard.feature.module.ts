import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardFeatureRoutingModule } from "./dashboard.feature.routing.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgChartsModule } from "ng2-charts";
import { GraphicActivityCountCompanyComponent } from './components/graphic.activity.count.company/graphic.activity.count.company.component';
import { GraphicCompaniesCountResidualsActivitiesComponent } from './components/graphic.companies.count.residuals.activities/graphic.companies.count.residuals.activities.component';
import { GraphicResidualsCountActivitiesComponent } from './components/graphic.residuals.count.activities/graphic.residuals.count.activities.component';
import { GraphicResidualsCountCompaniesComponent } from './components/graphic.residuals.count.companies/graphic.residuals.count.companies.component';
@NgModule({

    declarations:[
    DashboardComponent,
    GraphicActivityCountCompanyComponent,
    GraphicCompaniesCountResidualsActivitiesComponent,
    GraphicResidualsCountActivitiesComponent,
    GraphicResidualsCountCompaniesComponent
  ],
    imports: [
        SharedModule,
        DashboardFeatureRoutingModule,
        NgChartsModule
    ],
    exports:[
      DashboardComponent
    ],

})

export class DashboardFeatureModule{}