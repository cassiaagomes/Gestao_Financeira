import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';  // Importando Firestore
import { inject } from '@angular/core';
import { User } from '../model/user';  

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore); 

  constructor() {}

  async register(user: User) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, user.senha);
      console.log('Usuário registrado:', userCredential);

      const userId = userCredential.user.uid;
      const userRef = doc(this.firestore, 'users', userId);
      
      await setDoc(userRef, {
        nome: user.nome,
        email: user.email,
      });

      console.log('Dados do usuário salvos no Firestore');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }
  async login(email: string, senha: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, senha);
      console.log('Usuário logado:', userCredential);
      return userCredential;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  getUserId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }

  isLoggedIn(): boolean {
    const user = this.auth.currentUser;
    return !!user;
  }
}


