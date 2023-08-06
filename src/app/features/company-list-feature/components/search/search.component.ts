import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, share, switchMap } from 'rxjs';
import { Company } from 'src/app/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {

  companies$!: Observable<Company[]>;
  isSearching: boolean = false;
  loading: boolean = false;

  companies: Company[] = [];
  searchTerm: string = '';

  constructor(private companyService: CompanyService, private toastService: ToastService) {}

  search(): void {

    this.loading = true;

    this.companyService.searchCompany(this.searchTerm)
      .subscribe((companies: Company[]) => {
        this.companies = companies;
        this.loading= false;

        if(companies.length ===0 && this.loading===false){
          this.toastService.show('No se encontraronn coincidencias', {classname: 'bg-danger text-light', delay: 5000});


        }
        
        
      });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.companies = [];
  }

}
