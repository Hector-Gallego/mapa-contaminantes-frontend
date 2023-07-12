import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoreRoutingModule } from './core/core.routing.module';
import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    CoreRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
