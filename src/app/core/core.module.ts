import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapFeatureModule } from '../features/map-feature/map.feature.module';
import { CompanyDetailsModule } from '../features/company-detail-feature/company.detail.module';
import { CompanyListModule } from '../features/company-list-feature/company.list.module';
import { DashboardFeatureModule } from '../features/dashboard-feature/dashboard.feature.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapFeatureModule,
    CompanyDetailsModule,
    CompanyListModule,
    DashboardFeatureModule
  ]
})
export class CoreModule { }