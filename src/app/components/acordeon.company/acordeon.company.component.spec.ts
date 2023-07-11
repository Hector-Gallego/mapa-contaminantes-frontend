import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordeonCompanyComponent } from './acordeon.company.component';

describe('AcordeonCompanyComponent', () => {
  let component: AcordeonCompanyComponent;
  let fixture: ComponentFixture<AcordeonCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcordeonCompanyComponent]
    });
    fixture = TestBed.createComponent(AcordeonCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
