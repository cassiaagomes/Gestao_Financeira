import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradasaidaListComponent } from './components/entradasaida-list/entradasaida-list.component';
import { DetalhesGastosComponent } from './components/detalhes-gastos/detalhes-gastos.component';
import { CadastroDespesasComponent } from './components/cadastro-despesas/cadastro-despesas.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalhes/:nome', component: DetalhesGastosComponent },
  { path: 'cadastro', component: CadastroDespesasComponent },
  { path: 'listagem', component: EntradasaidaListComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




