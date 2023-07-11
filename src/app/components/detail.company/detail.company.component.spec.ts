import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCompanyComponent } from './detail.company.component';

describe('DetailCompanyComponent', () => {
  let component: DetailCompanyComponent;
  let fixture: ComponentFixture<DetailCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCompanyComponent]
    });
    fixture = TestBed.createComponent(DetailCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
