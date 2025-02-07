import { Component } from '@angular/core';
import { IEntradasGastos } from './interfaces/entradasgastos.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  registroSelected: IEntradasGastos = { } as IEntradasGastos;	
  showDetalhes: boolean = false;

  onEntradaSelected(registro: IEntradasGastos) {
    this.registroSelected = registro;
    this.showDetalhes = true;
  }
}
