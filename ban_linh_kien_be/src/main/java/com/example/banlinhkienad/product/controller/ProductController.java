package com.example.banlinhkienad.product.controller;

import com.example.banlinhkienad.product.dto.IProductDto;
import com.example.banlinhkienad.product.model.Product;
import com.example.banlinhkienad.product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("/list")
    public ResponseEntity<Page<IProductDto>> pageProduct(@RequestParam(defaultValue = "0", required = false) Integer page,
                                                         @RequestParam(defaultValue = "", required = false) Integer limit,
                                                         @RequestParam(defaultValue = "", required = false) String searchProduct,
                                                         @RequestParam(defaultValue = "", required = false) String search,
                                                         @RequestParam(defaultValue = "", required = false) String conditional) {
        Pageable pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "idProduct"));
        Page<IProductDto> products;
        switch (searchProduct) {
            case "nameProduct":
                products = productService.searchByName(pageable, search);
                break;
            case "codeProduct":
                products = productService.searchByCode(pageable, search);
                break;
            case "nameType":
                products = productService.searchByType(pageable, search);
                break;
            case "searchByPrice":
                products = productService.searchByPrice(pageable, search, conditional);
                if (conditional.equals("")) {
                    return new ResponseEntity<>(products, HttpStatus.NO_CONTENT);
                }
                break;
            default:
                products = productService.findAllProduct(pageable, search);
                break;
        }
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/get-list")
    public ResponseEntity<List<Product>> productList() {
        List<Product> products = productService.getAll();
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{idProduct}")
    @ResponseBody
    public ResponseEntity findByIdProduct(@PathVariable("idProduct") Long idProduct) {
        return new ResponseEntity<>(productService.findByIdProduct(idProduct), HttpStatus.OK);
    }
}
