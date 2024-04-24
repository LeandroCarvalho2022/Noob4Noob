import { Pipe, PipeTransform } from '@angular/core';

import firebase from 'firebase/compat/app';

@Pipe({
  name: 'firestoreDate',
  standalone: true,
})
export class FirestoreDatePipe implements PipeTransform {
  transform(fieldValue: any): Date | null {
    if (fieldValue instanceof firebase.firestore.FieldValue) {
      return null; // or return some default date if needed
    }
    return fieldValue.toDate();
  }
}
