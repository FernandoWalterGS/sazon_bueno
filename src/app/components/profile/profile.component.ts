import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroAdjustmentsHorizontal,
  heroArrowRightStartOnRectangle,
  heroArrowUpOnSquare,
  heroBellAlert,
  heroDocumentDuplicate,
  heroHeart,
  heroUser,
  heroUsers,
} from '@ng-icons/heroicons/outline';

interface ItemsProfile {
  name: string;
  icon: string;
  path?: string;
  fn?: () => void;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgIcon, AsyncPipe, RouterLink, TitleCasePipe],
  providers: [
    provideIcons({
      heroUsers,
      heroArrowRightStartOnRectangle,
      heroAdjustmentsHorizontal,
      heroArrowUpOnSquare,
      heroBellAlert,
      heroHeart,
      heroDocumentDuplicate,
      heroUser,
    }),
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  acordeon: boolean = false;
  userId: any = localStorage.getItem('id');

  constructor(private router: Router) {}

  itemsBodyProfile: ItemsProfile[] = [
    { name: 'mis recetas', icon: 'heroDocumentDuplicate', path: '/myrecipes' },
    { name: 'favoritos', icon: 'heroHeart', path: '/favorites' },
    { name: 'subir receta', icon: 'heroArrowUpOnSquare', path: '/newRecipe' },
  ];

  itemFooterProfile: ItemsProfile[] = [
    {
      name: 'editar perfil',
      icon: 'heroAdjustmentsHorizontal',
      path: `/edit_profile/${this.userId}`,
    },
    {
      name: 'cerrar sesión',
      icon: 'heroArrowRightStartOnRectangle',
      path: '/',
    },
  ];

  handleAccordion() {
    this.acordeon = !this.acordeon;
  }

  closeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    this.router.navigate(['auth/login']);
  }
}
