import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularFirestore } from '@angular/fire/compat/firestore';

//guri

@Component({
  selector: 'app-fab-forum',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './fab-forum.component.html',
  styleUrl: './fab-forum.component.css'
})
export class FabForumComponent {

  title: string = '';
  content: string = '';

  
  constructor(
    public dialogRef: MatDialogRef<FabForumComponent>,
    private firestore: AngularFirestore,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  async uploadTopic() {
    try {
      await this.firestore.collection('forumPosts').add({
        title: this.title,
        content: this.content,
        
      });
      console.log('foite carai');
      this.title = '';
      this.content = '';
    } catch (error) {
      console.error('foi nada:', error);
    }
  }
}
