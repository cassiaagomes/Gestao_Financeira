import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosEntradaService } from '../services/dadosentrada.service'; // Importe corretamente
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
    this.DadosEntrada = this.dadosEntradaService.getDadosEntrada();  // Pega os dados salvos no localStorage
    console.log(this.DadosEntrada); 
    this.carregarDados();
  }

  carregarDados() {
    this.DadosEntrada = this.dadosEntradaService.getDadosEntrada();
    this.ultimosGastos = this.DadosEntrada.slice(-3).reverse();
    this.calcularReceitaDespesas();
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  calcularReceitaDespesas() {
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    this.receitaMensal = this.DadosEntrada
      .filter(dado => dado.tipo && new Date(dado.data) >= trintaDiasAtras)
      .reduce((total, item) => total + item.valor, 0);

    this.despesasMensais = this.DadosEntrada
      .filter(dado => !dado.tipo && new Date(dado.data) >= trintaDiasAtras)
      .reduce((total, item) => total + item.valor, 0);
  }
}
