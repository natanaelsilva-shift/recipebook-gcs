import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);
  private readonly destroyRef = inject(DestroyRef);

  recipe: Recipe | null = null;
  loading = true;
  deleting = false;
  errorMessage = '';
  toastMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.errorMessage = 'Receita não encontrada.';
      this.loading = false;
      return;
    }

    this.recipeService.buscarPorId(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (recipe) => {
          this.recipe = recipe;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Receita não encontrada.';
          this.loading = false;
        }
      });
  }

  deleteRecipe(): void {
    if (!this.recipe || !window.confirm('Deseja excluir esta receita?')) {
      return;
    }

    this.deleting = true;
    this.recipeService.excluir(this.recipe.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastMessage = 'Receita excluída com sucesso';
          setTimeout(() => this.router.navigate(['/receitas']), 900);
        },
        error: () => {
          this.errorMessage = 'Não foi possível excluir a receita.';
          this.deleting = false;
        }
      });
  }

  formatCategory(category: string): string {
    return category.charAt(0) + category.slice(1).toLowerCase();
  }
}
