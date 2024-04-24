import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { getDownloadURL, ref } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage: Storage) { }

  getImageUrls(): Observable<string[]> {
    const storageRef = ref(this.storage, 'gs://maway-950d1.appspot.com');
    return from(getDownloadURL(storageRef).then((url) => [url]));
    
  }
}
