import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationRecComponent} from './operation-rec.component';

describe('OperationRecComponent', () => {
  let component: OperationRecComponent;
  let fixture: ComponentFixture<OperationRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationRecComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OperationRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
