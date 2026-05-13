import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { startWith } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });

  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(startWith(this.searchControl.value), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => this.applySearch(term));

    this.loadRecipes();
  }

  openRecipe(recipe: Recipe): void {
    this.router.navigate(['/receitas', recipe.id]);
  }

  formatCategory(category: string): string {
    return category.charAt(0) + category.slice(1).toLowerCase();
  }

  private loadRecipes(): void {
    this.loading = true;
    this.errorMessage = '';

    this.recipeService.listar()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (recipes) => {
          this.recipes = this.sortByNewest(recipes);
          this.applySearch(this.searchControl.value);
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Não foi possível carregar as receitas.';
          this.loading = false;
        }
      });
  }

  private applySearch(term: string): void {
    const normalizedTerm = term.trim().toLowerCase();

    if (!normalizedTerm) {
      this.filteredRecipes = [...this.recipes];
      return;
    }

    this.filteredRecipes = this.recipes.filter((recipe) => {
      const name = recipe.nome.toLowerCase();
      const category = recipe.categoria.toLowerCase();
      return name.includes(normalizedTerm) || category.includes(normalizedTerm);
    });
  }

  private sortByNewest(recipes: Recipe[]): Recipe[] {
    return [...recipes].sort((a, b) => {
      const dateA = a.dataCadastro ? new Date(a.dataCadastro).getTime() : 0;
      const dateB = b.dataCadastro ? new Date(b.dataCadastro).getTime() : 0;
      return dateB - dateA;
    });
  }
}
