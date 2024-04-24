import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { AlertsService } from '../../services/alerts.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-contato',
    standalone: true,
    templateUrl: './contato.component.html',
    styleUrl: './contato.component.css',
    imports: [MatFormFieldModule, MatIcon, CommonModule, FormsModule]
})
export class ContatoComponent {
  name: string = '';
  email: string = '';
  text: string = '';

  constructor(private router : Router,){}


  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs
      .sendForm('service_9crf6lf', 'template_93kboak', e.target as HTMLFormElement, {
        publicKey: 'VJRFH2N2hyEaecRzh',
      })
      .then(
        () => {
          Swal.fire('Mensagem enviada :D ', 'success')
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
      this.name = '';
      this.email = '';
      this.text= '';
    }

  back(){
    this.router.navigate(['']);
  }

}

// emailjs.send("service_9crf6lf","template_93kboak",{
//   from_name: "TEste",
//   to_name: "Leandro",
//   message: "heloows amigo",
//   from_email: "tuufduu@gmail.com",
//   reply_to: "leandroacarvalho227@gmail.com",
//   });