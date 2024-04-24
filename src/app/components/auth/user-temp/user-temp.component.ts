import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Subscriber } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-user-temp',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],  
  templateUrl: './user-temp.component.html',
  styleUrl: './user-temp.component.css',
})
export class UserTempComponent implements OnInit {
  userData: any;
  srcResult: any;
  profileForm: FormGroup;

  constructor(
    private auth: AuthService,
    private afauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.profileForm = this.formBuilder.group({
      uid: [''],
      email: [''],
      displayName: ['' , [Validators.maxLength(9)]],
      photoURL: ['']
    });
  }

  ngOnInit(): void {
    this.auth.authState$.subscribe((user) => {
      if (user) {
        this.firestore.collection('users')
          .doc(user.uid)
          .valueChanges()
          .subscribe((userData: any) => {
            this.userData = {
              uid: user.uid,
              email: user.email,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
            };
            this.profileForm.patchValue({
              uid: user.uid,
              email: user.email,
              displayName: userData.displayName,
              photoURL: userData.photoURL
            });
            // Now that userData is populated, you can proceed with the update
            this.profileForm.get('displayName')?.setValue(this.userData.displayName);
            this.profileForm.get('email')?.setValue(this.userData.email);
            console.log('userdata',this.userData);
            
          });
      }
    });
  }
  
  
 
  saveProfile(): void {
    const newUsername = this.profileForm.get('displayName')?.value;
    const newPhotoURL = this.srcResult;
  
    if (!newUsername.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'O nome de usuário não pode ser nulo.',
      });
      return;
    }
  
    const updateData: any = { displayName: newUsername };
    if (newPhotoURL) {
      updateData.photoURL = newPhotoURL;
    }
  
    // Update user information in the 'users' collection
    this.firestore.collection('users').doc(this.userData.uid).update(updateData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Perfil atualizado',
          text: 'Perfil atualizado com sucesso!',
        });
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Algo deu errado ao atualizar o perfil.',
        });
      });
  
    // esse trecho e responsavel por mudar tambem dentro da collection, utilizando a query.
    this.firestore.collectionGroup('comments', ref => ref.where('uid', '==', this.userData.uid))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            displayName: newUsername,
            photoURL: newPhotoURL
          });
        });
      });
      //
      this.firestore.collectionGroup('replies', ref => ref.where('uid', '==', this.userData.uid))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            displayName: newUsername,
            photoURL: newPhotoURL
          });
        });
      });
  }
  

  
  onFileSelected(event: any) {
    const inputNode = event.target;
    if (inputNode.files && inputNode.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsDataURL(inputNode.files[0]);
    }
  }
  logout(): void {
    this.afauth.signOut();

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
}


















 // saveProfile(): void {
  //   const newUsername = this.profileForm.get('displayName')?.value;
  //   const newPhotoURL = this.srcResult;
  
  //   if (!newUsername.trim()) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Erro',
  //       text: 'O nome de usuário não pode ser nulo.',
  //     });
  //     return;
  //   }
  
  //   const updateData: any = { displayName: newUsername };
  //   if (newPhotoURL) {
  //     updateData.photoURL = newPhotoURL;
  //   }
  
  //   this.firestore.collection('users').doc(this.userData.uid).set(updateData)
  //     .then(() => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Perfil atualizado',
  //         text: 'Perfil atualizado com sucesso!',
  //       });
  //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //         this.router.navigate(['/user']);
  //       });
  //     }).catch((error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Erro',
  //         text: 'Algo deu errado ao atualizar o perfil.',
  //       });
  //       console.log(error);
  //     });
  // }