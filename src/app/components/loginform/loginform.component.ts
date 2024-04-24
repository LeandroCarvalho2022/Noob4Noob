import { Component, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatFormField,
    MatError,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl:  './loginform.component.html',
  styleUrl: './loginform.component.css',
})
export class LoginformComponent implements OnInit{
  email: string = '';
  psw: string = '';
  isLoggedIn: boolean = true;
  private _service = inject(AuthService);
  constructor(
    private angfs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.auth.isLoggedIn().then((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  onSubmit(): void {
    this.auth
      .login(this.email, this.psw)
      .then(() => {
        // Login successful
        this.auth.authState$.subscribe((user) => {
          if (user) {
            this.angfs.collection('users')
              .doc(user.uid)
              .valueChanges()
              .subscribe((userData: any) => {
                const userName = userData.name;
                if (userData) {
                  this.auth.isAdmin().then((isAdmin) => {
                    if (isAdmin) {
                      Swal.fire('Bem vindo de volta DesenvolvedorMaisForte');
                      this.router.navigate(['/formstudy']);
                    } if (userData) {
                      Swal.fire('Login Feito com sucesso! Bemvindo, ', `${userName}`);
                      this.router.navigate(['']);
                    }
                  });
                } 
              });
          }
        });
      })
      .catch(() => {
        // Login failed
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro não existe conta cadastrada com este email: ' + this.email ,
        });
      });
  }
  // onSubmit(): void {
  //   this.auth
  //     .login(this.email, this.psw)
  //     .then((user) => {
  //       // Login successful
  //       if (user) {
  //         this.auth.isAdmin().then((isAdmin) => {
  //           if (isAdmin) {
  //             Swal.fire('Welcome back, Developer!');
  //             this.router.navigate(['/formstudy']);
  //           } else {
  //             Swal.fire('Login successful!');
  //             this.router.navigate(['']);
  //           }
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       // Login failed
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Error: No account found with this email: ' + this.email,
  //       });
  //     });
  // }
  
  byGoogle(email: string): void {
    this._service
      .byGoogle(email)
      .then(() => {
        Swal.fire(
          'Login feito com sucesso, seja bem vindo!',
          `<span style="font-size: 35px;" class="material-symbols-outlined">
        sentiment_very_satisfied
        </span>`
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/user']);
          }
        });
        // Perform additional actions such as registering the user or updating UI
      })
      .catch((error) => {
        // Google authentication failed
        Swal.fire({
          title: 'Deu algum bom com sua conta google?',
          text: 'Entre novamente no sua conta google e depois volte fazer login com ela aqui!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ok vou fazer!',
        })
        //
        // Display error message to the user
      });
  }

  logout(): void {
    this.afAuth.signOut();

    Swal.fire(
      'Vou sentir sdds, até breve!',
      `<span style="font-size: 35px;" class="material-symbols-outlined">
    heart_broken
    </span>`
    ).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['']);
      }
    });
  }
  back(){
    this.router.navigate([''])
  }
}


  // ngOnInit(): void {
  //   // Check if the user is already logged in, if yes, redirect based on role
  //   this.auth.isAdmin().then((isAdmin) => {
  //     if (isAdmin) {
  //       this.router.navigate(['/formstudy']); // Redirect to admin page
  //     } else {
  //       this.router.navigate(['']); // Redirect to user page
  //     }
  //   });
  // }

  // onSubmit(): void {
  //   this.afAuth
  //     .signInWithEmailAndPassword(this.email, this.psw)
  //     .then((userCredential) => {
  //       if (userCredential && userCredential.user) {
  //         if (userCredential.user.email === 'admin@gmail.com') {
  //           this.alerts.add('Login deu bom, tu vai pra página secreta ksks').then(() =>{
  //             this.router.navigate(['/formstudy']);
  //           });
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       this.alerts.add('login ñ Deu  bom garai ñ achei nada seu aqui não');
  //     });
  // }

