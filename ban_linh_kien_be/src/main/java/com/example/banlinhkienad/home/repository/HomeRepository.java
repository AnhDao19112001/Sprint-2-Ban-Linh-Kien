package com.example.banlinhkienad.home.repository;
import com.example.banlinhkienad.home.dto.ProductForHomePageDto;
import com.example.banlinhkienad.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HomeRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT " +
            "p.id_product AS idProduct, " +
            "p.name_product AS nameProduct, " +
            "p.price AS price, " +
            "t.name_type AS nameType, " +
            "MIN(im.image_path) AS imageProduct " +
            "FROM product p " +
            "JOIN " +
            "type_product t ON p.id_type = t.id_type " +
            "JOIN " +
            "image im ON p.id_product = im.id_product " +
            "WHERE " +
            "p.flag_deleted = false " +
            "AND p.name_product LIKE CONCAT('%', :nameProduct ,'%') " +
            "AND t.name_type LIKE CONCAT('%', :nameType ,'%') " +
            "GROUP BY " +
            "P.id_product, p.name_product, p.price, t.name_type ORDER BY p.id_product DESC LIMIT 10",nativeQuery = true)
    List<ProductForHomePageDto> findProductForHomePage(@Param("nameProduct") String nameProduct, @Param("nameType") String nameType);

    @Query(value = "SELECT " +
            "p.id_product AS idProduct, " +
            "p.name_product AS nameProduct, " +
            "p.price AS price, " +
            "t.name_type AS nameType, " +
            "im.image_path AS imageProduct " +
            "FROM product p " +
            "JOIN type_product t ON p.id_type = t.id_type " +
            "JOIN image im ON p.id_product = im.id_product " +
            "WHERE " +
            "p.flag_deleted = false " +
            "AND p.name_product LIKE CONCAT('%', :nameProduct ,'%') " +
            "AND t.name_type LIKE CONCAT('%', :nameType ,'%')",nativeQuery = true)
    Page<ProductForHomePageDto> getListProductWithPagination(@Param("nameProduct") String nameProduct,
                                                              @Param("nameType") String nameType,
                                                              Pageable pageable);

    @Query(value = "SELECT " +
            "p.id_product AS idProduct, " +
            "p.name_product AS nameProduct, " +
            "p.price AS price, " +
            "t.name_type AS nameType, " +
            "MIN(im.image_path) AS imageProduct, " +
            "SUM(od.quantity) AS productSaleQuantity " +
            "FROM product p " +
            "JOIN " +
            "orders_detail od ON p.id_product = od.id_product " +
            "LEFT JOIN image im ON p.id_product = im.id_product " +
            "JOIN " +
            "type_product t ON p.id_type = t.id_type " +
            "GROUP BY " +
            "p.id_product, p.name_product, p.price, t.name_type " +
            "ORDER BY SUM(od.quantity) DESC LIMIT 20",nativeQuery = true)
    List<ProductForHomePageDto> findFavoriteProductForHomepage();
}
