import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CurrentRecipe {
  id: number;
  name: string;
  description: string;
  image: string;
  time_min: number;
  ingredients: string;
  preparation: string;
  difficulty: string;
  category: string;
  createdAt: string;
  user: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  image: any;
  time_min: number;
  ingredients: string;
  preparation: string;
  account: Account;
  difficulty: Difficulty;
  category: Category;
  createdAt: string;
}

export interface Account {
  id: number;
  name: string;
  username: string;
  date_of_birth: string;
  password: string;
  createdAt: string;
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: any[];
}

export interface Difficulty {
  id: number;
  level: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class PublicRecipeService {
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getRecipes(query: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/recipes${query}`);
  }

  getById(id: number): Observable<CurrentRecipe> {
    return this.http.get<CurrentRecipe>(`${this.apiUrl}/public/recipes/${id}`);
  }
}
