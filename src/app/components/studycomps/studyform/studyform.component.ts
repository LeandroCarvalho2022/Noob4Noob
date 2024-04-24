import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Posts } from '../../../models/posts';
import { inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AlertsService } from '../../../services/alerts.service';

import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { NavbarComponent } from "../../navbar/navbar.component";
import { NgxDropzoneModule } from 'ngx-dropzone';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
    selector: 'app-studyform',
    standalone: true,
    templateUrl: './studyform.component.html',
    styleUrl: './studyform.component.css',
    imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, NavbarComponent, NgxDropzoneModule]
})
export class StudyformComponent {

  firestore: Firestore = inject(Firestore);
  downloadURLs$!: string;
  imgs: string[] =[];
  content: string = '';
  title: string = '';
  github: string = '';
  files: File[] = [];
  carouselImgs: File[] = [];

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(file: File) {
    this.files = this.files.filter(f => f !== file);
  }
  constructor(private storage: Storage,
    private angFs : AngularFirestore,
    private router: Router,) {
  }

  async uploadPost() {
    if (this.files.length === 0) return;

    // Upload images from files array
    const imageURLs: string[] = [];
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const storageRef = ref(this.storage, file.name);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imageURLs.push(downloadURL);
    }

    // Upload carousel images
    const carouselImageURLs: string[] = [];
    for (let i = 0; i < this.carouselImgs.length; i++) {
      const file = this.carouselImgs[i];
      const storageRef = ref(this.storage, file.name);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      carouselImageURLs.push(downloadURL);
    }

    // Create post objects
    const postData: Posts[] = [];
    const minImagesCount = Math.min(this.files.length, this.content.length);
    for (let i = 0; i < minImagesCount; i++) {
      const postId = this.angFs.createId();
      const post: Posts = {
        id: postId ,
        title: this.title,
        content: this.content,
        image: imageURLs[i],
        carouselImgs: carouselImageURLs, // Add carousel images here
        github: this.github,
      };
      postData.push(post);
    }

    // Add posts to Firestore
    const postCollection = collection(this.firestore, 'posts');
    postData.forEach(post => {
      addDoc(postCollection, post)
        .then(() => {
          Swal.fire('Boacarai');
        })
        .catch((error) => {
          console.error('Error adding post: ', error);
        });
    });
  }
  onCarouselSelect(event: any) {
    this.carouselImgs = event.target.files;
  }

  cancel(){
    this.content = '';
    this.files = [];
    this.github = '';
    this.title = '';
  }

}

