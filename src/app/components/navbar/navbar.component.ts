import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule,RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userData: any;
  isAdmin: any;
  isLoggedIn: boolean = false;
    

  constructor(public authService : AuthService){
  }

  ngOnInit(): void {
    this.authService.authState$.subscribe(async user => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.isAdmin = await this.authService.isAdmin();
      } else {
        this.isAdmin = false; // If not logged in, isAdmin should be false
      }

      if (user) {
        const userUid = user.uid;
        this.authService.getUserData(userUid).subscribe((userData: any) => {
          this.userData = userData;
          console.log('userdatanavbar', this.userData);
        });
      }
    });
  
    console.log('userdatanavbar', this.userData );
    
  }


  


}


