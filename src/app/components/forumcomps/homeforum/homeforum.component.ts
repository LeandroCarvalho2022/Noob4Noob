import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { FabForumComponent } from '../fab-forum/fab-forum.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { FirestoreDatePipe } from '../../../pipe/pipe-date.pipe';
import { coments } from '../../../models/comments';
import { Postagens } from '../../../models/forum';
import { ReplyComment } from '../../../models/replies';
import { deleteDoc, doc } from 'firebase/firestore';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-homeforum',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatLabel,
    FirestoreDatePipe,
  ],
  templateUrl: './homeforum.component.html',
  styleUrl: './homeforum.component.css',
})
export class HomeforumComponent implements OnInit {
  postComments: { [postId: string]: Observable<coments[]> } = {};
  //toggles
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  comentInput: boolean = true;
  UserReplies : boolean = true;
  //toggles
  authState$: any;
  comments: string = '';
  commentId: string = '';
  replyText: string = '';
  commentsCollec: Observable<coments[]>;
  userData: any;
  postagens: Observable<Postagens[]>;
  updateFromSettings : Observable<User[]>;

  constructor(
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private authService: AuthService,
    private db : AngularFirestore,
    private router : Router
  ) {
    this.commentsCollec = this.afs
      .collection<coments>('comments')
      .valueChanges({ idComment: 'commentID' });
    this.postagens = this.afs
      .collection<Postagens>('forumPosts')
      .valueChanges({ idField: 'postID' });
    this.updateFromSettings = this.afs
    .collection<User>('users')
    .valueChanges({updatesFromSets :'users'});

    this.authService.isAdmin().then((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
  ngOnInit(): void {
    this.UserReplies = false;
    
    this.authService.isLoggedIn().then((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.postagens.subscribe((posts) => {
      posts.forEach((post) => {
        this.postComments[post.postID] = this.afs
          .collection<coments>(`forumPosts/${post.postID}/comments`, (ref) =>
            ref.orderBy('date')
          )
          .valueChanges()
          .pipe(
            switchMap((comments: coments[]) => {
              const commentObservables = comments.map((comment) =>
                this.afs
                  .collection<ReplyComment>(`forumPosts/${post.postID}/comments/${comment.commentID}/replies`, (ref) =>
                  ref.orderBy('date'))
                  .valueChanges()
                  .pipe(
                    map((replies: ReplyComment[]) => ({
                      ...comment,
                      replies: replies || [] 
                    }))
                  )
              );
              return combineLatest(commentObservables);
            }),
            tap((commentsWithReplies: coments[]) => {
              // Do something duuuuud
            })
          );
      });
    });
    
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        const userUid = user.uid;
        this.authService.getUserData(userUid).subscribe((userData: any) => {
          this.userData = userData;
        });
      }
    });

    this.authService.authState$.subscribe(async (user) => {
      if (user) {
        const shouldShowAlert = await this.authService.shouldShowAlert(
          user.uid
        );
        if (shouldShowAlert) {
          this.showWelcomeAlert(user.uid);
        }
      }
      if (user) {
        this.afs
          .collection('users')
          .doc(user.uid)
          .valueChanges()
          .subscribe((userData: any) => {
            this.userData = {
              uid: user.uid,
              email: userData.email,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
            };
            console.log('to aquii', this.userData);
          });
      }
    });
  }

  showWelcomeAlert(userId: string): void {
    Swal.fire({
      title: 'Bem vindo ao forum',
      text: 'Aqui só o pai posta, vocês respondem oskey? Da uma lida ali no card e entende como que funciona.',
      input: 'radio',
      inputOptions: {
        donshow: 'Não mostrar novamente.',
      },
      inputValidator: async (result) => {
        if (result) {
          await this.authService.updateAlertPreference(userId, false);
        }
      },
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FabForumComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  showComment() {
    this.comentInput = !this.comentInput;
  }

  //Funçao pra enviar os comments
  lastCommentTime : number = 0;
  async onSubmit(postId: string, comment: string) {
    try {
      if (!this.userData) {
        throw new Error('Usuário não autenticado');
      }
  
      const now = Date.now();
      const timeDifference = now - this.lastCommentTime;
      const timeThreshold = 60000; 
  
      if (timeDifference < timeThreshold) {
        Swal.fire({
          title: 'Por favor, aguarde um pouco antes de comentar novamente.',
          icon: 'warning',
          timer: 3000, 
          timerProgressBar: true,
          showConfirmButton: false
        });
        return;
      }
      this.lastCommentTime = now;
      const commentId = this.afs.createId();
      const commentData: coments = {
        date: firebase.firestore.FieldValue.serverTimestamp(),
        commentID: commentId,
        displayName: this.userData.displayName,
        photoURL: this.userData.photoURL,
        comment: comment,
        uid: this.userData.uid,
        replyText: ''
      };

      await this.afs
        .collection(`forumPosts/${postId}/comments`)
        .doc(commentId)
        .set(commentData);
  
    } catch (error) {
      Swal.fire({
        title: 'Você deve estar logado para comentar no fórum.',
        icon: 'error',
        timer: 3000, // seconds
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: 'Fazer login',
        showCancelButton: true, 
        cancelButtonText: 'Cancelar', 
      }).then((result) => {
        if (result.isConfirmed) {
          this.goto();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
    }
  }
  goto(){
    this.router.navigate(['/login'])
  }
  //funcs do reply do forum
  showReplyInputMap: { [commentId: string]: boolean } = {};

  toggleReplyInput(event: MouseEvent, commentId: string): void {
    event.preventDefault();
    this.showReplyInputMap[commentId] = !this.showReplyInputMap[commentId];
    setTimeout(() => {
      const element = document.getElementById(`replyInput-${commentId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 10);
  }

  async reply(
    postId: string,
    commentId: string,
    replyText: string,
    comment: coments
  ) {
    const now = Date.now();
    const timeDifference = now - this.lastCommentTime;
    const timeThreshold = 60000; 
    if (timeDifference < timeThreshold) {
      Swal.fire({
        title: 'Por favor, aguarde um pouco antes de comentar novamente.',
        icon: 'warning',
        timer: 3000, 
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }
    this.lastCommentTime = now;


    if (comment) {
      const replyId = this.afs.createId();
      const replyData: ReplyComment = {
        date: firebase.firestore.FieldValue.serverTimestamp(),
        replyID: replyId,
        displayName: this.userData.displayName,
        photoURL: this.userData.photoURL,
        reply: replyText,
        uid: this.userData.uid,
      };
      
      await this.afs
        .collection(`forumPosts/${postId}/comments/${commentId}/replies`)
        .doc(replyId)
        .set(replyData)
        .then(() => {
        })
        .catch((error) => {
          Swal.fire({
            title: 'Como que tu quer responder se ñ ta logado?',
            icon: 'error',
            timer: 3000,
          })
        });
    } else {
    }
    this.replyText = '';
    this.UserReplies = !this.UserReplies
  }



  isCurrentUserCommentOwner(cmnt: any): boolean {
    if (this.userData && this.userData.uid && cmnt.uid === this.userData.uid) {
      return true;
    } else {
      return false; 
    }
  }
  

  async removeComment(postId: string, commentId: string) {
    try {
      if (this.userData) {
        const commentRef = doc(this.afs.firestore, `forumPosts/${postId}/comments`, commentId);
        await deleteDoc(commentRef);
        console.log('Comment removed successfully');
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error removing comment:', error);
    }
  }
  isCurrentUserOwnerReplie(reply: any): boolean {
    if (this.userData && this.userData.uid && reply.uid === this.userData.uid) {
      return true;
    } else {
      return false; 
    }
  }


  async removeReplie(postId: string, commentId: string , replyID: string){
    try{
      if(this.userData){
        const replieRef = doc(this.afs.firestore, `forumPosts/${postId}/comments/${commentId}/replies`, replyID);
        await deleteDoc(replieRef);
        console.log('replies removido bb');
      } else{
        console.log('user nao autenticado');
      }
    } catch(error){
      console.log('deu ruim', error);
      
    }
  }
  toggleUsersReplies(){
    this.UserReplies = !this.UserReplies
  }
}