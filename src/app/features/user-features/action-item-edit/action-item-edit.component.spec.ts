import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionItemEditComponent } from './action-item-edit.component';

describe('ActionItemEdit', () => {
  let component: ActionItemEditComponent;
  let fixture: ComponentFixture<ActionItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionItemEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
