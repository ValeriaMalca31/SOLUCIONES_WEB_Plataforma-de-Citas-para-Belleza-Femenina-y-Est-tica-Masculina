package com.turnix.turnix_backend.controller;

import com.turnix.turnix_backend.model.Usuario;
import com.turnix.turnix_backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.getUsuarioById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        Usuario createdUsuario = usuarioService.createUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUsuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email) {
        Usuario usuario = usuarioService.findByEmail(email);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Usuario usuario) {
        if (usuarioService.findByEmail(usuario.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo ya está registrado.");
        }
        try {
            usuarioService.createUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}