import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  idToken,
  signInWithPopup,
  user,
  UserCredential,
} from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Firestore, setDoc } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  checkEmailExists: any;
  currentUser$ = authState(this.auth);
  constructor(
    private afAuth: AngularFireAuth,
    private angFs: AngularFirestore,
    private auth: Auth
  ) {}
  private _firestore = inject(Firestore);
  private _auth = inject(Auth);

async byGoogle(email: string): Promise<UserCredential> {
  const userCredential = await signInWithPopup(this._auth, new GoogleAuthProvider());

  const userRef = this.angFs.collection('users').doc(userCredential.user.uid);
  userRef.get().subscribe(docSnapshot => {
    if (docSnapshot.exists) {
      userRef.update({ email: email });
    } else {
      userRef.set({ email: email });
    }
  });

  return userCredential;
}

  getUserData(userUid: string): Observable<any> {
    return this.angFs.collection('users').doc(userUid).valueChanges();
  }

  signup(
    email: string,
    password: string,
    name: string
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    ).then((userCredential) => {
      return this.angFs
        .collection('users')
        .doc(userCredential.user.uid)
        .set({
          email: email,
          displayName: name,
        })
        .then(() => {
          return userCredential;
        });
    });
  }
  login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim()
    ).then(async (auth) => {
      const userDocRef: firebase.firestore.DocumentReference<any> = firebase
        .firestore()
        .doc(`users/${auth.user.uid}`);
      const docSnapshot = await userDocRef.get();
      if (!docSnapshot.exists) {
        await setDoc(userDocRef, {
          id: auth.user.uid,
          name: auth.user.displayName || '',
          email: auth.user.email || '',
          photoURL: '',
        });
      }
      return {
        id: auth.user.uid,
        name: auth.user.displayName || '',
        email: auth.user.email || '',
        photoURL: '',
      };
    });
  }

  authState$ = authState(this._auth);
  user$ = user(this._auth);
  idToken$ = idToken(this._auth);

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        Swal.fire(
          'Email enviado com sucesso.',
          'Veja sua caixa de mensagem BB',
          'success'
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Alguma coisa deu errado confere o email ai pfv!',
        });
      });
  }

  async isAdmin(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return user?.email === 'leandroacarvalho227@gmail.com';
    
  }
  async isLoggedIn(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return user !== null;
  }

  async shouldShowAlert(uid: string): Promise<boolean> {
    if (!uid) return true;
    const docRef = this.angFs.collection('users').doc(uid);
    const docSnapshot = await docRef.get().toPromise();
    if (docSnapshot && docSnapshot.exists) {
      const userData = docSnapshot.data() as any;
      return userData.showAlert !== false;
    }
    return true;
  }

  async updateAlertPreference(uid: string, showAlert: boolean): Promise<void> {
    if (!uid) return;
    const docRef = this.angFs.collection('users').doc(uid);
    await docRef.set({ showAlert }, { merge: true });
  }
}

// login(email: string, password: string): Promise<User> {
//   return signInWithEmailAndPassword(
//       this._auth,
//       email.trim(),
//       password.trim()
//     ).then((auth) => this._setUserData(auth)); // 👈👈👈 new
//   }

// private _setUserData(auth: UserCredential): Promise<User> {
//   const user: User = {
//     id: auth.user.uid,
//     name: (auth.user.displayName || auth.user.email)!,
//     email: auth.user.email!,
//     emailVerified: auth.user.emailVerified,
//     // custom ones
//     platformId: 'xyz',
//     lang: 'yzx',
//   };
//   try {
//     const userRef = doc(db, 'users', auth.user.uid);
//     await setDoc(userRef, userData);
//     console.log('salvo');
//   } catch{
//     console.error('eerrrooo pra salvaaaaaaaa');
//     throw new
//   }
// }
