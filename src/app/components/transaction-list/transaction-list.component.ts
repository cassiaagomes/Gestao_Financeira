import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Transaction } from "../../shared/model/transaction";
import { TransactionService } from "../../shared/services/transaction.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Transaction>([]);
  displayedColumns: string[] = ['nome', 'valor', 'tipo', 'dataRegistro'];
  registroSelecionado: Transaction | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.transactionService.getDadosEntrada().subscribe(dados => {
      this.dataSource.data = dados;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
