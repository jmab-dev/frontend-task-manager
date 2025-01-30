import { Routes } from '@angular/router';
import LoginComponent from './features/auth/components/login/login.component';
import TaskListComponent from './features/task/components/task-list/task-list.component';
import { AuthGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [
  { path: '', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];