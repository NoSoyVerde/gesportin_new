package net.ausiasmarch.gesportin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import net.ausiasmarch.gesportin.entity.ArticuloEntity;
import net.ausiasmarch.gesportin.exception.ResourceNotFoundException;
import net.ausiasmarch.gesportin.filter.ArticuloFilter;
import net.ausiasmarch.gesportin.repository.ArticuloRepository;

@Service
public class ArticuloService {

    @Autowired
    private ArticuloRepository articuloRepository;

    public ArticuloEntity get(Long id) {
        return articuloRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Articulo no encontrado con id: " + id));
    }

    public Page<ArticuloEntity> getPage(Pageable pageable, ArticuloFilter filter) {
        if (filter.getDescripcion() != null && !filter.getDescripcion().isEmpty()) {
            return articuloRepository.findByDescripcionContainingIgnoreCase(filter.getDescripcion(), pageable);
        } else if (filter.getIdTipoarticulo() != null) {
            return articuloRepository.findByIdTipoarticulo(filter.getIdTipoarticulo(), pageable);
        } else if (filter.getIdClub() != null) {
            return articuloRepository.findByIdClub(filter.getIdClub(), pageable);
        } else {
            return articuloRepository.findAll(pageable);
        }
    }

    public ArticuloEntity create(ArticuloEntity articulo) {
        articulo.setId(null);
        return articuloRepository.save(articulo);
    }

    public ArticuloEntity update(ArticuloEntity articulo) {
        ArticuloEntity articuloExistente = articuloRepository.findById(articulo.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Articulo no encontrado con id: " + articulo.getId()));
        
        articuloExistente.setDescripcion(articulo.getDescripcion());
        articuloExistente.setPrecio(articulo.getPrecio());
        articuloExistente.setDescuento(articulo.getDescuento());
        articuloExistente.setImagen(articulo.getImagen());
        articuloExistente.setIdTipoarticulo(articulo.getIdTipoarticulo());
        articuloExistente.setIdClub(articulo.getIdClub());
        
        return articuloRepository.save(articuloExistente);
    }

    public Long delete(Long id) {
        ArticuloEntity articulo = articuloRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Articulo no encontrado con id: " + id));
        articuloRepository.delete(articulo);
        return id;
    }

}
