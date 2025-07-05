import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { ClientComponent } from './layouts/client/client.component';

import { CategoryComponent } from './components/category/category.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RecipeRegisterComponent } from './components/recipe-register/recipe-register.component';

import { AdminComponent } from './layouts/admin/admin.component';
import { AccountComponent } from './views/account/account.component';
import { CategoryAdminComponent } from './views/category-admin/category-admin.component';
import { DetailsComponent } from './views/details/details.component';
import { DifficultyAdminComponent } from './views/difficulty-admin/difficulty-admin.component';
import { FavoriteRecipesComponent } from './views/favorite-recipes/favorite-recipes.component';
import { MyRecipesComponent } from './views/my-recipes/my-recipes.component';
import { PublicRecipesComponent } from './views/public-recipes/public-recipes.component';
import { RecipesAdminComponent } from './views/recipes-admin/recipes-admin.component';
import { RecipesComponent } from './views/recipes/recipes.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  //public
  {
    path: '',
    component: ClientComponent,
    title: 'sazondelbueno',
    children: [
      { path: '', component: PublicRecipesComponent },
      { path: 'recipes', component: RecipesComponent },
      { path: 'myrecipes', component: MyRecipesComponent },
      { path: 'favorites', component: FavoriteRecipesComponent },
      { path: 'newRecipe', component: RecipeRegisterComponent },
      { path: 'detail/:id', component: DetailsComponent },
      { path: 'myrecipe/edit/:id', component: RecipeRegisterComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'edit_profile/:id', component: EditProfileComponent },
    ],
  },
  // auth views
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'accounts', component: AccountComponent },
      { path: 'recipes', component: RecipesAdminComponent },
      { path: 'category', component: CategoryAdminComponent },
      { path: 'difficulty', component: DifficultyAdminComponent },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
