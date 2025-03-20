import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Transaction } from "../../shared/model/transaction";
import { TransactionFireService } from "../../shared/services/transaction-fire.service";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Transaction>([]);
  displayedColumns: string[] = ['nome', 'valor', 'tipo', 'dataRegistro'];
  registroSelecionado: Transaction | null = null;
  /////////////////////////////////////
  mostrarDetalhes = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private transactionService: TransactionFireService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      const dados = await this.transactionService.getTransactions();

      this.dataSource.data = dados.map(transacao => ({
        ...transacao,
        dataRegistro: this.convertTimestampToDate(transacao.data)
      }));

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

  // onSelectedTransaction(transaction: Transaction): void {
  //   this.registroSelecionado = transaction;

  //   this.dataSource.data = [...this.dataSource.data];
  //   this.cdr.detectChanges();
  // }
///////////////////////////////////////////////////////////////
// onSelectedTransaction(transaction: Transaction): void {
//   if (this.registroSelecionado === transaction) {
//     this.registroSelecionado = null; // Fecha a área de detalhes se clicar na mesma transação
//   } else {
//     this.registroSelecionado = transaction; // Abre a área de detalhes
//   }

//   // Forçar atualização da tabela
//   this.dataSource.data = [...this.dataSource.data];
//   this.cdr.detectChanges();
// }
onSelectedTransaction(transaction: Transaction): void {
  this.registroSelecionado = transaction;
}

// fecharDetalhes(): void {
//   this.registroSelecionado = null;
// }
/////////////////////
fecharDetalhes(): void {
  this.registroSelecionado = null;
}

/////////////////////////////////////////////////
  onFecharDetalhes(): void {
    this.mostrarDetalhes = false;
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

  private convertTimestampToDate(timestamp: any): Date {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000);
    }
    return new Date();
  }
}
