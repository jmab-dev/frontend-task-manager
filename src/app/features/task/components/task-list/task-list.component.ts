import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Task } from '../../../../core/interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Status } from '../../../../core/interfaces/status.interface';
import { ConfirmPopupComponent } from '../../../../shared/components/confirm-popup/confirm-popup.component';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export default class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  status: Status[] = [];

  searchText: string = '';
  selectedStatus: string = "0";
  filteredTasks: Task[] = [];

  constructor(private modalService: NgbModal, private taskService: TaskService,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadStatus();
    this.loadTasks();
  }

  applyFilter(): Task[] {
    return this.tasks.filter(task =>
      (task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
       (task.description?.toLowerCase() || '').includes(this.searchText.toLowerCase())) &&
      (this.selectedStatus === "0" || task.status === Number(this.selectedStatus))
    );
  }

  onFilterTextChange(): void {
    this.filteredTasks = this.applyFilter();
  }


  loadTasks() {
    this.taskService.list()
      .subscribe((data) => {
        this.tasks = data;
        this.filteredTasks = this.applyFilter();
    });
  }

  loadStatus(){
    this.taskService.status()
      .subscribe((data) => {
        this.status = data;
      });
  }

  getStatusName(statusId: number): string {
    const status = this.status.find(s => s.id === statusId);
    return status ? status.description : 'Desconocido';
  }

  openAddTaskModal(): void {
    const modalRef = this.modalService.open(TaskModalComponent);
    modalRef.componentInstance.status = this.status;
    modalRef.result.then((result) => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  openEditTaskModal(task: Task): void {
    const modalRef = this.modalService.open(TaskModalComponent);
    modalRef.componentInstance.status = this.status;
    modalRef.componentInstance.task = task;
    modalRef.result.then((result) => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  deleteTask(id: string): void {
    const modalRef = this.modalService.open(ConfirmPopupComponent, { centered: true });
    modalRef.componentInstance.confirm.subscribe(() => {
      this.taskService.delete(id).subscribe(() => {
        this.loadTasks();
      });
    });
  }


  logout(){
    this.authService.logout();
  }
}