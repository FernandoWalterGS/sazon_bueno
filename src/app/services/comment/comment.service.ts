import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private headersApi: HttpHeaders;
  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.headersApi = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  getAllCommentRecipe(id: number) {
    return this.http.get(`${this.apiUrl}/comment/recipe/${id}`, {
      headers: this.headersApi,
    });
  }

  commentRegister(comment: string, idRecipe: number, idAccount: number) {
    const commentObject = {
      comment: comment,
      account: {
        id: idAccount,
      },
      recipe: {
        id: idRecipe,
      },
    };

    return this.http.post(`${this.apiUrl}/comment`, commentObject, {
      headers: this.headersApi,
    });
  }
}
