package com.turnix.turnix_backend.service;

import com.turnix.turnix_backend.model.Usuario;
import com.turnix.turnix_backend.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class UsuarioServiceTest {

    private final UsuarioRepository usuarioRepository = Mockito.mock(UsuarioRepository.class);
    private final PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
    private final UsuarioService usuarioService = new UsuarioService(usuarioRepository, passwordEncoder);

    @Test
    public void testGetUsuarioById() {
        Usuario usuario = new Usuario();
        usuario.setId(1);
        Mockito.when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        Optional<Usuario> result = usuarioService.getUsuarioById(1L);
        assertTrue(result.isPresent());
    }
}