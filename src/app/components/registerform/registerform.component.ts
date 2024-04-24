import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';

import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    MatInput,
    RouterLink,
  ],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css',
})
export class RegisterformComponent {
  email : string = '';
  private _service = inject(AuthService);

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alerts: AlertsService,
    private auth: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [Validators.pattern('^[a-zA-Z0-9]{3,9}$'), Validators.required],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$'),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  byGoogle(
    email: string
  ): void {
    this._service
      .byGoogle(email)
      .then(() => { 
        Swal.fire('Registrado com sucesson ' ,`&#127881;` )
        this.router.navigate(['/user']);
      })
      .catch((error) => {
        console.error('Google authentication failed:', error);

      });
  }
  byForm(): void {
    const { email, password, name } = this.registerForm.value;
    this.auth
      .signup(email, password, name).then(() => {
        Swal.fire('Registrado com sucesson ' ,`&#127881;` )
        this.router.navigate(['/user']);
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  }  
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? { confirmPassword: true }
    : null;

};


