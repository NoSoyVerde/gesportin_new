package net.ausiasmarch.gesportin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "jugador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JugadorEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private long dorsal;
    
    @NotNull
    @Size(min = 3, max = 1024)
    private String posicion;
    
    @NotNull
    private long capitan;
    
    @NotNull
    private String imagen;
    
    @NotNull
    private long id_usuario;
}
