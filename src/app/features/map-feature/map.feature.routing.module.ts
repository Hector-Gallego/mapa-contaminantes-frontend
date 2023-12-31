import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./components/map/map.component";

const routes: Routes = [
    {path: 'map', component: MapComponent},
    { path: 'map/:lat/:lng', component: MapComponent }
];

@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class MapFeatureRoutingModule{}

