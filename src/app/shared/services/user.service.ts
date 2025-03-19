import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  registerUser(user: User): Observable<User> {
    const newUser: User = {
      ...user,
    };
    return this.http.post<User>(this.apiUrl, newUser);
  }

  async getUserData(userId: string): Promise<any> {
    return Promise.resolve({ id: userId, name: 'User Name', email: 'user@example.com' });
  }

  loginUser(email: string, senha: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&senha=${senha}`);
  }
}

