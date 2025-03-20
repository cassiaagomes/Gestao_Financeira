import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MessageService} from "./shared/services/message.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

  constructor(private mensagemService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.mensagemService.MensagemErro('Erro de conexão com o servidor.');
        } else {
          const mensagemErro = error.error.message || 'Erro inesperado.';
          this.mensagemService.MensagemErro(mensagemErro);
        }
        return throwError(()=> error);
      })
    );
  }
}
