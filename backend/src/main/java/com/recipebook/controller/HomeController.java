package com.recipebook.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "app", "RecipeBook API",
                "receitas", "/api/receitas",
                "h2Console", "/h2-console"
        );
    }
}
