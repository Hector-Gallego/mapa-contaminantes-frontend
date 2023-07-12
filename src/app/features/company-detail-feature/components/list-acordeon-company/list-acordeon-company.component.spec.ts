import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcordeonCompanyComponent } from './list-acordeon-company.component';

describe('ListAcordeonCompanyComponent', () => {
  let component: ListAcordeonCompanyComponent;
  let fixture: ComponentFixture<ListAcordeonCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAcordeonCompanyComponent]
    });
    fixture = TestBed.createComponent(ListAcordeonCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
