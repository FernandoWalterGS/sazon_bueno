import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import Swal from 'sweetalert2';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [NgIcon, DatePipe, RecipeCardComponent],
  providers: [provideIcons({ heroPencilSquare, heroTrash })],

  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss',
})
export class MyRecipesComponent implements OnInit {
  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.uploadRecipes();
  }

  myRecipes: any = null;
  idAccount: number = Number(localStorage.getItem('id'));

  uploadRecipes() {
    this.recipeService.getAllByAccountId(this.idAccount).subscribe((data) => {
      this.myRecipes = data;
    });
  }
  editRecipe(id: number) {
    this.router.navigate([`/myrecipe/edit/${id}`]);
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id).subscribe((response) => {
      if (response) {
        Swal.fire({
          title: '¿Está seguro de que desea eliminar esta receta?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, estoy seguro!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.uploadRecipes();
            Swal.fire({
              title: 'Receta eliminada!',
              text: 'Tu receta ha sido eliminada.',
              icon: 'success',
            });
          }
        });
      }
    });
  }
}
