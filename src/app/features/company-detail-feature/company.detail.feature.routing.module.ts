
import { RouterModule, Routes } from "@angular/router";
import { DetailCompanyComponent } from "./components/detail.company/detail.company.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: 'company/detail/:id', component: DetailCompanyComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class CompanyDetailsFeatureRoutingModule{}

