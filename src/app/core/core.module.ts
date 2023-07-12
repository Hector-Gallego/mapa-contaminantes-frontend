import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapFeatureModule } from '../features/map-feature/map.feature.module';
import { CompanyDetailsModule } from '../features/company-detail-feature/company.detail.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapFeatureModule,
    CompanyDetailsModule
  ]
})
export class CoreModule { }