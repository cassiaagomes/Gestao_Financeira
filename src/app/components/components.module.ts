import { NgModule } from "@angular/core";
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import {FormsModule} from '@angular/forms';
import { CommonModule } from "@angular/common";
import { TransactionMaintenanceComponent } from './transaction-maintenance/transaction-maintenance.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';


@NgModule({
    declarations: [
        TransactionMaintenanceComponent,
        TransactionListComponent,
        TransactionDetailComponent,

    ],
    imports: [
        AngularMaterialModule,
        FormsModule,
        CommonModule
    ],
  exports: [
    FormsModule,
    TransactionMaintenanceComponent,
    TransactionListComponent,
    TransactionDetailComponent

  ],

})
export class ComponentsModule { }
