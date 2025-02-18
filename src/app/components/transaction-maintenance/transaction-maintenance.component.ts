import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../shared/model/transaction";
import {MatTableDataSource} from "@angular/material/table";
import {TransactionService} from "../../shared/services/transaction.service";

@Component({
  selector: 'app-transaction-maintenance',
  templateUrl: './transaction-maintenance.component.html',
  styleUrl: './transaction-maintenance.component.scss'
})
export class TransactionMaintenanceComponent implements OnInit {
  transaction: Transaction = this.newTransaction();
  dataSource = new MatTableDataSource<Transaction>([]);

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  newTransaction(): Transaction {
    return {
      nome: '',
      valor: 0,
      tipo: true,
      data: '',
      categoria: '',
      descricao: ''
    };
  }

  onSubmit(): void {
    if (this.isValidForm()) {
      this.transactionService.addTransaction(this.transaction).subscribe({
        next: () => {
          console.log('Transação cadastrada com sucesso!');
          this.loadData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erro ao cadastrar a transação:', err);
        }
      });
    } else {
      console.log('Formulário inválido!');
    }
  }

  isValidForm(): boolean {
    return this.transaction.nome !== '' &&
      this.transaction.valor > 0 && this.transaction.data !== '' &&
      this.transaction.categoria !== '' && this.transaction.descricao !== '';
  }


  loadData(): void {
    this.transactionService.getDadosEntrada().subscribe(dados => {
      this.dataSource.data = dados;
    });
  }

  resetForm(): void {
    this.transaction = this.newTransaction();
  }
}
