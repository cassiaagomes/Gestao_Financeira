import { Component, Input } from '@angular/core';
import { IEntradasGastos } from '../../interfaces/entradasgastos/entradasgatos.interface';

@Component({
  selector: 'app-detalhes-gastos',
  templateUrl: './detalhes-gastos.component.html',
  styleUrl: './detalhes-gastos.component.scss'
})
export class DetalhesGastosComponent {
  @Input({required: true}) registro: IEntradasGastos = { } as IEntradasGastos;
}
