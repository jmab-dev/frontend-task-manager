
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../../../core/interfaces/task.interface';
import { ApiResponse } from '../../../core/interfaces/response.interface';
import { Status } from '../../../core/interfaces/status.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = 'http://localhost:8080/api/task';
  private readonly authHeader = 'Basic c2VlazpzZTNrQ2g0bGxlbmcz'; 
 
  private http = inject(HttpClient);
  
  constructor() {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': this.authHeader, 'Content-Type': 'application/json' });
  }

  list(): Observable<Task[]> {
    return this.http
      .get<ApiResponse<Task[]>>(`${this.apiUrl}/list`, { headers: this.getHeaders() })
      .pipe(map((response) => response.payload));
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<ApiResponse<Task>>(`${this.apiUrl}/create`, task, { headers: this.getHeaders() })
      .pipe(map((response) => response.payload));
  }

  update(task: Task): Observable<Task> {
    return this.http
      .put<ApiResponse<Task>>(`${this.apiUrl}/update`, task, { headers: this.getHeaders() })
      .pipe(map((response) => response.payload));
  }

  delete(taskId: string): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.apiUrl}/${taskId}`, { headers: this.getHeaders() })
      .pipe(map(() => undefined));
  }

  status(): Observable<Status[]> {
    return this.http
      .get<ApiResponse<Status[]>>(`${this.apiUrl}/status`, { headers: this.getHeaders() })
      .pipe(map((response) => response.payload));
  }


}
