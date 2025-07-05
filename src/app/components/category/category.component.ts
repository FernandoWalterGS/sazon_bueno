import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-category',
  standalone: true,
  providers: [
    provideIcons({
      heroChevronDown,
    }),
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  imports: [NgIcon, RecipeCardComponent],
})
export class CategoryComponent {
  acordion: boolean = false;
  classArrowAcordion: string = '';
  recipeCategory = [1, 2, 3, 4, 5, 6];

  changeAcordion() {
    this.acordion = !this.acordion;
    if (this.acordion) {
      this.classArrowAcordion = 'rotate-180';
    } else {
      this.classArrowAcordion = '';
    }
  }
}
