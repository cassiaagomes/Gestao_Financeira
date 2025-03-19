import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from '@angular/fire/firestore';  // Importando updateDoc corretamente
import { Auth, getAuth } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private firestore: Firestore = inject(Firestore);
  private firebaseAuth: Auth;

  constructor(private authService: AuthService) {
    this.firebaseAuth = getAuth();
  }

  async addTransaction(transaction: Transaction) {
    const userId = this.authService.getUserId();
    if (userId) {
      try {
        const transactionRef = collection(this.firestore, 'transactions');
        await addDoc(transactionRef, {
          userId: userId, 
          description: transaction.description,
          amount: transaction.amount,
          createdAt: new Date(),
        });
        alert('Transação realizada com sucesso!');
      } catch (error) {
        console.error('Erro ao adicionar transação:', error);
        alert('Erro ao realizar transação!');
      }
    }
  }

  async getTransactions() {
    const userId = this.authService.getUserId();
    if (userId) {
      try {
        const transactionRef = collection(this.firestore, 'transactions');
        const q = query(transactionRef, where('userId', '==', userId));  
        const snapshot = await getDocs(q);
        const transactions: Transaction[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Transaction));
        return transactions;
      } catch (error) {
        console.error('Erro ao obter transações:', error);
        return [];
      }
    }
    return [];
  }
  async deleteTransaction(transaction: Transaction) {
    const userId = this.authService.getUserId();
    if (userId && transaction.id) {
      try {
        const transactionRef = doc(this.firestore, 'transactions', transaction.id);
        await deleteDoc(transactionRef);
        alert('Transação excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir transação:', error);
        alert('Erro ao excluir transação!');
      }
    }
  }

  isAuthenticated(): boolean {
    const user = this.firebaseAuth.currentUser; 
    return !!user; 
  }

  async updateTransaction(transaction: Transaction) {
    const userId = this.authService.getUserId();
    if (userId && transaction.id) {
      try {
        const transactionRef = doc(this.firestore, 'transactions', transaction.id);
        await updateDoc(transactionRef, {
          description: transaction.description,
          amount: transaction.amount,
          updatedAt: new Date(),
        });
        alert('Transação atualizada com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        alert('Erro ao atualizar transação!');
      }
    }
  }
}

