import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosEntradaService } from '../services/dadosentrada.service';
import { IEntradasGastos } from '../interfaces/entradasgastos.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  DadosEntrada: IEntradasGastos[] = [];
  ultimosGastos: IEntradasGastos[] = [];
  receitaMensal: number = 0;
  despesasMensais: number = 0;

  constructor(private router: Router, private dadosEntradaService: DadosEntradaService) {}

  ngOnInit() {
    this.dadosEntradaService.getDadosEntrada().subscribe(dados => {
      this.DadosEntrada = dados;
      this.processarDados();
    });
  }

  processarDados() {
    this.ultimosGastos = [...this.DadosEntrada]
      .filter(dado => dado.data) // Filtrar apenas os que possuem data
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()) // Ordenar por data (descendente)
      .slice(0, 3); // Pegar os 3 mais recentes

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

  goTo(path: string) {
    this.router.navigate([path]);
  }
}

