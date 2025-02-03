import { Component, OnInit, NgModule, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DadosEntrada } from '../../data/dadosentrada';
import { IEntradasGastos } from '../../interfaces/entradasgastos/entradasgatos.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entradasaida-list',
  templateUrl: './entradasaida-list.component.html',
  styleUrls: ['./entradasaida-list.component.scss']
})
export class EntradasaidaListComponent implements OnInit {
  dataSource = new MatTableDataSource<IEntradasGastos>([]);
  displayedColumns: string[] = ['nome', 'valor', 'tipo', 'dataRegistro']; 

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataSource.data = DadosEntrada; 
  }

  @Output('EntradaSelected') EntradaSelectedEmitt = new EventEmitter<IEntradasGastos>();

  onEntradaSelected(registro: IEntradasGastos): void {
    console.log('registro', registro);

    this.EntradaSelectedEmitt.emit(registro);
  }
}


@NgModule({
  imports: [
    RouterModule
  ]
})
export class EntradasaidaListModule { }




