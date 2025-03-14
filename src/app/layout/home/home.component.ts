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
  diasDoMes: string[] = []; 

  constructor(private router: Router, private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getDadosEntrada().subscribe(dados => {
      this.DadosEntrada = dados;
      this.processarDados();
      this.atualizarGrafico();
    });
  }

  loadData() {
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
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 6); 

    const dadosPorDia: { [data: string]: { saldo: number; cor: string; tipo: string } } = {};

    let saldoAcumulado = 0;
    for (let i = 0; i < 7; i++) {
        const data = new Date(seteDiasAtras);
        data.setDate(seteDiasAtras.getDate() + i);
        const dataFormatada = data.toISOString().split('T')[0];

        dadosPorDia[dataFormatada] = { saldo: saldoAcumulado, cor: saldoAcumulado >= 0 ? '#FFFFFF' : '#FF0000', tipo: '' };
    }

    this.DadosEntrada
        .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
        .forEach(dado => {
            const dataTransacao = new Date(dado.data).toISOString().split('T')[0];
            if (dataTransacao in dadosPorDia) {
                saldoAcumulado += dado.tipo ? dado.valor : -dado.valor;
                dadosPorDia[dataTransacao] = { 
                    saldo: saldoAcumulado, 
                    cor: saldoAcumulado >= 0 ? '#FFFFFF' : '#FF0000',
                    tipo: dado.tipo ? 'Entrada' : 'Saída' 
                };
            }
        });

    const datas = Object.keys(dadosPorDia);
    const saldo = datas.map(data => dadosPorDia[data].saldo);
    const cores = datas.map(data => dadosPorDia[data].cor);
    const tipos = datas.map(data => dadosPorDia[data].tipo);

    this.chartOption = {
        title: {
            text: 'Movimentação Semanal',
            left: 'center',
            top: '20px',
            textStyle: { color: '#FFFFFF' }
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const index = params[0].dataIndex;
                const data = datas[index];
                const valor = saldo[index];
                const tipo = tipos[index] ? ` (${tipos[index]})` : ''; 
                return `Data: ${data}<br/>Saldo: ${valor}${tipo}`;
            },
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 5,
            padding: 10,
            textStyle: { color: '#FFFFFF' }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: datas,
            axisLine: { lineStyle: { color: '#AAAAAA' } }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#AAAAAA' } },
            splitLine: { lineStyle: { color: '#333' } }
        },
        series: [
            {
                name: 'Saldo',
                type: 'line',
                smooth: true,
                data: saldo,
                lineStyle: { color: '#00FF00' },
                itemStyle: {
                    color: (params) => cores[params.dataIndex],
                    borderWidth: 2,
                    borderColor: '#000000'
                },
                symbol: 'circle',
                symbolSize: 8,
                areaStyle: { color: 'rgba(0, 255, 0, 0.2)' }
            }
        ]
    };
}


}