import { Component } from '@angular/core';
import { IEntradasGastos } from '../../interfaces/entradasgastos/entradasgatos.interface';
import { DadosEntrada } from '../../data/dadosentrada';  

@Component({
  selector: 'app-cadastro-despesas',
  templateUrl: './cadastro-despesas.component.html',
  styleUrls: ['./cadastro-despesas.component.scss']
})
export class CadastroDespesasComponent {
  
  despesa: IEntradasGastos = {
    nome: '',
    valor: 0,
    tipo: true, 
    data: '',
    categoria: '',
    descricao: ''
  };

 
  onSubmit(): void {
    if (this.isValidForm()) {
      
      DadosEntrada.push(this.despesa);  
      console.log('Despesa cadastrada:', this.despesa);
      this.resetForm();
    } else {
      console.log('Formulário inválido!');
    }
  }

  
  isValidForm(): boolean {
    return this.despesa.nome !== '' && this.despesa.valor > 0 && this.despesa.data !== '' && this.despesa.categoria !== '' && this.despesa.descricao !== '';
  }


  resetForm(): void {
    this.despesa = {
      nome: '',
      valor: 0,
      tipo: true,
      data: '',
      categoria: '',
      descricao: ''
    };
  }
}
