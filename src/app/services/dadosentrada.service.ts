import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEntradasGastos } from '../interfaces/entradasgastos.interface';

@Injectable({
  providedIn: 'root'
})
export class DadosEntradaService {
  private apiUrl = 'http://localhost:3000/dados';

  constructor(private http: HttpClient) {}

 
  private gerarId(): string {
    return Date.now().toString(36) + Math.random().toString(8).substring(2, 5);
  }

  getDadosEntrada(): Observable<IEntradasGastos[]> {
    return this.http.get<IEntradasGastos[]>(this.apiUrl);
  }

  adicionarDespesa(despesa: Omit<IEntradasGastos, 'id'>): Observable<any> {
    const novaDespesa: IEntradasGastos = {
      ...despesa,
      id: this.gerarId()
    };

    return this.http.post(this.apiUrl, novaDespesa);
  }

  deleteRegistro(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Excluindo registro com ID:', id, 'URL:', url); // Log para debug
    return this.http.delete<void>(url);
  }
  
  
}






