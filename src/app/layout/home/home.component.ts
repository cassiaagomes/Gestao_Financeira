import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Router } from '@angular/router';
import { TransactionService } from '../../shared/services/transaction.service';
import { Transaction } from '../../shared/model/transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  DadosEntrada: Transaction []= [];
  ultimasTransacoes: Transaction[] = [];
  receitaMensal: number = 0;
  despesasMensais: number = 0;
  chartOption: EChartsOption = {};

  constructor(private router: Router, private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getDadosEntrada().subscribe(dados => {
      this.DadosEntrada = dados;
      this.processarDados();
      this.atualizarGrafico();
    });
  }

  processarDados() {
    this.ultimasTransacoes = [...this.DadosEntrada]
      .filter(dado => dado.data)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      .slice(0, 3);

    this.calcularReceitaDespesas();
  }

  calcularReceitaDespesas() {
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    this.receitaMensal = this.DadosEntrada
      .filter(dado => dado.tipo && this.isWithinLast30Days(dado.data))
      .reduce((total, item) => total + item.valor, 0);

    this.despesasMensais = this.DadosEntrada
      .filter(dado => !dado.tipo && this.isWithinLast30Days(dado.data))
      .reduce((total, item) => total + item.valor, 0);
  }

  isWithinLast30Days(dataString: string): boolean {
    const data = new Date(dataString);
    return !isNaN(data.getTime()) && data >= new Date(new Date().setDate(new Date().getDate() - 30));
  }

  goTo(page: string) {
    if (page === 'cadastro') {
      this.router.navigate(['/metas']);
    } else if (page === 'listagem') {
      this.router.navigate(['/lancamentos']);
    }
  }
  atualizarGrafico() {
    this.chartOption = {
      title: {
        text: 'Entradas vs Saídas',
        left: 'center',
        top: '20px',
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: '0',
        itemWidth: 20,
        itemHeight: 10,
        padding: [10, 0],
      },
      color: ['#1565c0', '#fb8c00'],
      series: [
        {
          name: 'Valores',
          type: 'pie',
          radius: '50%',
          data: [
            { name: 'Entradas', value: this.receitaMensal },
            { name: 'Saídas', value: this.despesasMensais }
          ],
          label: {
            show: true,
            formatter: (params) => {
              return `${params.name}: R$ ${(params.value as number ?? 0).toFixed(2).replace('.', ',')}`;
            }
          }
        }
      ]
    };
  }
}
