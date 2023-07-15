import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./components/company.list/company.list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: 'company/list', component: CompanyListComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class CompanyListRoutingModule{}
