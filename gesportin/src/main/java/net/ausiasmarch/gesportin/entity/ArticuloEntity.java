package net.ausiasmarch.gesportin.entity;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "articulo")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticuloEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String descripcion;

    @NotNull
    private BigDecimal precio;

    private BigDecimal descuento;

    @Lob
    private byte[] imagen;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tipoarticulo")
    private TipoarticuloEntity tipoarticulo;

    // https://www.baeldung.com/lombok-omit-getter-setter
    
    // @Getter(AccessLevel.NONE)
    @OneToMany(mappedBy = "articulo", fetch = FetchType.LAZY)
    private java.util.List<ComentarioartEntity> comentarioarts;

    //@Getter(AccessLevel.NONE)
    @OneToMany(mappedBy = "articulo", fetch = FetchType.LAZY)
    private java.util.List<CompraEntity> compras;

    // @Getter(AccessLevel.NONE)
    @OneToMany(mappedBy = "articulo", fetch = FetchType.LAZY)
    private java.util.List<CompraEntity> carritos;

    /*
    public int getComentarioarts() {
        return comentarioarts.size();
    }

    public int getCompras() {
        return compras.size();
    }

    public int getCarritos() {
        return carritos.size();
    }
    */

}
