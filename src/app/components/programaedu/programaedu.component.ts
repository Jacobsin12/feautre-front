import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { ProgramaEducativoService, ProgramaEducativo } from '../../services/programa-educativo.service';

@Component({
  selector: 'app-programas-educativos',
  templateUrl: './programaedu.component.html',
  styleUrls: ['./programaedu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    InputTextModule,
  ],
})
export class ProgramaeduComponent implements OnInit {
  programas: ProgramaEducativo[] = [];
  first: number = 0;
  rows: number = 10;

  // Modales
  displayEditModal: boolean = false;
  displayNewModal: boolean = false;

  selectedPrograma: ProgramaEducativo | null = null;
  newPrograma: Partial<ProgramaEducativo> = { nombre: '', divisionId: undefined };

  constructor(private programaService: ProgramaEducativoService) {}

  ngOnInit(): void {
    this.loadProgramas();
  }

  loadProgramas(): void {
    this.programaService.getProgramas().subscribe({
      next: (data) => (this.programas = data),
      error: (err) => console.error('Error al cargar programas:', err),
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  // --- Nuevo ---
  openNewModal() {
    this.newPrograma = { nombre: '', divisionId: undefined };
    this.displayNewModal = true;
  }

  saveNewPrograma() {
    if (!this.newPrograma.nombre || !this.newPrograma.divisionId) {
      console.error('Faltan datos');
      return;
    }

    this.programaService.createPrograma(this.newPrograma.divisionId, this.newPrograma).subscribe({
      next: (newProg) => {
        this.programas = [newProg, ...this.programas];
        this.displayNewModal = false;
        console.log('Programa creado con éxito:', newProg.nombre);
      },
      error: (err) => console.error('Error al crear programa:', err),
    });
  }

  // --- Editar ---
  openEditModal(programa: ProgramaEducativo) {
    this.selectedPrograma = { ...programa };
    this.displayEditModal = true;
  }

  closeEditModal() {
    this.displayEditModal = false;
    this.selectedPrograma = null;
  }

  saveChanges() {
    if (!this.selectedPrograma?.id) return;

    const id = this.selectedPrograma.id;
    const payload = { nombre: this.selectedPrograma.nombre };

    this.programaService.updatePrograma(id, payload).subscribe({
      next: (updated) => {
        const index = this.programas.findIndex(p => p.id === updated.id);
        if (index !== -1) this.programas[index] = updated;
        this.closeEditModal();
        console.log('Programa actualizado con éxito:', updated.nombre);
      },
      error: (err) => console.error('Error al actualizar programa:', err),
    });
  }

  // --- Eliminar ---
  deletePrograma(programa: ProgramaEducativo) {
    if (confirm(`¿Eliminar programa "${programa.nombre}" (ID: ${programa.id})?`)) {
      this.programaService.deletePrograma(programa.id).subscribe({
        next: () => {
          this.programas = this.programas.filter(p => p.id !== programa.id);
          console.log('Programa eliminado:', programa.nombre);
        },
        error: (err) => console.error('Error al eliminar programa:', err),
      });
    }
  }
}
