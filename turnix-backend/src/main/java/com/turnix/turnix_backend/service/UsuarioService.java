package com.turnix.turnix_backend.service;

import com.turnix.turnix_backend.model.Usuario;
import com.turnix.turnix_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) { // 🔹 CORREGIDO: Long
        return usuarioRepository.findById(id);
    }

    public Usuario save(Usuario usuario) {
        try {
            // Generar el hash de la contraseña si se proporciona
            if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
                usuario.setPasswordHash(passwordEncoder.encode(usuario.getPassword()));
            }
            return usuarioRepository.save(usuario);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Error al crear el usuario: " + e.getMessage());
        }
    }

    public Usuario createUsuario(Usuario usuario) {
        return save(usuario);
    }

    public void deleteUsuario(Long id) { // 🔹 CORREGIDO: Long
        usuarioRepository.deleteById(id);
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    // 🔹 NUEVO MÉTODO para compatibilidad
    public Optional<Usuario> getUsuarioByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        return Optional.ofNullable(usuario);
    }
}