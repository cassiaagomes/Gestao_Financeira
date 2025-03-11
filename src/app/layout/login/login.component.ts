import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
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

  constructor(private router: Router, @Inject(UserService) private userService: UserService) {}

  alternarModo() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.isLogin) {
      this.userService.loginUser(this.email, this.senha).subscribe((users) => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('userId', user.id); // Armazena o usuário logado
          alert('Login realizado com sucesso!');
          this.router.navigate(['/home']);
        } else {
          alert('Usuário ou senha incorretos.');
        }
      });
    } else {
      const newUser: User = { id: '', nome: this.nome, email: this.email, senha: this.senha };
      this.userService.registerUser(newUser).subscribe(() => {
        alert('Cadastro realizado com sucesso! Faça login.');
        this.alternarModo();
      });
    }
  }
}

