import { Component } from '@angular/core';
import { Transaction } from '../../shared/model/transaction';
import { TransactionService } from '../../shared/services/transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cadastro-despesas',
  templateUrl: './cadastro-despesas.component.html',
  styleUrls: ['./cadastro-despesas.component.scss']
})
export class CadastroDespesasComponent {
  despesa: Transaction = this.novaDespesa();
  dataSource = new MatTableDataSource<Transaction>([]);
  displayedColumns: string[] = ['nome', 'valor', 'tipo', 'dataRegistro'];

  constructor(private transactionService: TransactionService) {}

  novaDespesa(): Transaction {
    return {
      id: uuidv4(),
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
      this.despesa.id = this.generateId();

      this.transactionService.adicionarDespesa(this.despesa).subscribe({
        next: () => {
          console.log('Despesa cadastrada com sucesso!');
          this.loadData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erro ao cadastrar a despesa:', err);
        }
      });
    } else {
      console.log('Formulário inválido!');
    }
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }


  isValidForm(): boolean {
    return this.despesa.nome !== '' && this.despesa.valor > 0 && this.despesa.data !== '' && this.despesa.categoria !== '' && this.despesa.descricao !== '';
  }

  loadData(): void {
    this.transactionService.getDadosEntrada().subscribe(dados => {
      this.dataSource.data = dados;
    });
  }

  resetForm(): void {
    this.despesa = this.novaDespesa();
  }

  ngOnInit(): void {
    this.loadData();
  }
}

