package com.turnix.turnix_backend.repository;

import com.turnix.turnix_backend.model.GaleriaNegocio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GaleriaNegocioRepository extends JpaRepository<GaleriaNegocio, Long> {
}