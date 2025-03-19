import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';  
import { User } from '../../shared/model/user'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLogin: boolean = true;
  nome: string = '';
  email: string = '';
  senha: string = '';

  constructor(private router: Router, private authService: AuthService) {}  
  alternarModo() {
    this.isLogin = !this.isLogin;
  }

  async onSubmit() {
    if (this.isLogin) {
      try {
        const userCredential = await this.authService.login(this.email, this.senha);
        
        if (userCredential.user?.uid) {
          localStorage.setItem('userId', userCredential.user.uid); 
          
          alert('Login realizado com sucesso!');
          this.router.navigate(['/home']); 
        }
      } catch (error) {
        alert('Usuário ou senha incorretos.');
        console.error(error);
      }
    } else {
      const newUser: User = { id: '', nome: this.nome, email: this.email, senha: this.senha };
      
      try {
        await this.authService.register(newUser);
        alert('Cadastro realizado com sucesso! Faça login.');

        this.alternarModo();
      } catch (error) {
        alert('Erro ao cadastrar. Tente novamente.');
        console.error(error);
      }
    }
  }
}
