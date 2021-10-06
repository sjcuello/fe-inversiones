import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private errorService: ErrorService) {}

  handleError(error: Error) {
    let message;
    message = this.errorService.getErrorMensajeCliente(error);
    console.error(message);
  }
}

