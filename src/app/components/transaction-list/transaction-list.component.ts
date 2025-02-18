import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Transaction} from "../../shared/model/transaction";
import {TransactionService} from "../../shared/services/transaction.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit  {
  dataSource = new MatTableDataSource<Transaction>([]);
  displayedColumns: string[] = ['nome', 'valor', 'tipo', 'dataRegistro'];
  registroSelecionado: Transaction| null = null;


  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.transactionService.getDadosEntrada().subscribe(dados => {
      this.dataSource.data = dados;
    });
  }

  onSelectedTransaction(transaction: Transaction): void {
    this.registroSelecionado = transaction;
  }

  onDeleteTransaction(transaction: Transaction): void {
    if (transaction) {
      this.transactionService.deleteTransaction(transaction).subscribe({
        next: () => {
          console.log('Transação excluída com sucesso!');
          this.loadData();
          this.registroSelecionado = null;
        },
        error: (err) => {
          console.error('Erro ao excluir transação:', err);
        }
      });
    } else {
      console.log('Erro: Nenhum id encontrado para a transação');
    }
  }
}
