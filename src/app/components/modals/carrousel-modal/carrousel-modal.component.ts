import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { collection } from 'firebase/firestore';
import {
  SlickCarouselComponent,
  SlickCarouselModule,
} from 'ngx-slick-carousel';
import { Observable, map, of } from 'rxjs';
import { Posts } from '../../../models/posts';

@Component({
  selector: 'app-carrousel-modal',
  standalone: true,
  imports: [
    SlickCarouselModule, 
    CommonModule, 
    MatDialogModule,
    MatIcon
  ],
  templateUrl: './carrousel-modal.component.html',
  styleUrl: './carrousel-modal.component.css',
})
export class CarrouselModalComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  firestore: Firestore = inject(Firestore);
  carouselImgs$: Observable<string[]>;

  ngOnInit(): void {
    this.carouselImgs$ = of(this.data.carouselImgs)
    console.log('imgs carousel ',this.carouselImgs$);
    
  }

  
  slides = [
    { img: 'assets/images/1.png' },
    { img: 'assets/images/bg.jpg' },
    { img: 'assets/images/logo.jpg' },
  ];



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { postId: string, carouselImgs : string[] }

  ) {
    const itemCollection = collection(this.firestore, 'posts');
    this.carouselImgs$ = collectionData(itemCollection).pipe(
      map((data: any[]) => {
        return data.reduce((acc, post) => {
          return acc.concat(post.carouselImgs);
        }, []);
      })
    );
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }
}
