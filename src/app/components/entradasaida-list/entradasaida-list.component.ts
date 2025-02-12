import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../../shared/model/transaction';
import { TransactionService } from '../../shared/services/transaction.service';

@Component({
  selector: 'app-entradasaida-list',
  templateUrl: './entradasaida-list.component.html',
  styleUrls: ['./entradasaida-list.component.scss']
})
export class EntradasaidaListComponent implements OnInit {
  dataSource = new MatTableDataSource<Transaction>([]);
  displayedColumns: string[] = ['nome', 'valor', 'tipo', 'dataRegistro'];
  registroSelecionado: Transaction| null = null;


  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.transactionService.getDadosEntrada().subscribe(dados => {
      this.dataSource.data = dados;
    });
  }

  onEntradaSelected(registro: Transaction): void {
    this.registroSelecionado = registro;
  }

  onRegistroExcluido(registro: Transaction): void {
    if (registro && registro.id) {
      this.transactionService.deleteRegistro(registro).subscribe({
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
    this.transactionService.getDadosEntrada().subscribe(dados => {
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










