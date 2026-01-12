package net.ausiasmarch.gesportin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import net.ausiasmarch.gesportin.entity.CarritoEntity;
import net.ausiasmarch.gesportin.exception.UnauthorizedException;
import net.ausiasmarch.gesportin.repository.CarritoRepository;

@Service
public class CarritoService {
    
    @Autowired
    CarritoRepository oCarritoRepository;

    @Autowired
    AleatorioService oAleatorioService;

    @Autowired
    SessionService oSessionService;

    public CarritoEntity get(Long id) {
        return oCarritoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el carrito con id: " + id));
    }

    public Page<CarritoEntity> getPage(Pageable oPageable) {
        return oCarritoRepository.findAll(oPageable);
    }

    public Long create(CarritoEntity oCarritoEntity) {
        if (!oSessionService.isSessionActive()) {
            throw new UnauthorizedException("No hay sesion activa");
        }
        oCarritoEntity.setId(null);
        oCarritoRepository.save(oCarritoEntity);
        return oCarritoEntity.getId();
    }

    public Long update(CarritoEntity oCarritoEntity) {
        if (!oSessionService.isSessionActive()) {
            throw new UnauthorizedException("No hay sesión activa");
        }
        CarritoEntity existingCarrito = oCarritoRepository.findById(oCarritoEntity.getId())
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar: ID no encontrado"));
        existingCarrito.setCantidad(oCarritoEntity.getCantidad());
        existingCarrito.setId_articulo(oCarritoEntity.getId_articulo());
        existingCarrito.setId_usuario(oCarritoEntity.getId_usuario());
        oCarritoRepository.save(existingCarrito);
        return existingCarrito.getId();
    }

    public Long delete(Long id) {
        if (!oSessionService.isSessionActive()) {
            throw new UnauthorizedException("No active session");
        }
        oCarritoRepository.deleteById(id);
        return id;
    }

    public Long fill(Long cantidad) {
        if (!oSessionService.isSessionActive()) {
            throw new UnauthorizedException("No hay sesión activa");
        }
        for (long i = 0; i < cantidad; i++) {
            CarritoEntity oCarritoEntity = new CarritoEntity();
            oCarritoEntity.setCantidad(oAleatorioService.GenerarNumeroAleatorioEnteroEnRango(1, 50));
            oCarritoEntity.setId_articulo((long)oAleatorioService.GenerarNumeroAleatorioEnteroEnRango(1, 50));
            oCarritoEntity.setId_usuario((long)oAleatorioService.GenerarNumeroAleatorioEnteroEnRango(1, 50));
            oCarritoRepository.save(oCarritoEntity);
        }

        return cantidad;
    }

    public Long empty() {
        if (!oSessionService.isSessionActive()) {
            throw new UnauthorizedException("No active session");
        }
        Long total = oCarritoRepository.count();
        oCarritoRepository.deleteAll();
        return total;
    }

    public Long count() {
        return oCarritoRepository.count();
    }


}
