import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalMapComponent } from './components/modal.map/modal.map.component';
import { DetailCompanyComponent } from './components/detail.company/detail.company.component';
import { AcordeonCompanyComponent } from './components/acordeon.company/acordeon.company.component';
import { ListAcordeonCompanyComponent } from './components/list-acordeon-company/list-acordeon-company.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    ModalMapComponent,
    DetailCompanyComponent,
    AcordeonCompanyComponent,
    ListAcordeonCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
