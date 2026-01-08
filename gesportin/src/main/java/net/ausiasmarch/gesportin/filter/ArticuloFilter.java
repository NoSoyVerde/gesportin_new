package net.ausiasmarch.gesportin.filter;

public class ArticuloFilter {

    private String descripcion;
    private Long idTipoarticulo;
    private Long idClub;

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getIdTipoarticulo() {
        return idTipoarticulo;
    }

    public void setIdTipoarticulo(Long idTipoarticulo) {
        this.idTipoarticulo = idTipoarticulo;
    }

    public Long getIdClub() {
        return idClub;
    }

    public void setIdClub(Long idClub) {
        this.idClub = idClub;
    }

}
