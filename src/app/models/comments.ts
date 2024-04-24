import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 

import { ReplyComment } from './replies';


export interface coments {
  date: firebase.firestore.FieldValue;
  commentID: string;
  displayName: string;
  photoURL: string;
  comment: string;
  uid: string;
  replyText: string;
  replies?: ReplyComment[];
}
