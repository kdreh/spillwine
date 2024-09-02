import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessResearchComponent} from './business-research.component';

describe('BusinessResearchComponent', () => {
  let component: BusinessResearchComponent;
  let fixture: ComponentFixture<BusinessResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessResearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BusinessResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
