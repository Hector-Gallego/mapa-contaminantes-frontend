import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicActivityCountCompanyComponent } from './graphic.activity.count.company.component';

describe('GraphicActivityCountCompanyComponent', () => {
  let component: GraphicActivityCountCompanyComponent;
  let fixture: ComponentFixture<GraphicActivityCountCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicActivityCountCompanyComponent]
    });
    fixture = TestBed.createComponent(GraphicActivityCountCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
