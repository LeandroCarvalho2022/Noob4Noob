import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { Cards } from '../../../models/cards';

@Component({
    selector: 'app-studyhomepage',
    standalone: true,
    templateUrl: './studyhomepage.component.html',
    styleUrl: './studyhomepage.component.css',
    imports: [NavbarComponent, CommonModule, RouterLink, RouterLinkActive]
})
export class StudyhomepageComponent implements OnInit {
  tutos: Cards[] = [];
  binding = [
    {
      title: 'Data Binding s2',
      date: 'Em: 20/02/2024',
      img: '/assets/images/tutoscards/binding.png',
      url: '/cardprev'
    },
    {
      title: 'Color Picker e mais.',
      date: 'Em: 09/03/2024',
      img: '/assets/images/tutoscards/colorpikcer.jpg',
      url: '/picker'
    },
    {
      title: 'Conectando formulário com banco de dados.',
      date: 'Em: 24/04/2024',
      img : 'assets/images/tutoscards/fireForm/form.png',
      url: '/fireForm'
    },
  ];

  constructor(){};

  ngOnInit(){
    console.log('tutos data: ',this.tutos)
  };
}
