import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import {TransactionMaintenanceComponent} from "./components/transaction-maintenance/transaction-maintenance.component";
import {TransactionListComponent} from "./components/transaction-list/transaction-list.component";
import {TransactionDetailComponent} from "./components/transaction-detail/transaction-detail.component";
import { LoginComponent } from './layout/login/login.component';



const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'home', component: HomeComponent},
  { path: 'manutencao', component: TransactionMaintenanceComponent },
  { path: 'listagem', component: TransactionListComponent },
  { path: 'lancamentos', component: TransactionListComponent},
  { path: 'metas', component: TransactionMaintenanceComponent},
  { path: 'transaction-maintenance/:id', component: TransactionMaintenanceComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
