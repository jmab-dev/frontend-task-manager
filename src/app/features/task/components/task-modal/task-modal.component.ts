import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../core/interfaces/task.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../services/task.service';
import { Status } from '../../../../core/interfaces/status.interface';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Input() task: Task | null = null;
  @Input() status: Status[] = [];

  newTask: any = { title: '', description: '', status: 1 };
  errorMessage: string = '';

  constructor(private taskService: TaskService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.task) {
      this.newTask = { ...this.task };
    }
  }

  isEditing(): boolean {
    return this.task !== null;
  }
  
  saveTask(): void {
    this.errorMessage = ''; 
    const taskToSave = this.task ? { ...this.task, status: this.newTask.status } : { ...this.newTask };
    if (this.task) {
      this.taskService.update(taskToSave).subscribe(() => this.activeModal.close(true));
    } else {
      if (!this.newTask.title) {
        this.errorMessage = 'El título es obligatorio.';
        return;
      }
      this.taskService.create(this.newTask).subscribe(() => this.activeModal.close(true));
    }
  }

}
