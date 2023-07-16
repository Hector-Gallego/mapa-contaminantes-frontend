import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../shared/components/notfound/notfound.component';


const routes: Routes = [

    {path: '', redirectTo: '/map', pathMatch: 'full'}, 
    {
        path: 'company/detail/:id',
        loadChildren: () => import('../features/company-detail-feature/company.detail.module')
            .then(m => m.CompanyDetailsModule)
    },
    {
        path: 'map',
        loadChildren: () => import('../features/map-feature/map.feature.module')
            .then(m => m.MapFeatureModule)
    },
    {
        path: 'company/list',
        loadChildren: () => import('../features/company-list-feature/company.list.module')
            .then(m => m.CompanyListModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('../features/dashboard-feature/dashboard.feature.module')
            .then(m => m.DashboardFeatureModule)
    },
    { path: '**', component: NotfoundComponent }



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }