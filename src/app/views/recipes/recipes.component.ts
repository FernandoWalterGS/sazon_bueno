import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ComentarioComponent } from '../../components/comentario/comentario.component';

import { CarouselComponent } from '../../components/carousel/carousel.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { SearchComponent } from '../../components/search/search.component';
import { SliderItem } from '../../interfaces/app';
import { CategoryService } from '../../services/category/category.service';
import { DificultyService } from '../../services/dificulty/dificulty.service';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { Recipe, RecipeService } from '../../services/recipe/recipe.service';

export interface RecipeType {
  favorite?: number;
  recipe?: number;
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  imports: [
    RecipeCardComponent,
    ComentarioComponent,
    NgIf,
    CarouselComponent,
    SearchComponent,
  ],
})
export class RecipesComponent implements OnInit {
  recipesService = inject(RecipeService);
  categoryService = inject(CategoryService);
  dificultyService = inject(DificultyService);
  recipes: Recipe[] = [];
  filterData: any[] = [];

  receivedData: any;

  constructor(private favoritesService: FavoritesService) {}

  slides: SliderItem[] = [
    {
      src: 'https://media.istockphoto.com/id/1735292168/es/foto/huevos-escoceses-tradicionales-en-un-plato-negro.jpg?s=612x612&w=0&k=20&c=MjlLQHJED90ReZswZS0bmB8fARj2La3xmuG7tHuiq6Y=',
      title: 'Pasteles',
      subtitle: 'Deliciosas recetas de pasteles para cada ocasión.',
      label_slide: 'slide 1',
    },
    {
      src: 'https://cdn.pixabay.com/photo/2018/05/01/18/21/eclair-3366430_640.jpg',
      title: 'Postres',
      subtitle: 'Endulza tu día con estas increíbles creaciones.',
      label_slide: 'slide 2',
    },

    {
      src: 'https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_640.jpg',
      title: 'Carnes',
      subtitle: 'Platos de carne que te harán agua la boca.',
      label_slide: 'slide 3',
    },
    {
      src: 'https://sazondelbueno.s3.amazonaws.com/dc9ec3b5-20b9-4aff-816e-794fa483a54e.jpeg',
      title: 'Recetas Variadas',
      subtitle: 'Explora un mundo de sabores y nuevas ideas.',
      label_slide: 'aws',
    },
  ];

  ngOnInit(): void {
    this.getRecipes();
  }

  addFavorite({ recipe }: RecipeType) {
    const favorite = {
      account: {
        id: localStorage.getItem('id'),
      },
      recipe: {
        id: recipe,
      },
    };
    this.favoritesService.addFavorite(favorite).subscribe((data) => {
      this.recipes = this.recipes.filter((r) => r.id != recipe);
      return data;
    });
  }

  getRecipes() {
    this.recipesService.getRecipes().subscribe((data) => {
      this.recipes = data;
    });
  }

  receiveData(data: any) {
    this.receivedData = data;

    if (data == 'category') {
      this.categoryService.getCategories().subscribe((data) => {
        this.filterData = data;
      });
    }
    if (data == 'difficulty') {
      this.dificultyService.getDificulties().subscribe((data) => {
        this.filterData = data;
      });
    }
  }

  receiveDataSelected(event: any) {
    this.recipesService
      .getRecipes(`?${this.receivedData}=${event}`)
      .subscribe((data) => {
        this.recipes = data;
      });
  }

  receiveSearchdata(event: any) {
    this.recipesService.getRecipes(`?search=${event}`).subscribe((data) => {
      this.recipes = data;
    });
  }
}
