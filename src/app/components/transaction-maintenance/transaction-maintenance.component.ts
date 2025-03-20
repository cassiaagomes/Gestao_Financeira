import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../shared/model/transaction";
import {MatTableDataSource} from "@angular/material/table";
import { MatSnackBar } from '@angular/material/snack-bar';
import {TransactionFireService} from "../../shared/services/transaction-fire.service";
import { ActivatedRoute, Router } from '@angular/router';

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
  modoEdicao: boolean = false;

  constructor(
    private transactionService: TransactionFireService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.loadData();
  // }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const transactionId = params.get('id'); // Obtém o ID da transação pela URL
      if (transactionId) {
        this.modoEdicao = true;
        this.transactionService.getTransactionById(transactionId).then(transaction => {
          if (transaction) {
            this.transaction = transaction; // Preenche o formulário com a transação
          }
        });
      } else {
        this.modoEdicao = false;
      }
    });

    this.loadData();
  }

  newTransaction(): Transaction {
    return {
      nome: '',
      valor: 0,
      tipo: true,
      data: new Date(),
      categoria: '',
      descricao: '',
    };
  }

  // onSubmit(): void {
  //   if (this.isValidForm()) {
  //     this.transactionService.addTransaction(this.transaction).then(() => {
  //       console.log('Transação cadastrada com sucesso!');
  //       this.loadData();
  //       this.resetForm();

  //       this.snackBar.open('Transação cadastrada com sucesso!', '✖', {
  //         duration: 3000,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: ['snackbar-success']
  //       });
  //     }).catch((err) => {
  //       console.error('Erro ao cadastrar a transação:', err);
  //     });
  //   } else {
  //     console.log('Formulário inválido!');
  //   }
  // }

  onSubmit(): void {
    if (this.isValidForm()) {
      if (this.transaction.id) {
        // Caso tenha um ID, é uma edição
        this.transactionService.updateTransaction(this.transaction).then(() => {
          console.log('Transação atualizada com sucesso!');
          this.loadData();
          this.router.navigate(['listagem']); // Redireciona após editar

          this.snackBar.open('Transação atualizada com sucesso!', '✖', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        }).catch((err) => {
          console.error('Erro ao atualizar a transação:', err);
        });
      } else {
        // Se não tem ID, é uma nova transação
        this.transactionService.addTransaction(this.transaction).then(() => {
          console.log('Transação cadastrada com sucesso!');
          this.loadData();
          this.resetForm();

          this.snackBar.open('Transação cadastrada com sucesso!', '✖', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        }).catch((err) => {
          console.error('Erro ao cadastrar a transação:', err);
        });
      }
    } else {
      console.log('Formulário inválido!');
    }
  }

  isValidForm(): boolean {
    return this.transaction.nome !== '' &&
      this.transaction.valor > 0 && !isNaN(this.transaction.data.getTime()) &&
      this.transaction.categoria !== '' && this.transaction.descricao !== '';
  }


  loadData(): void {
    this.transactionService.getTransactions().then(dados => {

      this.dataSource.data = dados;

      this.processarDadosGrafico(dados);
    });
  }

  processarDadosGrafico(dados: Transaction[]): void {
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

    const ultimosSeteDias = Array.from(transacoesPorData.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .slice(-7);

    this.diasDoMes = ultimosSeteDias.map(d => d[0]);
    this.entradas = ultimosSeteDias.map(d => d[1].entrada);
    this.saidas = ultimosSeteDias.map(d => d[1].saida);

  }




  resetForm(): void {
    this.transaction = this.newTransaction();
  }
}
