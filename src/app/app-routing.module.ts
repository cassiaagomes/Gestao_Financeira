import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradasaidaListComponent } from './components/entradasaida-list/entradasaida-list.component';
import { DetalhesGastosComponent } from './components/detalhes-gastos/detalhes-gastos.component';
import { CadastroDespesasComponent } from './components/cadastro-despesas/cadastro-despesas.component';
import { EditarMovimentacoesComponent } from './components/editar-movimentacoes/editar-movimentacoes.component';
import { HomeComponent } from './layout/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalhes/:nome', component: DetalhesGastosComponent },
  { path: 'cadastro', component: CadastroDespesasComponent },
  { path: 'listagem', component: EntradasaidaListComponent },
  { path: 'editar-movimentacoes/:id', component: EditarMovimentacoesComponent },
  { path: '', redirectTo: 'visaoGeral', pathMatch: 'full' }, 
  { path: 'visaoGeral', component: HomeComponent },
  { path: 'lancamentos', component: EntradasaidaListComponent }, 
  { path: 'metas', component: CadastroDespesasComponent } 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }