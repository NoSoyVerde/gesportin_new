package net.ausiasmarch.gesportin.bean;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import net.ausiasmarch.gesportin.entity.ArticuloEntity;
import net.ausiasmarch.gesportin.repository.ArticuloRepository;

@Component
public class ArticuloFiller {

    @Autowired
    private ArticuloRepository articuloRepository;

    private final Random random = new Random();

    private final String[] descripciones = {
            "Camiseta oficial", "Pantalón corto", "Medias deportivas", "Balón oficial",
            "Zapatillas de fútbol", "Guantes de portero", "Espinilleras", "Sudadera",
            "Chaqueta de chándal", "Mochila deportiva", "Botella de agua", "Bufanda del club",
            "Gorra deportiva", "Muñequeras", "Cinta para el pelo", "Rodilleras",
            "Protector bucal", "Silbato", "Cronómetro", "Conos de entrenamiento",
            "Petos de entrenamiento", "Red de portería", "Bomba de aire", "Aguja para balones",
            "Camiseta de entrenamiento", "Pantalón largo", "Bolsa de deporte", "Toalla",
            "Chanclas", "Calcetines térmicos", "Chubasquero", "Polo del club",
            "Bermudas", "Leggins deportivos", "Top deportivo", "Cortavientos",
            "Chaleco reflectante", "Gafas de sol deportivas", "Reloj deportivo", "Pulsera fitness",
            "Protector solar", "Vendas elásticas", "Spray frío", "Crema muscular",
            "Bidón isotérmico", "Portabotellas", "Silbato electrónico", "Tarjetas de árbitro",
            "Marcador deportivo", "Pizarra táctica"
    };

    public Long fill() {
        for (int i = 0; i < 50; i++) {
            ArticuloEntity articulo = new ArticuloEntity();
            articulo.setDescripcion(descripciones[i % descripciones.length] + " " + (i + 1));
            articulo.setPrecio(BigDecimal.valueOf(random.nextDouble() * 100 + 5).setScale(2, RoundingMode.HALF_UP));
            articulo.setDescuento(random.nextBoolean() ? BigDecimal.valueOf(random.nextDouble() * 30).setScale(2, RoundingMode.HALF_UP) : null);
            articulo.setIdTipoarticulo((long) (random.nextInt(50) + 1));
            articulo.setIdClub((long) (random.nextInt(50) + 1));

            articuloRepository.save(articulo);
        }
        return 50L;
    }

}
