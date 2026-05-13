import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'receitas',
    pathMatch: 'full'
  },
  {
    path: 'receitas',
    component: RecipeListComponent
  },
  {
    path: 'receitas/nova',
    component: RecipeFormComponent
  },
  {
    path: 'receitas/:id/editar',
    component: RecipeFormComponent
  },
  {
    path: 'receitas/:id',
    component: RecipeDetailComponent
  },
  {
    path: '**',
    redirectTo: 'receitas'
  }
];
