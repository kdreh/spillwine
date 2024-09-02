import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarketingResComponent} from './marketing-res.component';

describe('MarketingResComponent', () => {
  let component: MarketingResComponent;
  let fixture: ComponentFixture<MarketingResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingResComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MarketingResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
