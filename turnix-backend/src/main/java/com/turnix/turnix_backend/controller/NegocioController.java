package com.turnix.turnix_backend.controller;

import com.turnix.turnix_backend.model.Negocio;
import com.turnix.turnix_backend.service.NegocioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/negocios")
public class NegocioController {

    @Autowired
    private NegocioService negocioService;

    @GetMapping
    public List<Negocio> getAllNegocios() {
        return negocioService.getAllNegocios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Negocio> getNegocioById(@PathVariable Long id) {
        Optional<Negocio> negocio = negocioService.getNegocioById(id);
        return negocio.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Negocio createNegocio(@RequestBody Negocio negocio) {
        return negocioService.createNegocio(negocio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNegocio(@PathVariable Long id) {
        negocioService.deleteNegocio(id);
        return ResponseEntity.noContent().build();
    }
}