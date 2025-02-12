import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../shared/model/transaction';
import { TransactionService } from '../../shared/services/transaction.service';

@Component({
  selector: 'app-editar-movimentacoes',
  templateUrl: './editar-movimentacoes.component.html',
  styleUrls: ['./editar-movimentacoes.component.scss']
})
export class EditarMovimentacoesComponent implements OnInit {
  movimentacao: Transaction = this.novaTransacao();
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.carregarTransacao();
    }
  }

  novaTransacao(): Transaction {
    return {
      id: '',
      nome: '',
      valor: 0,
      tipo: true,
      data: '',
      categoria: '',
      descricao: ''
    };
  }

  carregarTransacao(): void {
    this.transactionService.getDadosEntrada().subscribe({
      next: (transacoes) => {
        const transacaoEncontrada = transacoes.find(t => t.id === this.id);
        if (transacaoEncontrada) {
          this.movimentacao = transacaoEncontrada;
          console.log('Transação carregada:', this.movimentacao);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar a transação:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.isValidForm()) {
      this.transactionService.atualizarMovimentacao(this.id, this.movimentacao).subscribe({
        next: () => {
          console.log('Despesa atualizada com sucesso!');
          this.router.navigate(['/listagem']); //redireciona para a lista de despesas
        },
        error: (err) => {
          console.error('Erro ao atualizar a despesa:', err);
        }
      });
    } else {
      console.log('Formulário inválido!');
    }
  }

  isValidForm(): boolean {
    return (
      this.movimentacao.nome.trim() !== '' &&
      this.movimentacao.valor > 0 &&
      this.movimentacao.data.trim() !== '' &&
      this.movimentacao.categoria.trim() !== '' &&
      this.movimentacao.descricao.trim() !== ''
    );
  }

  cancelarEdicao(): void {
    this.router.navigate(['/listagem']); //retorna para a listagem
  }
}
