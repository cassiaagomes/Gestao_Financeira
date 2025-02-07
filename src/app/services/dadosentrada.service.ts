import { Injectable } from '@angular/core';
import { IEntradasGastos } from '../interfaces/entradasgastos.interface';

@Injectable({
  providedIn: 'root'
})
export class DadosEntradaService {

  private localStorageKey = 'dadosEntrada'; 

  constructor() { }

  getDadosEntrada(): IEntradasGastos[] {
    const dados = localStorage.getItem(this.localStorageKey);
    return dados ? JSON.parse(dados) : [];  
  }

  adicionarDespesa(despesa: IEntradasGastos): void {
    const dadosEntrada = this.getDadosEntrada();  
    dadosEntrada.push(despesa);  
    localStorage.setItem(this.localStorageKey, JSON.stringify(dadosEntrada));
  }


  excluirDespesa(despesa: IEntradasGastos): void {
    let dadosEntrada = this.getDadosEntrada();
    dadosEntrada = dadosEntrada.filter(item => item !== despesa); 
    localStorage.setItem(this.localStorageKey, JSON.stringify(dadosEntrada)); 
  }
}



