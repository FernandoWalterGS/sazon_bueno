import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-recipes-admin',
  standalone: true,
  imports: [NgIcon, DatePipe],
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
  templateUrl: './recipes-admin.component.html',
  styleUrl: './recipes-admin.component.scss',
})
export class RecipesAdminComponent implements OnInit {
  recipes: any = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.uploadRecipes();
  }

  uploadRecipes() {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
    });
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id).subscribe((data) => {
      if (data) {
        this.uploadRecipes();
      }
    });
  }
}
