import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite'; 
import { FirestoreDatePipe } from './pipe/pipe-date.pipe';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'NoobForNoob';
  ngOnInit(): void {
    initFlowbite();
  }

}
