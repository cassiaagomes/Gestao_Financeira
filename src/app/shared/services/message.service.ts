import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {}

  MensagemSucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-sucesso']
    });
  }

  MensagemErro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-erro']
    });
  }

}
