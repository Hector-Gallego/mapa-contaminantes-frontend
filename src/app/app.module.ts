import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoreRoutingModule } from './core/core.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { GlobalErrorHandler } from './core/errors/global.error.handler';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    CoreRoutingModule,
    SharedModule,
    BrowserModule,  
  ],
  providers: [

    {provide: ErrorHandler, useClass: GlobalErrorHandler}
   
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
