package com.turnix.turnix_backend.service;

import com.turnix.turnix_backend.model.Usuario;
import com.turnix.turnix_backend.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class UsuarioServiceTest {

    private final UsuarioRepository usuarioRepository = Mockito.mock(UsuarioRepository.class);
    private final PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
    private final UsuarioService usuarioService = new UsuarioService(usuarioRepository, passwordEncoder);

    @Test
    public void testGetUsuarioById() {
        Usuario usuario = new Usuario();
        usuario.setId(1L); // 🔹 CORREGIDO: 1L en lugar de 1
        Mockito.when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        Optional<Usuario> result = usuarioService.getUsuarioById(1L); // 🔹 CORREGIDO: 1L en lugar de 1
        assertTrue(result.isPresent());
    }

    @Test
    public void testFindByEmail() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail("test@example.com");
        Mockito.when(usuarioRepository.findByEmail("test@example.com")).thenReturn(usuario);

        Usuario result = usuarioService.findByEmail("test@example.com");
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    public void testExistsByEmail() {
        Mockito.when(usuarioRepository.existsByEmail("test@example.com")).thenReturn(true);

        boolean result = usuarioService.existsByEmail("test@example.com");
        assertTrue(result);
    }

    @Test
    public void testCreateUsuario() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Test");
        usuario.setEmail("test@example.com");
        usuario.setPassword("password123");
        
        Mockito.when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        Mockito.when(usuarioRepository.save(Mockito.any(Usuario.class))).thenReturn(usuario);

        Usuario result = usuarioService.createUsuario(usuario);
        assertNotNull(result);
        assertEquals("Test", result.getNombre());
    }
}