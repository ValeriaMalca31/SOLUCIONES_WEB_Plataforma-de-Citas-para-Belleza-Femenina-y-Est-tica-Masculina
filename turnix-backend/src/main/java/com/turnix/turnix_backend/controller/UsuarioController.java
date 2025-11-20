package com.turnix.turnix_backend.controller;

import com.turnix.turnix_backend.dto.LoginRequestDTO;
import com.turnix.turnix_backend.dto.LoginResponseDTO;
import com.turnix.turnix_backend.dto.UsuarioRequestDTO;
import com.turnix.turnix_backend.dto.UsuarioResponseDTO;
import com.turnix.turnix_backend.model.Usuario;
import com.turnix.turnix_backend.service.UserDetailsServiceImpl;
import com.turnix.turnix_backend.service.UsuarioService;
import com.turnix.turnix_backend.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

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
    public ResponseEntity<UsuarioResponseDTO> createUsuario(@Valid @RequestBody UsuarioRequestDTO usuarioDto) {
        // map DTO -> entidad
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setApellido(usuarioDto.getApellido());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setTelefono(usuarioDto.getTelefono());
        usuario.setPassword(usuarioDto.getPassword());
        usuario.setRol(usuarioDto.getRol());

        Usuario createdUsuario = usuarioService.createUsuario(usuario);

        // map entidad -> response DTO
        UsuarioResponseDTO resp = new UsuarioResponseDTO();
    Long idLong = createdUsuario.getId() == null ? null : createdUsuario.getId().longValue();
    resp.setId(idLong);
        resp.setNombre(createdUsuario.getNombre());
        resp.setApellido(createdUsuario.getApellido());
        resp.setEmail(createdUsuario.getEmail());
        resp.setTelefono(createdUsuario.getTelefono());
        resp.setRol(createdUsuario.getRol());

        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UsuarioRequestDTO usuarioDto) {
        if (usuarioService.getUsuarioByEmail(usuarioDto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo ya está registrado.");
        }
        try {
            Usuario usuario = new Usuario();
            usuario.setNombre(usuarioDto.getNombre());
            usuario.setApellido(usuarioDto.getApellido());
            usuario.setEmail(usuarioDto.getEmail());
            usuario.setTelefono(usuarioDto.getTelefono());
            usuario.setPassword(usuarioDto.getPassword());
            usuario.setRol(usuarioDto.getRol());

            Usuario created = usuarioService.createUsuario(usuario);

            UsuarioResponseDTO resp = new UsuarioResponseDTO();
            Long idLong2 = created.getId() == null ? null : created.getId().longValue();
            resp.setId(idLong2);
            resp.setNombre(created.getNombre());
            resp.setApellido(created.getApellido());
            resp.setEmail(created.getEmail());
            resp.setTelefono(created.getTelefono());
            resp.setRol(created.getRol());

            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponseDTO(jwt));
    }
}