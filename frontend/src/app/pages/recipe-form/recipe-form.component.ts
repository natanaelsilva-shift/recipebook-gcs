import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CATEGORIAS, Categoria, RecipeRequest } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

type RecipeFormField = 'nome' | 'categoria' | 'tempoPreparo' | 'porcoes' | 'ingredientes' | 'modoPreparo';

function parseIngredients(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
}

function ingredientsValidator(control: AbstractControl): ValidationErrors | null {
  const value = typeof control.value === 'string' ? control.value : '';
  return parseIngredients(value).length > 0 ? null : { requiredIngredients: true };
}

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = CATEGORIAS;
  readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['', [Validators.required]],
    tempoPreparo: [1, [Validators.required, Validators.min(1)]],
    porcoes: [1, [Validators.required, Validators.min(1)]],
    ingredientes: ['', [Validators.required, ingredientsValidator]],
    modoPreparo: ['', [Validators.required, Validators.minLength(10)]]
  });

  isEditMode = false;
  recipeId: number | null = null;
  loading = false;
  saving = false;
  toastMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
      this.errorMessage = 'Receita nao encontrada.';
      return;
    }

    this.isEditMode = true;
    this.recipeId = id;
    this.loadRecipe(id);
  }

  get pageTitle(): string {
    return this.isEditMode ? 'Editar receita' : 'Cadastrar receita';
  }

  get pageEyebrow(): string {
    return this.isEditMode ? 'Edicao' : 'Nova receita';
  }

  get cancelLink(): (string | number)[] {
    return this.isEditMode && this.recipeId ? ['/receitas', this.recipeId] : ['/receitas'];
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();

    this.saving = true;
    this.errorMessage = '';

    const request = this.isEditMode && this.recipeId
      ? this.recipeService.atualizar(this.recipeId, payload)
      : this.recipeService.criar(payload);

    request
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (recipe) => {
          this.toastMessage = this.isEditMode ? 'Receita atualizada com sucesso' : 'Receita cadastrada com sucesso';
          const destination = this.isEditMode ? ['/receitas', recipe.id] : ['/receitas'];
          setTimeout(() => this.router.navigate(destination), 900);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error?.message ?? 'Nao foi possivel salvar a receita.';
          this.saving = false;
        }
      });
  }

  isInvalid(field: RecipeFormField): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  errorFor(field: RecipeFormField): string {
    const control = this.form.controls[field];

    if (control.hasError('required')) {
      return 'Campo obrigatorio.';
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Informe no minimo ${requiredLength} caracteres.`;
    }

    if (control.hasError('min')) {
      return 'Informe um valor maior ou igual a 1.';
    }

    if (control.hasError('requiredIngredients')) {
      return 'Informe pelo menos 1 ingrediente.';
    }

    return 'Valor invalido.';
  }

  private loadRecipe(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.recipeService.buscarPorId(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (recipe) => {
          this.form.patchValue({
            nome: recipe.nome,
            categoria: recipe.categoria,
            tempoPreparo: recipe.tempoPreparo,
            porcoes: recipe.porcoes,
            ingredientes: recipe.ingredientes.join('\n'),
            modoPreparo: recipe.modoPreparo
          });
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Receita nao encontrada.';
          this.loading = false;
        }
      });
  }

  private buildPayload(): RecipeRequest {
    const value = this.form.getRawValue();

    return {
      nome: value.nome.trim(),
      categoria: value.categoria as Categoria,
      tempoPreparo: value.tempoPreparo,
      porcoes: value.porcoes,
      ingredientes: parseIngredients(value.ingredientes),
      modoPreparo: value.modoPreparo.trim()
    };
  }
}
