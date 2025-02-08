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
  registroSelecionado: IEntradasGastos | null = null;


  constructor(private dadosEntradaService: DadosEntradaService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.dadosEntradaService.getDadosEntrada().subscribe(dados => {
      this.dataSource.data = dados;
    });
  }

  onEntradaSelected(registro: IEntradasGastos): void {
    this.registroSelecionado = registro;  
  }

  onRegistroExcluido(registro: IEntradasGastos): void {
    if (registro && registro.id) {
      console.log('Excluindo o registro com ID:', registro.id);
  
      this.dadosEntradaService.deleteRegistro(registro.id).subscribe({
        next: () => {
          console.log('Registro excluído com sucesso!');
          this.loadData();
          this.registroSelecionado = null; 
        },
        error: (err) => {
          console.error('Erro ao excluir registro:', err);
        }
      });
    } else {
      console.log('Erro: Nenhum id encontrado para o registro');
    }
  }
  
  

  aplicarFiltro(filtro: { nome?: string; data?: string; tipo?: string }): void {
    this.dadosEntradaService.getDadosEntrada().subscribe(dados => {
      let dadosFiltrados = [...dados]; 
  
      if (filtro.nome && filtro.nome.trim() !== '') {
        dadosFiltrados = dadosFiltrados.filter(d => 
          d.nome.toLowerCase().includes(filtro.nome!.toLowerCase())
        );
      }
  
      if (filtro.data && filtro.data.trim() !== '') {
        dadosFiltrados = dadosFiltrados.filter(d => 
          new Date(d.data).toISOString().split('T')[0] === new Date(filtro.data!).toISOString().split('T')[0]
        );
      }
  
      if (filtro.tipo && filtro.tipo.trim() !== '') {
        dadosFiltrados = dadosFiltrados.filter(d => 
          filtro.tipo === 'entrada' ? d.tipo : !d.tipo
        );
      }
  
      this.dataSource.data = dadosFiltrados; 
    });
  }
  
  
  
  
}










