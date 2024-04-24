import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Posts } from '../../../models/posts';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Storage } from '@angular/fire/storage';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CarrouselModalComponent } from '../../modals/carrousel-modal/carrousel-modal.component';


@Component({
  selector: 'app-postcomp',
  standalone: true,
  templateUrl: './postcomp.component.html',
  styleUrl: './postcomp.component.css',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    NavbarComponent,
    MatIcon,
    MatDialogModule
  ],
})
export class PostcompComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  posts$: Observable<Posts[]>;
  showcard: boolean = false;
  bgCard = 'background-color: #7b8794;'
  bgCards= 'background-color: #323f4b;'

  ngOnInit(): void {}
  

  constructor(
    private storage: Storage,
    public dialog : MatDialog
  ) {
    const itemCollection = collection(this.firestore, 'posts');
    this.posts$ = collectionData(itemCollection, { idField: 'id' }).pipe(
      map((data: any[]) => {
        return data.map((doc: any) => ({
          id: doc.id, // Add the id field
          content: doc.content,
          image: doc.image,
          github: doc.github,
          title: doc.title,
          carouselImgs: doc.carouselImgs || []
        }));
      })
    );
  }

  toggle() {
    this.showcard = !this.showcard;
    console.log(collectionData);
    
  }
  openDialog(postId : string, carouselImgs : string[]){
    const dialogRef = this.dialog.open(CarrouselModalComponent,
    {
      height: '660px',
      width: '600px',
      data: {postId: postId, carouselImgs: carouselImgs},
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


