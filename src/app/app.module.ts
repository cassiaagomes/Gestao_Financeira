import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { ComponentsModule } from './components/components.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DadosEntradaService } from './services/dadosentrada.service'; 
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule, 
    BrowserAnimationsModule,
    AngularMaterialModule,
    RouterModule,
    HttpClientModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [DadosEntradaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

