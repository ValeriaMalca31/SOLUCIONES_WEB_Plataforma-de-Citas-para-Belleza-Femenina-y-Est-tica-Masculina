package com.turnix.turnix_backend.repository;

import com.turnix.turnix_backend.model.ProfesionalServicio;
import com.turnix.turnix_backend.model.ProfesionalServicioId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesionalServicioRepository extends JpaRepository<ProfesionalServicio, ProfesionalServicioId> {
}