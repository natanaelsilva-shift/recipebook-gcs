package com.recipebook.dto;

import com.recipebook.entity.Categoria;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

public record RecipeDTO(
        Long id,

        @NotBlank(message = "Nome é obrigatório")
        @Size(min = 3, message = "Nome deve ter no mínimo 3 caracteres")
        String nome,

        @NotNull(message = "Categoria é obrigatória")
        Categoria categoria,

        @NotNull(message = "Tempo de preparo é obrigatório")
        @Min(value = 1, message = "Tempo de preparo deve ser no mínimo 1")
        Integer tempoPreparo,

        @NotNull(message = "Porções é obrigatório")
        @Min(value = 1, message = "Porções deve ser no mínimo 1")
        Integer porcoes,

        @NotEmpty(message = "Informe pelo menos 1 ingrediente")
        List<@NotBlank(message = "Ingrediente não pode ser vazio") String> ingredientes,

        @NotBlank(message = "Modo de preparo é obrigatório")
        @Size(min = 10, message = "Modo de preparo deve ter no mínimo 10 caracteres")
        String modoPreparo,

        LocalDateTime dataCadastro
) {
}
