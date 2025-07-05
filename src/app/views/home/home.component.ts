import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    RouterOutlet,
    RecipeCardComponent,
    CarouselComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class HomeComponent {
  recipes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}
