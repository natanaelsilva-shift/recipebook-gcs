# RecipeBook Frontend

Aplicacao Angular standalone para cadastro, listagem, busca, visualizacao, edicao e exclusao de receitas culinarias.

## NATANAEL SILVA DA CRUZ

## Tecnologias

- Angular 17+
- Standalone Components
- TypeScript
- Reactive Forms
- HTML
- CSS responsivo

## Como rodar

```bash
npm install
ng serve
```

A aplicacao ficara disponivel em `http://localhost:4200`.

## Rotas

- `/receitas`
- `/receitas/nova`
- `/receitas/:id`
- `/receitas/:id/editar`

A rota vazia redireciona para `/receitas`.

## Funcionalidades

- Cards responsivos de receitas
- Busca em tempo real case-insensitive
- Cadastro com validacoes e ingredientes separados por quebra de linha
- Edicao usando o mesmo formulario do cadastro
- Toast de sucesso ao cadastrar, atualizar e excluir
- Detalhes com ingredientes em lista e modo de preparo preservando quebras de linha
- Confirmacao antes de excluir
