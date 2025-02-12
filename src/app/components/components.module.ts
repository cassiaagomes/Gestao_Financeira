import { NgModule } from "@angular/core";
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DetalhesGastosComponent } from './detalhes-gastos/detalhes-gastos.component';
import { FiltroComponent } from './filtro/filtro.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from "@angular/common";
import { EntradasaidaListComponent } from './entradasaida-list/entradasaida-list.component';
import { CadastroDespesasComponent } from './cadastro-despesas/cadastro-despesas.component';
import { EditarMovimentacoesComponent } from './editar-movimentacoes/editar-movimentacoes.component';


@NgModule({
    declarations: [
        DetalhesGastosComponent,
        FiltroComponent,
        EntradasaidaListComponent,
        CadastroDespesasComponent,
        EditarMovimentacoesComponent,

    ],
    imports: [
        AngularMaterialModule,
        FormsModule,
        CommonModule
    ],
  exports: [
    DetalhesGastosComponent,
    FiltroComponent,
    FormsModule,
    CadastroDespesasComponent,
    EntradasaidaListComponent,

  ],

})
export class ComponentsModule { }
