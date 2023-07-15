import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicResidualsCountCompaniesComponent } from './graphic.residuals.count.companies.component';

describe('GraphicResidualsCountCompaniesComponent', () => {
  let component: GraphicResidualsCountCompaniesComponent;
  let fixture: ComponentFixture<GraphicResidualsCountCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicResidualsCountCompaniesComponent]
    });
    fixture = TestBed.createComponent(GraphicResidualsCountCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
