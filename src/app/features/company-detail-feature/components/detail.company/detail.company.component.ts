import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/core/models/company';

import { CompanyService } from 'src/app/core/services/company.service';





@Component({
  selector: 'app-detail-company',
  templateUrl: './detail.company.component.html',
  styleUrls: ['./detail.company.component.css']
})
export class DetailCompanyComponent {

  panelOpenState = false;

  company : Company | undefined;
  constructor(private route: ActivatedRoute,
     private companyService : CompanyService){}

     ngOnInit() : void{
      this.getCompany();
     }

     getCompany(): void{
      const id = Number(this.route.snapshot.paramMap.get('id'))
      this.companyService.getCompany(id)
        .subscribe((company) =>{
          this.company = company;

          company.economyActivityCIIUs.forEach((eco)=>{

            console.log(eco.centralProductClasificationCPCs);
          });        
          
        });   
     }
}
