package com.example.banlinhkienad.home.service;
import com.example.banlinhkienad.home.dto.ProductForHomePageDto;
import com.example.banlinhkienad.product.dto.IProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IHomeService {
    List<ProductForHomePageDto> findProductForHomePage(String nameProduct, String nameType);

    Page<ProductForHomePageDto> getListProductWithPagination(String nameProduct, String nameType, Pageable pageable);
    List<ProductForHomePageDto> findFavoriteProductForHomepage();

    Page<ProductForHomePageDto> searchByPriceWitchPrice(Float priceProduct, Pageable pageable);
    Page<ProductForHomePageDto> searchByPriceSmallPrice(Float priceProduct, Pageable pageable);
    Page<ProductForHomePageDto> searchByPrice(Pageable pageable, String search, String conditional);
}
