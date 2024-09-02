import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationResComponent} from './operation-res.component';

describe('OperationResComponent', () => {
  let component: OperationResComponent;
  let fixture: ComponentFixture<OperationResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationResComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OperationResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
