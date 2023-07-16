import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Company } from 'src/app/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {

  companies$!: Observable<Company[]>;
  isSearching: boolean = false;

  private searchTerms = new Subject<string>();
  @ViewChild('searchBox', { static: false }) searchBox!: ElementRef;


  constructor(private companyService: CompanyService) {}

  search(term: string): void {
    this.searchTerms.next(term);
    this.isSearching = term.length > 0;
  }

  clearSearchBox(): void{
    this.isSearching = false;
    if (this.searchBox) {
      this.searchBox.nativeElement.value = '';
    }
    this.searchTerms.next('');
  }

  ngOnInit(): void {
    this.companies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.companyService.searchCompany(term)),
    );
  }

}
