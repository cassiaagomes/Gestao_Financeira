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
import { HomeComponent } from './layout/home/home.component';
import { TransactionFireService } from './shared/services/transaction-fire.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { LoginComponent } from './layout/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environments';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({ echarts }),
    AngularMaterialModule,
    RouterModule,
    HttpClientModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,

  ],
  providers: [
    TransactionFireService,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],

  bootstrap: [AppComponent]

})
export class AppModule { }
