package net.ausiasmarch.gesportin.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.ausiasmarch.gesportin.entity.FacturaEntity;
import net.ausiasmarch.gesportin.service.FacturaService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/factura")
public class FacturaApi{

    @Autowired
    FacturaService oFacturaService;

    //Get de Factura
    @GetMapping("/{id}")
    public ResponseEntity<FacturaEntity> get(@PathVariable Long id) {
        return ResponseEntity.ok(oFacturaService.get(id));
    }

    //GetPage de Factura
    @GetMapping("")
    public ResponseEntity<Page<FacturaEntity>> getPage(Pageable oPageable) {
        return ResponseEntity.ok(oFacturaService.getPage(oPageable));
    }

    //Crear Factura
    @PostMapping("")
    public ResponseEntity<Long> create(@RequestBody FacturaEntity facturaEntity) {
        return ResponseEntity.ok(oFacturaService.create(facturaEntity));
    }

    //Modificar Factura
    @PutMapping("")
    public ResponseEntity<Long> update(@RequestBody FacturaEntity facturaEntity) {
        return ResponseEntity.ok(oFacturaService.update(facturaEntity));
    }
    
    //Borrar Factura
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        return ResponseEntity.ok(oFacturaService.delete(id));
    }

    //Borrar Todas las Facturas
    @DeleteMapping("/empty")
    public ResponseEntity<Long> empty() {
        return ResponseEntity.ok(oFacturaService.empty());
    }

    //Cuenta las Facturas
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(oFacturaService.count()); 
    }

    //Crea Facturas
    @GetMapping("/fill/{numFacturas}")
    public ResponseEntity<Long> fillFacturas(@PathVariable int numFacturas) {
        return ResponseEntity.ok(oFacturaService.fillFacturas(numFacturas));
    }
}