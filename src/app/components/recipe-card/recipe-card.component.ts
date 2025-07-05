import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChatBubbleBottomCenter,
  heroClock,
  heroStar,
} from '@ng-icons/heroicons/outline';

import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { faSolidStar } from '@ng-icons/font-awesome/solid';
import { RecipeType } from '../../views/recipes/recipes.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [NgIcon, NgClass, DatePipe],
  providers: [
    provideIcons({
      heroClock,
      heroChatBubbleBottomCenter,
      heroStar,
      faSolidStar,
    }),
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent implements OnInit {
  @Input() data: any;
  @Input() isFavorite?: boolean = false;
  @Output() onClick = new EventEmitter<RecipeType>();

  registered = localStorage.getItem('token') ? true : false;

  classStarFavorit: string = 'text-gray-300';

  constructor(private router: Router) {}

  sendId() {
    this.onClick.emit({ favorite: this.data.idFavorite, recipe: this.data.id });
  }

  redirectToDetail() {
    this.router.navigate([`detail/${this.data.id}`]);
  }
  redirectToRegister() {
    this.router.navigate([`auth/register`]);
  }

  ngOnInit(): void {
    if (this.isFavorite) {
      this.classStarFavorit = 'text-amarillo-favoritos';
    }
  }
}
