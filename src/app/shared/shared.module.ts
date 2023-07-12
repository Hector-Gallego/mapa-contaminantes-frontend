import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component'
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    NgbModule

  ],
  exports:[
    HeaderComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    NgbModule

  ]
})
export class SharedModule { }