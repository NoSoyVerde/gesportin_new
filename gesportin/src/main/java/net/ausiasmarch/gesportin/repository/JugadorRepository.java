package net.ausiasmarch.gesportin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import net.ausiasmarch.gesportin.entity.JugadorEntity;

public interface JugadorRepository extends JpaRepository<JugadorEntity, Long> {
    
}
