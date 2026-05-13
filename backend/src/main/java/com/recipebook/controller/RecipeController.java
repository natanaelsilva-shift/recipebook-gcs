package com.recipebook.controller;

import com.recipebook.dto.RecipeDTO;
import com.recipebook.service.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/receitas")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @GetMapping
    public List<RecipeDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public RecipeDTO buscarPorId(@PathVariable("id") Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<RecipeDTO> criar(@Valid @RequestBody RecipeDTO recipeDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(recipeDTO));
    }

    @PutMapping("/{id}")
    public RecipeDTO atualizar(@PathVariable("id") Long id, @Valid @RequestBody RecipeDTO recipeDTO) {
        return service.atualizar(id, recipeDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
