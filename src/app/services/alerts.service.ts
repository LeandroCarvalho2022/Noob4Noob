import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  message : string = '';

  constructor() { }

  add(message:string): Promise<void> {
    this.message = message;
    return new Promise(resolve => {
      setTimeout(() => {
        this.clear();
        resolve();
      }, 3000);
    });
  }
  clear(){
    this.message = '';
  }
  showAlertWithCountdown(): void {
    let counter = 3;
    const countdownInterval = setInterval(() => {
      if (counter === 0) {
        clearInterval(countdownInterval);
        Swal.close();
      } else {
        Swal.update({
          icon: 'error',
          title: 'Oops...',
          text: `Alguma coisa deu errado, confira o email ou a senha, por favor! Fechando em ${counter} segundos.`,
          showConfirmButton: false
        });
        counter--;
      }
    }, 1000);
  }

}
