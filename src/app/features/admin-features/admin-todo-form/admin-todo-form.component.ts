import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { AccessCodeService } from "../../../services/access-code.service";
import { Subscription } from "rxjs";
import { UserProfileService } from "../../../services/user-profile.service"; // Ensure this path is correct
import { TodoService } from "../../../services/todo.service";
import { ToastrService } from 'ngx-toastr';
import {SplashScreenComponent} from "../../../shared/components/splash-screen/splash-screen.component";
import {BackComponent} from "../../../shared/components/back/back.component";

@Component({
  selector: 'app-admin-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    TitleComponent,
    SplashScreenComponent,
    BackComponent
  ],
  templateUrl: './admin-todo-form.component.html',
  styleUrls: ['./admin-todo-form.component.scss']
})
export class AdminTodoFormComponent implements OnInit, OnDestroy {

  private accessCodeService = inject(AccessCodeService);
  private userDetailsService = inject(UserProfileService);
  private subscription: Subscription;
  private accessCode: string | null = '';
  private todoService = inject(TodoService);
  todoForm: FormGroup;
  entrepreneursControl: FormControl<number[] | null> = new FormControl<number[] | null>(null);
  entrepreneurs: any[] = [];
  category = [
    'Business Foundation',
    'Problem Solution Validation',
    'GTM Strategy',
    'Product',
    'Traction',
    'Team Key Hires',
    'GTM Strategy',
    'Company Policies (i.e., Mission, Vision, Values)',
    'Funding Readiness',
    'Brand Identity',
    'Marketing & Social Media',
    'ASC Participation'
  ];
  measuredByOptions = ['Yes or No', 'Numerical']; // Updated to match the options
  targetValueOptions =  ['Yes', 'No'];

    constructor(private fb: FormBuilder,   private toastr: ToastrService,) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      measuredBy: ['', Validators.required],
      targetValue: [''], // Optional field
      currentValue: [''], // Optional field
      targetLabel: [''], // For the additional input box
      entrepreneurs: this.entrepreneursControl
    });

    // Watch for changes in the measuredBy field
    this.todoForm.get('measuredBy')?.valueChanges.subscribe(value => {
      this.onMeasuredByChange(value);
    });
    this.subscription = new Subscription();
  }

  toggleAllSelection(checked: boolean) {
    if (checked) {
      this.entrepreneursControl.setValue(this.entrepreneurs.map(e => e.id));
    } else {
      this.entrepreneursControl.setValue([]);
    }
  }

  isAllSelected(): boolean {
    return this.entrepreneursControl.value?.length === this.entrepreneurs.length;
  }

  isSomeSelected(): boolean {
    const value = this.entrepreneursControl.value ?? [];
    return value.length > 0 && !this.isAllSelected();
  }

  onMeasuredByChange(value: string): void {
    // Reset targetValue and currentValue when measuredBy changes
    if (value === 'Numerical') {
      this.todoForm.get('targetValue')?.setValue('');
      this.todoForm.get('currentValue')?.setValue('');
    } else {
      this.todoForm.get('targetValue')?.setValue(null);
      this.todoForm.get('currentValue')?.setValue(null);
    }

    // Handle targetLabel validation
    if (value === 'Quantity') {
      this.todoForm.get('targetLabel')?.setValidators(Validators.required);
    } else {
      this.todoForm.get('targetLabel')?.clearValidators();
    }
    this.todoForm.get('targetLabel')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    let formData = this.todoForm.value;

    // Dynamically map entrepreneurs to include their UIDs
    if (Array.isArray(formData.entrepreneurs)) {
      formData.entrepreneurs = formData.entrepreneurs.map((id: any) => {
        return { uid: this.entrepreneurs.find(e => e.id === id)?.uid };
      }).filter((entrepreneur: { uid: any; }) => entrepreneur.uid); // Ensure only valid UIDs are included
    }

    // Create todoData dynamically from formData
    const todoData = {
      ...formData, // Spread all fields from formData into todoData
      entrepreneurs: formData.entrepreneurs // Ensure entrepreneurs is correctly mapped
    };

    console.log(todoData); // Log the data being sent

    this.todoService.addTodosForEntrepreneurs(todoData).subscribe(
      response => {
        console.log('Todos created successfully:', response);

        // Show success toast notification
        this.toastr.success('Todos created successfully!, check user profile to see their Todos', 'Success', {
          timeOut: 3000,  // Duration in milliseconds
          positionClass: 'toast-top-center'  // Position of the toast
        });

        // Reset the form
        this.todoForm.reset();
      },
      error => {
        console.error('Error creating todos:', error);

        // Show error toast notification
        this.toastr.error('Error creating todos. Please try again.', 'Error', {
          timeOut: 3000,  // Duration in milliseconds
          positionClass: 'toast-top-center'  // Position of the toast
        });
      }
    );
  }


  ngOnInit() {
    this.subscription.add(
      this.userDetailsService.getAccessCode((accessCode) => {
        this.accessCode = accessCode;
        console.log(this.accessCode, " access");
        this.accessCodeService.getUsersByAccessCode(this.accessCode)
          .subscribe((response) => {
            this.entrepreneurs = response.users.map((user: { firstName: any; lastName: any; email: any, uid: any }, index: number) => ({
              id: index,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              uid: user.uid,
            }));

            console.log('Entrepreneurs:', this.entrepreneurs); // Log entrepreneurs list
          });
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
