# RecipeBook

Sistema web fullstack para gestao de receitas culinarias.

## Dupla

- Natanael Silva da Cruz
- Nome Completo 2

## Estrutura

```text
RecipeBook/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── README.md
└── frontend/
    ├── src/
    ├── package.json
    └── README.md
```

## Backend

```bash
cd backend
mvn spring-boot:run
```

A API roda em `http://localhost:8080`.

Console H2:

```text
http://localhost:8080/h2-console
```

JDBC URL:

```text
jdbc:h2:mem:recipebook
```

## Frontend

```bash
cd frontend
npm install
ng serve
```

A aplicacao roda em `http://localhost:4200`.

## Funcionalidades

- Cadastro de receitas
- Listagem em cards
- Busca em tempo real
- Visualizacao de detalhes
- Edicao
- Exclusao


### RF01 em desenvolvimento