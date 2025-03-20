import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Dica } from '../model/dica.model';

@Injectable({
  providedIn: 'root'
})
export class DicaService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  listarDicas(): Observable<Dica[]> {
    return this.http.get<Dica[]>(this.apiUrl);
  }
}
