package com.example.banlinhkienad.home.service;
import com.example.banlinhkienad.home.dto.ProductForHomePageDto;
import com.example.banlinhkienad.home.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeService implements IHomeService{
    @Autowired
    private HomeRepository homeRepository;
    @Override
    public List<ProductForHomePageDto> findProductForHomePage(String nameProduct, String nameType) {
        return homeRepository.findProductForHomePage(nameProduct, nameType);
    }

    @Override
    public Page<ProductForHomePageDto> getListProductWithPagination(String nameProduct, String nameType, Pageable pageable) {
        return homeRepository.getListProductWithPagination(nameProduct, nameType, pageable);
    }

    @Override
    public List<ProductForHomePageDto> findFavoriteProductForHomepage() {
        return homeRepository.findFavoriteProductForHomepage();
    }

    @Override
    public Page<ProductForHomePageDto> searchByPriceWitchPrice(Float priceProduct, Pageable pageable) {
        return homeRepository.searchWithGreaterThanOrEqualPriceHome(priceProduct, pageable);
    }

    @Override
    public Page<ProductForHomePageDto> searchByPriceSmallPrice(Float priceProduct, Pageable pageable) {
        return homeRepository.searchWithSmallerThanOrEqualPriceHome(priceProduct, pageable);
    }

    @Override
    public Page<ProductForHomePageDto> searchByPrice(Pageable pageable, String search, String conditional) {
        Float price = null;
        try {
            price = Float.parseFloat(search);
            switch (conditional) {
                case "greater":
                    return searchByPriceWitchPrice(price,pageable);
                case "small":
                    return searchByPriceSmallPrice(price,pageable);
                default:
                    return getListProductWithPagination(search,conditional,pageable);
            }
        } catch (Exception e) {
            return getListProductWithPagination(search,conditional,pageable);
        }
    }
}
