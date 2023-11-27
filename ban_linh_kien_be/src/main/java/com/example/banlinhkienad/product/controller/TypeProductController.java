package com.example.banlinhkienad.product.controller;
import com.example.banlinhkienad.product.model.TypeProduct;
import com.example.banlinhkienad.product.service.ITypeProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/type")
public class TypeProductController {
    @Autowired
    private ITypeProductService typeProductService;

    @GetMapping("/list")
    public ResponseEntity<List<TypeProduct>> findAll(){
        return new ResponseEntity<>(typeProductService.findAllType(), HttpStatus.OK);
    }
}
