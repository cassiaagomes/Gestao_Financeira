import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEntradasGastos } from '../../interfaces/entradasgastos.interface';
import { DadosEntradaService } from '../../services/dadosentrada.service';

@Component({
  selector: 'app-detalhes-gastos',
  templateUrl: './detalhes-gastos.component.html',
  styleUrls: ['./detalhes-gastos.component.scss']
})
export class DetalhesGastosComponent {
  @Input({required: true}) registro: IEntradasGastos = {} as IEntradasGastos;
  @Output() registroExcluido: EventEmitter<IEntradasGastos> = new EventEmitter<IEntradasGastos>();

  constructor(private dadosEntradaService: DadosEntradaService) {}

  excluirRegistro(): void {

    this.dadosEntradaService.excluirDespesa(this.registro);
    
    this.registroExcluido.emit(this.registro);

    console.log('Registro excluído:', this.registro);
  }
}

