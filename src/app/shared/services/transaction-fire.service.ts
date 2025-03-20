import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Transaction } from '../model/transaction';
import { Timestamp } from '@angular/fire/firestore';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionFireService {
  private firestore: Firestore = inject(Firestore);
  private firebaseAuth: Auth;

  constructor(private authService: AuthService, private messageService: MessageService) {
    this.firebaseAuth = getAuth();
  }

  async addTransaction(transaction: Transaction) {
    const userId = this.authService.getUserId();
    if (userId) {
      try {
        const transactionRef = collection(this.firestore, 'transactions');
        await addDoc(transactionRef, {
          userId: userId,
          nome: transaction.nome,
          valor: transaction.valor,
          tipo: transaction.tipo,
          data: transaction.data,
          categoria: transaction.categoria,
          descricao: transaction.descricao,
        });
        this.messageService.MensagemSucesso('Transação adicionada com sucesso!');
      } catch (error) {
        this.messageService.MensagemErro('Erro ao adicionar transação.');
        console.error('Erro ao adicionar transação:', error);
      }
    }
  }

  async getTransactions(): Promise<Transaction[]> {
    const userId = this.authService.getUserId();
    if (userId) {
      try {
        const transactionRef = collection(this.firestore, 'transactions');
        const q = query(transactionRef, where('userId', '==', userId));
        const snapshot = await getDocs(q);
        const transactions: Transaction[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nome: data['nome'],
            valor: data['valor'],
            tipo: data['tipo'],
            data: data['data'] instanceof Timestamp ? data['data'].toDate() : new Date(data['data']),
            categoria: data['categoria'],
            descricao: data['descricao'],
          } as Transaction;
        });
        return transactions;
      } catch (error) {
        this.messageService.MensagemErro('Erro ao obter transações.');
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
        this.messageService.MensagemSucesso('Transação excluída com sucesso!');
      } catch (error) {
        this.messageService.MensagemErro('Erro ao excluir transação.');
        console.error('Erro ao excluir transação:', error);
      }
    }
  }

  async updateTransaction(transaction: Transaction) {
    const userId = this.authService.getUserId();
    if (userId && transaction.id) {
      try {
        const transactionRef = doc(this.firestore, 'transactions', transaction.id);
        await updateDoc(transactionRef, {
          nome: transaction.nome,
          valor: transaction.valor,
          tipo: transaction.tipo,
          data: transaction.data,
          categoria: transaction.categoria,
          descricao: transaction.descricao,
        });
        this.messageService.MensagemSucesso('Transação atualizada com sucesso!');
      } catch (error) {
        this.messageService.MensagemErro('Erro ao atualizar transação.');
        console.error('Erro ao atualizar transação:', error);
      }
    }
  }

  isAuthenticated(): boolean {
    const user = this.firebaseAuth.currentUser;
    return !!user;
  }

  getTransactionById(id: string): Promise<Transaction | undefined> {
    return this.getTransactions().then(transactions => {
      return transactions.find(transaction => transaction.id === id);
    });
  }
}
