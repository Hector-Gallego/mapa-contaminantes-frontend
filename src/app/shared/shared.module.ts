import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SppinerComponent } from './components/sppiner/sppiner.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ToastComponent } from './components/toast/toast.component';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SppinerComponent,
    NotfoundComponent,
    ToastComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgbModule

  ],
  exports:[
    HeaderComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SppinerComponent,
    NotfoundComponent,
    ToastComponent,
    ErrorComponent
    

  ]
})
export class SharedModule { }