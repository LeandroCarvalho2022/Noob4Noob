import { Injectable } from '@angular/core';
import { Firestore, doc } from 'firebase/firestore';
import { User } from '../models/user';
import { Observable, from, of, switchMap } from 'rxjs';
import { docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore : Firestore,
    private auth : AuthService,
    private afAuth : AngularFireAuth) { }

  getCurrentUserProfile$(): Observable<User | null>  {
    return this.auth.currentUser$.pipe(
      switchMap(user =>{
        if (!user?.uid){
          return of(null)
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<User>;
      })
    )
  }

  addUser( user : User): Observable<any>{
    const ref = doc(this.firestore, 'users', user.id)
    return from(setDoc(ref, user))
  }
  updateUser( user : User): Observable<any>{
    const ref = doc(this.firestore, 'users', user.id)
    return from(updateDoc(ref, {...user}))
  }
}
