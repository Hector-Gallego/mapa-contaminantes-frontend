import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { ModalMapComponent } from './components/modal.map/modal.map.component';
import { MapFeatureRoutingModule } from './map.feature.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MapComponent,
    ModalMapComponent,
  ],
  imports: [
    MapFeatureRoutingModule,
    SharedModule

  ],
  exports:[
    MapComponent
  ]
})
export class MapFeatureModule { }