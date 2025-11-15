package com.turnix.turnix_backend.controller;

import com.turnix.turnix_backend.model.Usuario;
import com.turnix.turnix_backend.service.UsuarioService;
import com.turnix.turnix_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Usuario usuario = usuarioService.findByEmail(loginRequest.getEmail()); // 🔹 CORREGIDO
            
            if (usuario == null || !passwordEncoder.matches(loginRequest.getPassword(), usuario.getPasswordHash())) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Credenciales inválidas");
                return ResponseEntity.badRequest().body(response);
            }

            String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRol());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("usuario", Map.of(
                "id", usuario.getId(), // 🔹 CORREGIDO: getId() en lugar de getIdUsuario()
                "nombre", usuario.getNombre(),
                "email", usuario.getEmail(),
                "rol", usuario.getRol()
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error en el servidor: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody RegistroRequest registroRequest) {
        try {
            if (usuarioService.findByEmail(registroRequest.getEmail()) != null) { // 🔹 CORREGIDO
                Map<String, String> response = new HashMap<>();
                response.put("error", "El email ya está registrado");
                return ResponseEntity.badRequest().body(response);
            }

            Usuario usuario = new Usuario();
            usuario.setNombre(registroRequest.getNombre());
            usuario.setApellido(registroRequest.getApellido());
            usuario.setEmail(registroRequest.getEmail());
            usuario.setTelefono(registroRequest.getTelefono());
            usuario.setPassword(registroRequest.getPassword()); // 🔹 Usar campo transiente
            usuario.setRol("Cliente"); // Por defecto cliente

            Usuario usuarioGuardado = usuarioService.save(usuario); // 🔹 CORREGIDO

            String token = jwtUtil.generateToken(usuarioGuardado.getEmail(), usuarioGuardado.getRol());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("usuario", Map.of(
                "id", usuarioGuardado.getId(), // 🔹 CORREGIDO
                "nombre", usuarioGuardado.getNombre(),
                "email", usuarioGuardado.getEmail(),
                "rol", usuarioGuardado.getRol()
            ));
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error en el servidor: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Clases internas para los requests
    public static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegistroRequest {
        private String nombre;
        private String apellido;
        private String email;
        private String telefono;
        private String password;
        
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getApellido() { return apellido; }
        public void setApellido(String apellido) { this.apellido = apellido; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}