package com.example.banlinhkienad.product.service.impl;
import com.example.banlinhkienad.product.dto.IProductDto;
import com.example.banlinhkienad.product.model.Product;
import com.example.banlinhkienad.product.repository.IProductRepository;
import com.example.banlinhkienad.product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;

    @Override
    public Page<IProductDto> findAllProduct(Pageable pageable, String search) {
        return productRepository.findAllProduct(pageable, search);
    }

    @Override
    public Product findByIdProduct(Long idProduct) {
        return productRepository.findByIdProduct(idProduct);
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAllProduct();
    }

    @Override
    public Page<IProductDto> searchByCode(Pageable pageable, String codeProduct) {
        return productRepository.searchCode(codeProduct, pageable);
    }

    @Override
    public Page<IProductDto> searchByName(Pageable pageable, String nameProduct) {
        return productRepository.searchNameProduct(nameProduct, pageable);
    }

    @Override
    public Page<IProductDto> searchByType(Pageable pageable, String nameType) {
        return productRepository.searchTypeProduct(nameType, pageable);
    }

    @Override
    public Page<IProductDto> searchByPriceWitchPrice(Pageable pageable, Float priceProduct) {
        return productRepository.searchWithGreaterThanOrEqualPrice(priceProduct, pageable);
    }

    @Override
    public Page<IProductDto> searchByPriceSmallPrice(Pageable pageable, Float priceProduct) {
        return productRepository.searchWithSmallerThanOrEqualPrice(priceProduct, pageable);
    }

    @Override
    public Page<IProductDto> searchByPrice(Pageable pageable, String search, String conditional) {
        Float price = null;
        try {
            price = Float.parseFloat(search);
            switch (conditional) {
                case "greater":
                    return searchByPriceWitchPrice(pageable, price);
                case "small":
                    return searchByPriceSmallPrice(pageable, price);
                default:
                    return findAllProduct(pageable, search);
            }
        } catch (Exception e) {
            return findAllProduct(pageable, search);
        }
    }

    @Override
    public boolean existsByIdAndFlagDeletedIsFalse(Long idProduct) {
        return productRepository.existsByIdProductAndFlagDeletedIsFalse(idProduct);
    }
}
