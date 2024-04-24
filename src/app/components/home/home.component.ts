import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { generate } from 'rxjs';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterLinkActive, RouterLink, RouterOutlet, NavbarComponent]
})
export class HomeComponent {
  

  

}
