import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../shared/model/transaction";
import {MatTableDataSource} from "@angular/material/table";
import { MatSnackBar } from '@angular/material/snack-bar';
import {TransactionService} from "../../shared/services/transaction.service";

@Component({
  selector: 'app-transaction-maintenance',
  templateUrl: './transaction-maintenance.component.html',
  styleUrl: './transaction-maintenance.component.scss'
})
export class TransactionMaintenanceComponent implements OnInit {
  transaction: Transaction = this.newTransaction();
  dataSource = new MatTableDataSource<Transaction>([]);
  diasDoMes: string[] = [];
  entradas: number[] = [];
  saidas: number[] = [];

  constructor(
    private transactionService: TransactionService,
    private snackBar: MatSnackBar
  ) {}

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

          this.snackBar.open('Transação cadastrada com sucesso!', '✖', {
            duration: 3000, 
            horizontalPosition: 'end', 
            verticalPosition: 'top', 
            panelClass: ['snackbar-success'] 
          });
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
  
      this.processarDadosGrafico(dados);
    });
  }
  
  processarDadosGrafico(dados: Transaction[]): void {
    // Mapear as transações e converter as datas
    const transacoesPorData = new Map<string, { entrada: number, saida: number }>();
  
    dados.forEach(transacao => {
      const dataFormatada = new Date(transacao.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  
      if (!transacoesPorData.has(dataFormatada)) {
        transacoesPorData.set(dataFormatada, { entrada: 0, saida: 0 });
      }
  
      if (transacao.tipo) {
        transacoesPorData.get(dataFormatada)!.entrada += transacao.valor;
      } else {
        transacoesPorData.get(dataFormatada)!.saida += transacao.valor;
      }
    });
  
    // Ordenar e pegar os últimos 7 dias cadastrados
    const ultimosSeteDias = Array.from(transacoesPorData.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()) // Ordena do menor para o maior
      .slice(-7); // Pega os últimos 7 dias
  
    this.diasDoMes = ultimosSeteDias.map(d => d[0]); // Datas formatadas
    this.entradas = ultimosSeteDias.map(d => d[1].entrada); // Valores das entradas
    this.saidas = ultimosSeteDias.map(d => d[1].saida); // Valores das saídas
  
  }
  



  resetForm(): void {
    this.transaction = this.newTransaction();
  }
}
