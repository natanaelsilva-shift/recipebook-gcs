# RecipeBook Backend

API REST em Java 17 com Spring Boot 3.x para gestao de receitas culinarias.

## Dupla

- Natanael Silva da Cruz
- Nome Completo 2

## Tecnologias

- Java 17
- Spring Boot 3.x
- Maven
- Spring Web
- Spring Data JPA
- Bean Validation
- H2 Database

## Como rodar

```bash
mvn spring-boot:run
```

A API ficara disponivel em `http://localhost:8080`.

## Endpoints

- `GET /api/receitas`
- `GET /api/receitas/{id}`
- `POST /api/receitas`
- `PUT /api/receitas/{id}`
- `DELETE /api/receitas/{id}`

## Banco de dados

O projeto usa H2 em memoria. O console fica em:

```text
http://localhost:8080/h2-console
```

Configuracao JDBC:

```text
jdbc:h2:mem:recipebook
```

## Regras implementadas

- Cadastro com validacao
- Edicao com validacao
- Nome unico com comparacao case-insensitive
- Listagem ordenada por receitas mais recentes
- Busca por id com retorno `404` quando nao encontrada
- Cadastro com retorno `201`
- Exclusao com retorno `204`
- Ingredientes persistidos como lista
- CORS liberado para `http://localhost:4200`
