import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.css'
})
export class ConfirmPopupComponent {
  @Output() confirm = new EventEmitter<void>();

  message = "¿Estás seguro de que quieres eliminar esta tarea?";
  title = "Eliminar Tarea";
  action = "Eliminar";
  
  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete(modal: any) {
    this.confirm.emit();
    modal.dismiss();
  }
}
