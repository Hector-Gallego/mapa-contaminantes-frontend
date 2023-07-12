import { NgModule } from "@angular/core";
import { DetailCompanyComponent } from "./components/detail.company/detail.company.component";
import { ListAcordeonCompanyComponent } from "./components/list-acordeon-company/list-acordeon-company.component";
import { AcordeonCompanyComponent } from "./components/acordeon.company/acordeon.company.component";
import { CompanyDetailsFeatureRoutingModule } from "./company.detail.feature.routing.module";
import { SharedModule } from "src/app/shared/shared.module";
@NgModule({
    declarations: [
        DetailCompanyComponent,
        ListAcordeonCompanyComponent,
        AcordeonCompanyComponent
    ],
    imports: [
        CompanyDetailsFeatureRoutingModule,
        SharedModule
    ],
    exports: [
        DetailCompanyComponent,   
    ]
})

export class CompanyDetailsModule{}