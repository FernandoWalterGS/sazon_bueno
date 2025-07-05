import { Component, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { FavoritesService } from '../../services/favorites/favorites.service';

@Component({
  selector: 'app-favorite-recipes',
  standalone: true,
  templateUrl: './favorite-recipes.component.html',
  styleUrl: './favorite-recipes.component.scss',
  imports: [RecipeCardComponent],
})
export class FavoriteRecipesComponent implements OnInit {
  favoriteList: any = [];

  constructor(private favoriteService: FavoritesService) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.favoriteService.getFavoriteRecipes().subscribe((data) => {
      this.favoriteList = data;
    });
  }

  recibirId(data: any) {
    const { favorite } = data;

    this.favoriteService.deleteFavorite(favorite).subscribe((data) => {
      this.cargarFavoritos();

      return data;
    });
  }
}
