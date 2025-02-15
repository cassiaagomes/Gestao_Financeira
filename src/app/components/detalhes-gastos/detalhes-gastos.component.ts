import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Transaction} from "../../shared/model/transaction";

@Component({
  selector: 'app-detalhes-gastos',
  templateUrl: './detalhes-gastos.component.html',
  styleUrls: ['./detalhes-gastos.component.scss']
})
export class DetalhesGastosComponent {
  @Input({ required: true }) registro: Transaction= {} as Transaction;
  @Output() registroExcluido: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  constructor(private router: Router) {}

  onExcluirClick(): void {
    this.registroExcluido.emit(this.registro);
  }

  onEditarClick(): void {
    if (this.registro && this.registro.id) {
      this.router.navigate(['/editar-movimentacoes', this.registro.id]);
    }
  }
}
