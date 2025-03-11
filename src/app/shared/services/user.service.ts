import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Endpoint JSON Server

  constructor(private http: HttpClient) {}

  // Obter todos os usuários cadastrados
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Cadastrar novo usuário
  registerUser(user: User): Observable<User> {
    const newUser: User = {
      ...user,
    };
    return this.http.post<User>(this.apiUrl, newUser);
  }

  // Verificar se o usuário existe no JSON Server
  loginUser(email: string, senha: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&senha=${senha}`);
  }
}
