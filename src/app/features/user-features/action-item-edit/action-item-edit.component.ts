import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-action-item-edit',
  templateUrl: './action-item-edit.component.html',
  styleUrls: ['./action-item-edit.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class ActionItemEditComponent {
  editTodoForm: FormGroup;
  createdAt: Date;
  updatedAt: Date;
  completed;
  assignedBy;

  category: string[] = [
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

  status: string[] = [
    'Not Started',
    'On Hold',
    'In Progress',
    'Completed',
    'Archived'
  ];

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ActionItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.assignedBy = data.assignedBy;
    this.completed = data.completed;

    this.editTodoForm = this.fb.group({
      uid: [data.uid], // Add UID to the form
      todoId: [data.todoId], // Add Todo ID to the form
      title: [data.title, Validators.required],
      category: [data.category, Validators.required],
      dueDate: [data.dueDate, Validators.required],
      status: [data.status, Validators.required],
      description: [data.description],
      measuredBy: [{ value: data.measuredBy, disabled: true }],
      targetValue: [data.targetValue, Validators.required],
      currentValue: [data.currentValue, Validators.required],
      targetLabel: [data.targetLabel],
      createdAt: [this.createdAt], // Add createdAt field
      updatedAt: [this.updatedAt], // Add updatedAt field
      assignedBy: [this.assignedBy] // Add assignedBy field
    });
  }

  onSubmit(): void {
    if (this.editTodoForm.invalid) {
      // If form is invalid, show an error message
      this.toastr.error('Please fill out the form correctly.', 'Form Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
      return;
    }

    const updatedItem = {
      ...this.editTodoForm.value,
      createdAt: this.createdAt,
      updatedAt: new Date() // Update last modified date
    };

    this.todoService.updateTodo(
      this.editTodoForm.get('uid')?.value, // Assuming you have a field for UID
      this.editTodoForm.get('todoId')?.value, // Assuming you have a field for Todo ID
      updatedItem
    ).subscribe({
      next: (response) => {
        console.log('Todo updated successfully:', response); // Debugging line
        this.dialogRef.close(updatedItem);
        this.toastr.success('Todo updated successfully.', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      },
      error: (error) => {
        console.error('Error updating todo:', error); // Debugging line
        this.toastr.error('Error updating todo. Please try again later.', 'Update Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
