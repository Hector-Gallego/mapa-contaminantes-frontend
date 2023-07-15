import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicResidualsCountActivitiesComponent } from './graphic.residuals.count.activities.component';

describe('GraphicResidualsCountActivitiesComponent', () => {
  let component: GraphicResidualsCountActivitiesComponent;
  let fixture: ComponentFixture<GraphicResidualsCountActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicResidualsCountActivitiesComponent]
    });
    fixture = TestBed.createComponent(GraphicResidualsCountActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
