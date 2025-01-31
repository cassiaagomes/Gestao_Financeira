import { Component } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent {
  tipos = [
    {value: 'entrada', viewValue: 'Entrada'},
    {value: 'saída', viewValue: 'Saída'}
  ];
}


