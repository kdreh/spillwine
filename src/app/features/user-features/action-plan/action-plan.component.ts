import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Todo} from "../../../models/todo";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoService} from "../../../services/todo.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ActionItemEditComponent} from "../action-item-edit/action-item-edit.component";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import { MatNativeDateModule } from '@angular/material/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {TitleComponent} from "../../../shared/components/title/title.component";
import {BackComponent} from "../../../shared/components/back/back.component";

@Component({
  selector: 'app-action-plan',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatDatepickerInput,
    MatDatepicker,
    MatDatepickerToggle,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton, MatLabel, MatError, MatNativeDateModule, MatDatepickerModule, MatCard, MatCardContent, MatSuffix, TitleComponent, BackComponent,
  ],
  templateUrl: './action-plan.component.html',
  styleUrl: './action-plan.component.scss'
})
export class ActionPlanComponent implements  OnInit{
  todos = new MatTableDataSource<Todo>([]);
  filterTodos: Todo[] = []; // Holds the filtered todos
  todoForm: FormGroup;
  dateRangeForm: FormGroup;
  editMode = false;
  currentTodoId: string | null = null;
  uid: string | null = null;
  displayedColumns: string[] = ['title', 'category', 'dueDate', 'status', 'assignedBy', 'actions'];
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

  // For dropdowns
  selectedCategory: string | null = null;
  selectedStatus: string | null = null;
  dueDateRange: { start: Date | null; end: Date | null } = { start: null, end: null };


  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {
    this.dateRangeForm = new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null)
    });

    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required],
      description: [''], // Optional
      measuredBy: [''],
      targetValue: [''],
      currentValue: [''],
      targetLabel: [''],
    });
  }

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid');
    if (this.uid) {
    } else {
      console.error('User uid not found');
    }
    // Listen for changes in date range form and apply filters
    this.dateRangeForm.valueChanges.subscribe(() => this.applyDateRangeFilter());
  }




  createTodo(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched(); // Mark all fields as touched to display validation messages
      this.toastr.error('Error adding todo, invalid form');
      console.error('Error adding todo');
      return;
    }

    // Create newTodo dynamically from form data
    const newTodo: Todo = {
      uid: this.uid as string,
      ...this.todoForm.value, // Spread all form values into newTodo
      completed: false,
      assignedBy: 'user',
    };

    this.todoService.createTodo(newTodo).subscribe((todo) => {
      this.todos.data.push(todo); // Update the data array
      this.todos.data = [...this.todos.data]; // Trigger table update
      this.filterTodos.push(todo); // Update filterTodos
      this.toastr.success('Todo added!');

      // Delay resetting the form to allow toastr message to display
      setTimeout(() => {
        this.todoForm.reset();
      }, 300); // Adjust the delay as needed

    }, error => {
      this.toastr.error('Error adding todo.');
      console.error('Error adding todo:', error);
    });
  }

  applyDateRangeFilter(): void {
    const { start, end } = this.dateRangeForm.value;

    this.dueDateRange = {
      start: start ? new Date(start) : null,
      end: end ? new Date(end) : null
    };
  }



}
