import { Component, ElementRef, ViewChild } from '@angular/core';
import { Result } from '../../models/result';
import { PageableService } from '../../services/pageable.service';
import { Company } from 'src/app/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-company.list',
  templateUrl: './company.list.component.html',
  styleUrls: ['./company.list.component.css']
})
export class CompanyListComponent {

  result:Result | undefined;
  content: Company[] = [];
  page: number = 1;
  size: number = 6;
  totalElements: number = 0;
  currentPage: number = 1;

  loading : boolean = true;

  @ViewChild('container') containerElementRef!: ElementRef;
  

  constructor(private pageableService : PageableService,
    private companyService: CompanyService,
    private router: Router){}

  ngOnInit(): void{
    this.getResults();
    
  }

  getActivities(company : Company){
    return this.companyService.getEconomyActivities(company);
   
  }


  getResults() : void{
    this.pageableService.getResults(this.currentPage-1, this.size).subscribe((res)=>{
      this.result = res;
      this.content = res.content;
      this.totalElements = res.totalElements;
      console.log(this.result);
      
      this.loading = false;
    });
   
  }

  onPaginationChanged(page: number): void {
    this.currentPage = page;
    this.getResults();
    this.containerElementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
 
  }

  goToRouteCompanyDetail(id: number) {
    this.router.navigate([`/company/detail/${id}`]);
  }

  goToRouteMap(lat: string, lng:string) {
    this.router.navigate([`/map/${lat}/${lng}`]);
  }

}
