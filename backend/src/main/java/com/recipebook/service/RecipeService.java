package com.recipebook.service;

import com.recipebook.dto.RecipeDTO;
import com.recipebook.entity.Recipe;
import com.recipebook.exception.ResourceNotFoundException;
import com.recipebook.repository.RecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository repository;

    public RecipeService(RecipeRepository repository) {
        this.repository = repository;
    }

    public List<RecipeDTO> listar() {
        return repository.findAllByOrderByDataCadastroDesc()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public RecipeDTO buscarPorId(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Receita nao encontrada"));
    }

    public RecipeDTO criar(RecipeDTO recipeDTO) {
        String nome = recipeDTO.nome().trim();

        if (repository.existsByNomeIgnoreCase(nome)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome da receita deve ser unico");
        }

        Recipe recipe = new Recipe();
        preencherRecipe(recipe, recipeDTO, nome);

        return toDTO(repository.save(recipe));
    }

    public RecipeDTO atualizar(Long id, RecipeDTO recipeDTO) {
        Recipe recipe = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receita nao encontrada"));

        String nome = recipeDTO.nome().trim();

        if (repository.existsByNomeIgnoreCaseAndIdNot(nome, id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome da receita deve ser unico");
        }

        preencherRecipe(recipe, recipeDTO, nome);

        return toDTO(repository.save(recipe));
    }

    public void excluir(Long id) {
        Recipe recipe = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receita nao encontrada"));
        repository.delete(recipe);
    }

    private void preencherRecipe(Recipe recipe, RecipeDTO recipeDTO, String nome) {
        recipe.setNome(nome);
        recipe.setCategoria(recipeDTO.categoria());
        recipe.setTempoPreparo(recipeDTO.tempoPreparo());
        recipe.setPorcoes(recipeDTO.porcoes());
        recipe.setIngredientes(normalizarIngredientes(recipeDTO.ingredientes()));
        recipe.setModoPreparo(recipeDTO.modoPreparo().trim());
    }

    private List<String> normalizarIngredientes(List<String> ingredientes) {
        List<String> normalizados = ingredientes.stream()
                .map(String::trim)
                .filter(ingrediente -> !ingrediente.isBlank())
                .toList();

        if (normalizados.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe pelo menos 1 ingrediente");
        }

        return new ArrayList<>(normalizados);
    }

    private RecipeDTO toDTO(Recipe recipe) {
        return new RecipeDTO(
                recipe.getId(),
                recipe.getNome(),
                recipe.getCategoria(),
                recipe.getTempoPreparo(),
                recipe.getPorcoes(),
                recipe.getIngredientes(),
                recipe.getModoPreparo(),
                recipe.getDataCadastro()
        );
    }
}
