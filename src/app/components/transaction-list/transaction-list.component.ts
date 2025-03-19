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

  async loadData(): Promise<void> {
    try {
      const dados = await this.transactionService.getTransactions();
      this.dataSource.data = dados;
      
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    } catch (err) {
      console.error('Erro ao carregar transações:', err);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelectedTransaction(transaction: Transaction): void {
    this.registroSelecionado = transaction;
  }

  async onDeleteTransaction(transaction: Transaction): Promise<void> {
    if (transaction) {
      try {
        await this.transactionService.deleteTransaction(transaction);
        console.log('Transação excluída com sucesso!');
        this.loadData();
        this.registroSelecionado = null; 
      } catch (err) {
        console.error('Erro ao excluir transação:', err);
      }
    } else {
      console.log('Erro: Nenhuma transação selecionada');
    }
  }
}
