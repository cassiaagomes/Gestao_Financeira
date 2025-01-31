import { NgModule } from "@angular/core";
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DetalhesGastosComponent } from './detalhes-gastos/detalhes-gastos.component';
import { FiltroComponent } from './filtro/filtro.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        DetalhesGastosComponent,
        FiltroComponent
    ],
    imports: [
        AngularMaterialModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        DetalhesGastosComponent,
        FiltroComponent,
        FormsModule
    ],

})
export class ComponentsModule { }