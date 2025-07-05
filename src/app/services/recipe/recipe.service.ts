import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class RecipeService {
  private apiUrl: string = environment.API_URL;
  private headersApi: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headersApi = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  getRecipes(query: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipe${query}`, {
      headers: this.headersApi,
    });
  }

  getById(id: number): Observable<CurrentRecipe> {
    return this.http.get<CurrentRecipe>(`${this.apiUrl}/recipe/${id}`, {
      headers: this.headersApi,
    });
  }

  getAllByAccountId(id: number) {
    return this.http.get(`${this.apiUrl}/recipe/account/${id}`, {
      headers: this.headersApi,
    });
  }

  saveRecipe(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipe`, payload, {
      headers: this.headersApi,
    });
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/recipe/${id}`, {
      headers: this.headersApi,
    });
  }

  updateRecipe(idRecipe: string, updatedRecipe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/recipe/${idRecipe}`, updatedRecipe, {
      headers: this.headersApi,
    });
  }
}
