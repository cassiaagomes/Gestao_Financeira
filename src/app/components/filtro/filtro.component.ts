import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent {
  @Output() filtroAplicado = new EventEmitter<{ nome?: string; data?: string; tipo?: string }>();

  nome: string = '';
  data: string = '';
  tipo: string = '';

  tipos = [
    { value: 'entrada', viewValue: 'Entrada' },
    { value: 'saída', viewValue: 'Saída' }
  ];

  aplicarFiltro(): void {
    this.filtroAplicado.emit({ 
      nome: this.nome || undefined, 
      data: this.data || undefined, 
      tipo: this.tipo || undefined 
    });
  }
}




