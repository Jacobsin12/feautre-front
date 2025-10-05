import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox'; // 👈 Aseguramos que esté importado

import { DivisionService, Division } from '../../services/division.service'; 

@Component({
  selector: 'app-divisiones',
  templateUrl: './divisiones.component.html',
  styleUrls: ['./divisiones.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    PaginatorModule,
    DialogModule,
    InputTextModule,
    CheckboxModule, // 👈 Añadido
  ],
})
export class DivisionesComponent implements OnInit {
  divisiones: Division[] = [];
  first: number = 0;
  rows: number = 10;
  
  // Modal State - EDITAR
  displayEditModal: boolean = false;
  selectedDivision: Division | null = null; 
  
  // Modal State - AGREGAR NUEVO
  displayNewModal: boolean = false;
  // Inicializamos con estado: true para que el checkbox esté marcado por defecto
  newDivision: Partial<Division> = { nombre: '', estado: true }; 

  constructor(private divisionService: DivisionService) {}

  ngOnInit(): void {
    this.loadDivisiones();
  }

  loadDivisiones(): void {
    this.divisionService.getDivisiones().subscribe({
      next: (data) => (this.divisiones = data),
      error: (err) => console.error('Error al cargar divisiones:', err)
    });
  }
  
  // 💡 FUNCIÓN CORREGIDA
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    // Lógica para recargar datos de la página si usas paginación del servidor
  }
  
  // --- Lógica de AGREGAR NUEVO ---

  openNewModal() {
    this.newDivision = { nombre: '', estado: true }; 
    this.displayNewModal = true;
  }

  saveNewDivision() {
    if (!this.newDivision.nombre) {
      console.error("El nombre es requerido.");
      return;
    }
    
    this.divisionService.createDivision(this.newDivision).subscribe({
      next: (newDiv) => {
        // Agrega la nueva división (con ID generado por el backend) a la lista
        this.divisiones = [newDiv, ...this.divisiones];
        this.displayNewModal = false;
        console.log('División creada con éxito:', newDiv.nombre);
      },
      error: (err) => {
        console.error('Error al crear la división:', err);
      }
    });
  }
  
  // --- Lógica del Modal (Editar) ---

  openEditModal(division: Division) {
    // Clonación para edición: { ...division }
    this.selectedDivision = { ...division }; 
    this.displayEditModal = true;
  }
  
  closeEditModal() {
    this.displayEditModal = false;
    this.selectedDivision = null;
  }

  saveChanges() {
    if (!this.selectedDivision || !this.selectedDivision.id) return;

    const idToUpdate = this.selectedDivision.id;
    const updatePayload: Partial<Division> = { 
        nombre: this.selectedDivision.nombre,
        estado: this.selectedDivision.estado 
    };
    
    this.divisionService.updateDivision(idToUpdate, updatePayload).subscribe({
      next: (updatedDiv) => {
        // Encuentra y reemplaza la división en la lista local
        const index = this.divisiones.findIndex(d => d.id === updatedDiv.id);
        if (index !== -1) {
          this.divisiones[index] = updatedDiv;
        }
        this.closeEditModal();
        console.log('División actualizada con éxito:', updatedDiv.nombre);
      },
      error: (err) => {
        console.error('Error al actualizar la división:', err);
      }
    });
  }
  
  // --- Lógica de ELIMINACIÓN ---

  deleteDivision(division: Division) {
    if (confirm(`¿Estás seguro de que quieres eliminar la división: ${division.nombre} (ID: ${division.id})? Esta acción es irreversible.`)) {
      
      this.divisionService.deleteDivision(division.id).subscribe({
        next: () => {
          // Remueve la división de la lista local
          this.divisiones = this.divisiones.filter(d => d.id !== division.id);
          console.log('División eliminada con éxito:', division.nombre);
        },
        error: (err) => {
          console.error('Error al eliminar la división:', err);
        }
      });
    }
  }
}