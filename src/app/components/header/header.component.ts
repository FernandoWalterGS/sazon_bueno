import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProfileComponent } from '../profile/profile.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    CommonModule,
    ProfileComponent,
    NgIf,
    CarouselComponent,
    RecipeCardComponent,
    NgFor,
    RouterLink,
    RouterLinkActive,
  ],
})
export class HeaderComponent {
  claseActual = 'hidden';
  openMenu = false;
  registered = localStorage.getItem('token') ? true : false;
  name: string = localStorage.getItem('username') ?? '';

  constructor(private authService: AuthService) {}

  recipes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  logout() {
    this.authService.logout();
  }

  menuControl() {
    this.openMenu = !this.openMenu;

    if (this.openMenu) {
      this.claseActual = 'visible';
    } else {
      this.claseActual = 'hidden';
    }
  }
}
