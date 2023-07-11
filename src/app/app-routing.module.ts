import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { DetailCompanyComponent } from './components/detail.company/detail.company.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  {path: 'map', component: MapComponent},
  {path: 'company/detail/:id', component: DetailCompanyComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
