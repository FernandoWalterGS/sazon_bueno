import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import {
  addRecipe,
  removeRecipe,
  resetRecipes,
} from '../../state/recipeList.actions';
import { selectRecipesList } from '../../state/reducerList.selectors';

@Component({
  selector: 'app-pruebas-de-estado',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './pruebas-de-estado.component.html',
  styleUrl: './pruebas-de-estado.component.scss',
})
export class PruebasDeEstadoComponent {
  list = [
    {
      id: 5,
      name: 'nombre de la receta',
      description: 'descripción de la receta',
    },
  ];
  selectRecipesList$: Observable<any>;

  titles: string[] = Object.keys(this.list[0]);

  constructor(private store: Store<AppState>) {
    this.selectRecipesList$ = this.store.select(selectRecipesList);
  }

  addRecipe() {
    let recipe = {
      name: 'pastas con algo',
      description: 'descripcion 2',
      id: this.list.length + 1,
    };
    this.list.push(recipe);
    this.store.dispatch(addRecipe({ recipe }));
  }

  removerecipe(recipeId: number) {
    this.list = this.list.filter((recipe) => recipe.id !== recipeId);
    this.store.dispatch(removeRecipe({ recipeId }));
  }

  resetRecipe() {
    this.list = [];
    this.store.dispatch(resetRecipes());
  }
}
