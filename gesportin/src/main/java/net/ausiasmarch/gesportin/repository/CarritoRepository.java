package net.ausiasmarch.gesportin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.ausiasmarch.gesportin.entity.CarritoEntity;

public interface CarritoRepository extends JpaRepository<CarritoEntity, Long> {
    
}
