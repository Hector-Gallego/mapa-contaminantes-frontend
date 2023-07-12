import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from '../features/map-feature/components/map/map.component';

const routes: Routes = [
   
    {
        path: 'company/detail/:id',
        loadChildren: () => import('../features/company-detail-feature/company.detail.module')
            .then(m => m.CompanyDetailsModule)
    },
    {
        path: 'map',
        loadChildren: () => import('../features/map-feature/map.feature.module')
            .then(m => m.MapFeatureModule)
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }