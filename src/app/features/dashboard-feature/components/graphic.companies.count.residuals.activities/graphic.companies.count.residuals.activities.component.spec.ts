import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicCompaniesCountResidualsActivitiesComponent } from './graphic.companies.count.residuals.activities.component';

describe('GraphicCompaniesCountResidualsActivitiesComponent', () => {
  let component: GraphicCompaniesCountResidualsActivitiesComponent;
  let fixture: ComponentFixture<GraphicCompaniesCountResidualsActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicCompaniesCountResidualsActivitiesComponent]
    });
    fixture = TestBed.createComponent(GraphicCompaniesCountResidualsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
