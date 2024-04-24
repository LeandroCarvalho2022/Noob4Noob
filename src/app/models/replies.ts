import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 


export interface ReplyComment {
    date: firebase.firestore.FieldValue;
    replyID: string;
    displayName: string;
    photoURL: string;
    reply: string;
    uid: string;
  }
  