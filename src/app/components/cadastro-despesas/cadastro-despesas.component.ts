import { Component } from '@angular/core';
import { IEntradasGastos } from '../../interfaces/entradasgastos.interface';
import { DadosEntradaService } from '../../services/dadosentrada.service';
import { MatTableDataSource } from '@angular/material/table';  // Importando para atualizar a tabela

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

  dataSource = new MatTableDataSource<IEntradasGastos>([]);  // Fonte de dados para a tabela
  displayedColumns: string[] = ['nome', 'valor', 'tipo', 'dataRegistro'];  // Colunas da tabela

  constructor(private dadosEntradaService: DadosEntradaService) {}

  onSubmit(): void {
    if (this.isValidForm()) {
      // Adiciona a despesa ao serviço
      this.dadosEntradaService.adicionarDespesa(this.despesa);
      
      // Atualiza a tabela
      this.loadData();
      
      // Reseta o formulário
      this.resetForm();
      
      console.log('Dados cadastrados com sucesso!');
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

  loadData(): void {
    // Atualiza os dados da tabela com os dados mais recentes do localStorage (via serviço)
    this.dataSource.data = this.dadosEntradaService.getDadosEntrada();  // Agora usa o método correto
  }

  ngOnInit(): void {
    // Carrega os dados ao iniciar o componente
    this.loadData();
  }
}
