import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import { ActionItemEditComponent } from '../action-item-edit/action-item-edit.component';
import {TitleComponent} from "../../../shared/components/title/title.component";
import {LoadingComponent} from "../../../shared/components/loading/loading.component";
import {SplashScreenComponent} from "../../../shared/components/splash-screen/splash-screen.component";
import {NoDataComponent} from "../../../shared/components/no-data/no-data.component";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialogue/confirm-dialogue.component";
import {BackComponent} from "../../../shared/components/back/back.component"; // Update with actual path

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    // You must import Angular Material modules directly here
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    TitleComponent,
    LoadingComponent,
    SplashScreenComponent,
    NoDataComponent,
    BackComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit {
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
      this.getTodos();
    } else {
      console.error('User uid not found');
    }
    // Listen for changes in date range form and apply filters
    this.dateRangeForm.valueChanges.subscribe(() => this.applyDateRangeFilter());
  }

  onMeasuredByChange(): void {
    this.todoForm.patchValue({
      targetValue: '',
      currentValue: ''
    });
  }

  getTodos(): void {
    if (this.uid) {
      this.todoService.getUserTodos(this.uid).subscribe((response) => {
        const todos = response.todos; // Extract todos from the response object
        localStorage.setItem('todos', JSON.stringify(todos)); // Stringify todos before storing
        if (todos.length === 0) {
          this.toastr.info('No todos found for this user.');
        }
        this.todos = new MatTableDataSource<Todo>(todos);
        this.filterTodos = todos; // Initialize filterTodos with fetched todos
        this.applyFilters(); // Apply filters initially
        this.cdr.detectChanges(); // Ensure the view updates if needed
      }, error => {
        this.toastr.error('Error loading todos.');
        console.error('Error loading todos:', error);
      });
    }
  }
  




  editTodo(todo: Todo): void {
    const dialogRef = this.dialog.open(ActionItemEditComponent, {
      width: '600px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.todoService.updateTodo(result.uid, result.todoId, result).subscribe(
          (updatedTodo: Todo) => {
            console.log('Updated Todo:', updatedTodo);

            // Show success toast
            this.toastr.success('Todo updated successfully. Please refresh the page.', 'Success', {
              timeOut: 5000, // Duration of the toast
            });
          },
          (error: any) => {
            console.error('Error updating todo:', error);
            // Optionally show an error toast
            this.toastr.error('Failed to update todo. Please try again.', 'Error', {
              timeOut: 5000,
            });
          }
        );
      }
    });
  }

  confirmDelete(todo: Todo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: todo.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTodo(todo);
      }
    });
  }

  deleteTodo(todo: Todo): void {
    // Assuming you have a method to get the currently signed-in user's UID
    const currentUserUid = this.uid;
    console.log(currentUserUid, "currentUserUid");
  console.log(todo, "Todo");
    if (!todo.todoId || !todo.uid) {

      if (todo.assignedBy === 'Admin') {
        console.error('You do not have permission to delete this todo.');
        this.toastr.error('You do not have permission to delete this todo.');
        return;
      }
      return;
    }

    // Check if the current user is the creator of the todo

    console.log('Preparing to delete todo:', todo); // Debugging line

    this.todoService.deleteTodo(todo.uid, todo.todoId).subscribe({
      next: () => {
        console.log('Todo deleted successfully'); // Debugging line
        this.todos.data = this.todos.data.filter(t => t.todoId !== todo.todoId);
        this.filterTodos = this.filterTodos.filter(t => t.todoId !== todo.todoId);
         // Update the local storage with the new todos array
        localStorage.setItem('todos', JSON.stringify(this.todos.data));
        this.toastr.success('Todo deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting todo:', error); // Debugging line
        this.toastr.error('Error deleting todo.');
      }
    });

    console.log('After subscription'); // Debugging line
  }




  filterTodosMethod(filters: { title?: string; dueDate?: string; status?: string; category?: string; }): void {
    this.filterTodos = this.todos.data.filter(todo => {
      return (!filters.title || (todo.title && todo.title.includes(filters.title))) &&
        (!filters.dueDate || todo.dueDate === filters.dueDate) &&
        (!filters.status || todo.status === filters.status) &&
        (!filters.category || (todo.category?.includes(filters.category) ?? false))
    });
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    if (todo.todoId) {
      this.todoService.updateTodo(todo.uid, todo.todoId, todo).subscribe(() => {
        console.log('todo toggled:', todo);
      }, error => {
        this.toastr.error('Error updating todo status.');
        console.error('Error updating todo status:', error);
      });
    } else {
      console.error('Todo ID is missing');
    }
  }

  applyFilter(event: Event, column: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim().toLowerCase();

    this.filterTodos = this.todos.data.filter(todo => {
      const todoValue = (todo[column as keyof Todo] || '').toString().toLowerCase();
      return todoValue.includes(value);
    });
  }

  applyFilters(): void {
    let filteredTodos = this.todos.data;

    // Apply category filter
    if (this.selectedCategory) {
      filteredTodos = filteredTodos.filter(todo => todo.category === this.selectedCategory);
    }

    // Apply status filter
    if (this.selectedStatus) {
      filteredTodos = filteredTodos.filter(todo => todo.status === this.selectedStatus);
    }

    // Apply date range filter
    if (this.dueDateRange.start || this.dueDateRange.end) {
      filteredTodos = filteredTodos.filter(todo => {
        const dueDateStr = todo.dueDate;
        if (!dueDateStr) {
          return false;
        }

        const dueDate = new Date(dueDateStr);
        const start = this.dueDateRange.start ?? new Date(-8640000000000000); // Min possible date
        const end = this.dueDateRange.end ?? new Date(8640000000000000); // Max possible date

        return dueDate >= start && dueDate <= end;
      });
    }

    // Update filtered todos
    this.filterTodos = filteredTodos;
  }




  applyCategoryFilter(category: string): void {
    this.todos.filterPredicate = (data: Todo) => category === '' || data.category === category;
    this.todos.filter = category;
  }

  applyStatusFilter(status: string): void {
    this.todos.filterPredicate = (data: Todo) => status === '' || data.status === status;
    this.todos.filter = status;
  }

  applyDateRangeFilter(): void {
    const { start, end } = this.dateRangeForm.value;

    this.dueDateRange = {
      start: start ? new Date(start) : null,
      end: end ? new Date(end) : null
    };

    this.applyFilters(); // Apply all filters together
  }



}
