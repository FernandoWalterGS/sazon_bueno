import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  imports: [HeaderComponent, CarouselComponent, RecipeCardComponent],
})
export class InicioComponent {
  recipes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}
