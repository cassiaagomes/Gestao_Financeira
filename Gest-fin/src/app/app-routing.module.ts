import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradasaidaListComponent } from './components/entradasaida-list/entradasaida-list.component';
import { DetalhesGastosComponent } from './components/detalhes-gastos/detalhes-gastos.component';

const routes: Routes = [
  { path: '', component: EntradasaidaListComponent },
  { path: 'detalhes/:nome', component: DetalhesGastosComponent } // Rota para detalhes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




