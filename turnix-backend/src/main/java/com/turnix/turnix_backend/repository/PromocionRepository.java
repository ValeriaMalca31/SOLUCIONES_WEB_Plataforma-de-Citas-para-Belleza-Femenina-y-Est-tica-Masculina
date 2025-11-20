package com.turnix.turnix_backend.repository;

import com.turnix.turnix_backend.model.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromocionRepository extends JpaRepository<Promocion, Long> {
}