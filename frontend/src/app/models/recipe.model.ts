export type Categoria = 'DOCE' | 'SALGADO' | 'BEBIDA' | 'SOBREMESA';

export interface Recipe {
  id: number;
  nome: string;
  categoria: Categoria;
  tempoPreparo: number;
  porcoes: number;
  ingredientes: string[];
  modoPreparo: string;
  dataCadastro: string;
}

export type RecipeRequest = Omit<Recipe, 'id' | 'dataCadastro'>;

export const CATEGORIAS: Categoria[] = [
  'DOCE',
  'SALGADO',
  'BEBIDA',
  'SOBREMESA'
];
