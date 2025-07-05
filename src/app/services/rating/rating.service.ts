import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private headersApi: HttpHeaders;
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.headersApi = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  ratingRegister(rating: number, accoutId: number, recipeId: number) {
    return this.http.post(
      `${this.apiUrl}/rating`,
      { rating, account: { id: accoutId }, recipe: { id: recipeId } },
      {
        headers: this.headersApi,
      }
    );
  }

  getAllRating() {
    return this.http.get(`${this.apiUrl}/rating`, {
      headers: this.headersApi,
    });
  }

  getByAccountAndRecipe(accountId: number, recipeId: number) {
    return this.http.get(
      `${this.apiUrl}/rating/account/${accountId}/recipe/${recipeId}`,
      {
        headers: this.headersApi,
      }
    );
  }

  getAvgByRecipe(recipeId: number) {
    return this.http.get(`${this.apiUrl}/recipe/${recipeId}`, {
      headers: this.headersApi,
    });
  }
}
