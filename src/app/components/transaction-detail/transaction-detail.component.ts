import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Transaction} from "../../shared/model/transaction";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss'
})
export class TransactionDetailComponent {
  @Input({ required: true }) registro: Transaction= {} as Transaction;
  @Output() registroExcluido: EventEmitter<Transaction> = new EventEmitter<Transaction>();
  ///////////////////////////////////////////////////////////////////////
  @Output() fechar = new EventEmitter<void>();
  

  constructor(private router: Router) {}

  onExcluirClick(): void {
    this.registroExcluido.emit(this.registro);
  }

  onEditarClick(): void {
    if (this.registro && this.registro.id) {
      this.router.navigate(['/transaction-maintenance', this.registro.id]);
    }
  }
/////////////////////////////////////////////////////////////
  fecharDetalhes(): void {
    this.fechar.emit(); // Emite o evento para o componente pai
  }
}
