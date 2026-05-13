import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, RecipeRequest } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/receitas';

  listar(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  criar(recipe: RecipeRequest): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  atualizar(id: number, recipe: RecipeRequest): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
