import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo, TodoResponse } from '../models/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {



  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const authToken = localStorage.getItem('auth_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      })
    };
  }

  // Admin bulk create todo items for entrepreneurs
  addTodosForEntrepreneurs(todos: Record<string, any>): Observable<any> {
    return this.http.post(`/todos/bulk-create`, todos, this.getHttpOptions()).pipe(
      tap((response) => console.log('Added todos for entrepreneurs:', response)),
      catchError(this.handleError)
    );
  }
  // Updated method to return TodoResponse
  getUserTodos(uid: string): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(`/todos/get-all-todos/user/${encodeURIComponent(uid)}`, this.getHttpOptions()).pipe(
      tap((response: TodoResponse) => console.log('Fetched todos:', response.todos)),
      catchError(this.handleError)
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`/todos/create-todo`, todo, this.getHttpOptions()).pipe(
      tap((newTodo: Todo) => console.log('Added new todo:', newTodo)),
      catchError(this.handleError)
    );
  }

  updateTodo(uid: string, todoId: string, updatedTodo: Partial<Todo>): Observable<Todo> {
    const url = `/todos/update-todo/${encodeURIComponent(uid)}/${encodeURIComponent(todoId)}`;
    console.log('Requesting PUT to:', url); // Debugging line

    return this.http.put<Todo>(url, updatedTodo, this.getHttpOptions()).pipe(
      tap((todo: Todo) => console.log('Updated todo:', todo)),
      catchError((error: any) => {
        console.error('Error updating todo:', error);
        return throwError(() => new Error('Error updating todo. Please try again later.'));
      })
    );
  }


  deleteTodo(uid: string, todoId: string): Observable<void> {
    const url = `/todos/delete-todo/${encodeURIComponent(uid)}/${encodeURIComponent(todoId)}`;
    console.log('Requesting DELETE to:', url); // Debugging line
    return this.http.delete<void>(url, this.getHttpOptions()).pipe(
      tap(() => console.log('Deleted todo with ID:', todoId)),
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
