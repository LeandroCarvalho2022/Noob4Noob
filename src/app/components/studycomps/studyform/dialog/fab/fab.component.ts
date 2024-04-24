import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose, MatDialogModule } from '@angular/material/dialog'; 
import { format } from 'date-fns';
import { DataserviceService } from '../../../../../services/dataservice.service';



@Component({
  selector: 'app-fab',
  standalone: true,
  imports: [MatDialogClose, MatDialogModule, CommonModule],
  templateUrl: './fab.component.html',
  styleUrl: './fab.component.css'
})
export class FabComponent {
  dataTime : string;

  constructor(
    public dialogRef: MatDialogRef<FabComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService : DataserviceService
  ) {this.dataTime = format(new Date(), 'dd/MM/yyyy');}

  onNoClick(): void {
    this.dialogRef.close();
    console.log()
  }

  onAdd(): void {
    const newData = {
      title: this.data.inputText,
      date: this.dataTime,
      img: this.data.imageUrls[0]
    };

    this.dialogRef.close();
  }



}
