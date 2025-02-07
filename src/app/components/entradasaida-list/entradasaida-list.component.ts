// entradasaida-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEntradasGastos } from '../../interfaces/entradasgastos.interface';
import { DadosEntradaService } from '../../services/dadosentrada.service';

@Component({
  selector: 'app-entradasaida-list',
  templateUrl: './entradasaida-list.component.html',
  styleUrls: ['./entradasaida-list.component.scss']
})
export class EntradasaidaListComponent implements OnInit {
  dataSource = new MatTableDataSource<IEntradasGastos>([]);
  displayedColumns: string[] = ['nome', 'valor', 'tipo', 'dataRegistro'];
  registroSelecionado: IEntradasGastos = {
    nome: '',
    valor: 0,
    tipo: false,
    data: new Date().toISOString(),
    categoria: '',
    descricao: ''
  }; 

  constructor(private dadosEntradaService: DadosEntradaService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Atualiza os dados da tabela com os dados mais recentes do serviço
    this.dataSource.data = this.dadosEntradaService.getDadosEntrada();
  }

  // Método para lidar com a seleção de um item da tabela
  onEntradaSelected(registro: IEntradasGastos): void {
    this.registroSelecionado = registro;  // Define o registro selecionado
  }

  // Método para lidar com a exclusão do registro
  onRegistroExcluido(registro: IEntradasGastos): void {
    this.loadData();  // Recarrega os dados após a exclusão
    this.registroSelecionado = {
      nome: '',
      valor: 0,
      tipo: false,
      data: new Date().toISOString(),
      categoria: '',
      descricao: ''
    };  // Limpa a seleção de registro
  }
  
}










