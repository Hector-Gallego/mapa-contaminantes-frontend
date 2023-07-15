import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CompanyListComponent } from './components/company.list/company.list.component';
import { CompanyListRoutingModule } from "./company.list.routing.module";
import { SearchComponent } from './components/search/search.component';

@NgModule({

    declarations: [
        CompanyListComponent,
        SearchComponent
    ],
    imports: [
        SharedModule,
        CompanyListRoutingModule
    ],
    exports: [
        CompanyListComponent
    ]

})

export class CompanyListModule { }
