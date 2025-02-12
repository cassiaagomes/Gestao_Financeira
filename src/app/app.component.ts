import { Component } from '@angular/core';
import { Transaction } from './shared/model/transaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  registroSelected: Transaction= { } as Transaction;
  showDetalhes: boolean = false;

  onEntradaSelected(registro: Transaction) {
    this.registroSelected = registro;
    this.showDetalhes = true;
  }
}
