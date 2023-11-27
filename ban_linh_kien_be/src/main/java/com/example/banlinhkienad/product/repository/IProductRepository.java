package com.example.banlinhkienad.product.repository;
import com.example.banlinhkienad.product.dto.IProductDto;
import com.example.banlinhkienad.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long> {
    String PREFIX_SEARCH_NOT_PRICE = "SELECT p.id_product AS idProduct,\n" +
            "       p.code_product AS codeProduct,\n" +
            "       p.name_product AS nameProduct,\n" +
            "       p.price        AS price,\n" +
            "       p.description  AS description,\n" +
            "       t.name_type    AS nameType\n" +
            " FROM sprint_2_ad_racing.product p\n" +
            "         JOIN\n" +
            "     type_product t ON p.id_type = t.id_type ";

    @Transactional
    @Modifying
    @Query(value = "UPDATE product p set p.flag_deleted = true WHERE p.id_product = :idProduct",nativeQuery = true)
    int deleteProductById(@Param("idProduct") Long idProduct);

    @Query(value = "SELECT p.id_product, p.name_product, p.price, p.description, p.code_product, " +
            "p.quantity, p.flag_deleted, t.id_type " +
            "FROM product p " +
            "JOIN type_product t ON p.id_type = t.id_type " +
            "WHERE p.id_product = :idProduct " +
            "AND p.flag_deleted = false" ,nativeQuery = true)
    Product findByIdProduct(@Param("idProduct") Long idProduct);

    @Query(value = PREFIX_SEARCH_NOT_PRICE +
            " WHERE p.flag_deleted = false " +
            "GROUP BY " +
            "p.id_product, p.code_product, p.name_product, p.price, p.description, t.name_type", nativeQuery = true)
    Page<IProductDto> findAllProduct(Pageable pageable, @Param("search") String search);

    @Query(value = PREFIX_SEARCH_NOT_PRICE +
            " WHERE p.flag_deleted = false" +
            " AND p.code_product like CONCAT('%', :codeProduct ,'%')" +
            " GROUP BY" +
            " p.id_product, p.code_product, p.name_product, p.price, p.description, t.name_type",nativeQuery = true)
    Page<IProductDto> searchCode(@Param("codeProduct") String codeProduct, Pageable pageable);

    @Query(value =PREFIX_SEARCH_NOT_PRICE +
            " WHERE p.flag_deleted = false " +
            "AND p.name_product LIKE CONCAT('%', :nameProduct ,'%') " +
            "GROUP BY " +
            "p.id_product, p.code_product, p.name_product, p.price, p.description, t.name_type",nativeQuery = true)
    Page<IProductDto> searchNameProduct(@Param("nameProduct") String nameProduct, Pageable pageable);

    @Query(value = PREFIX_SEARCH_NOT_PRICE +
            " WHERE p.flag_deleted = false " +
            "AND t.name_type LIKE CONCAT('%', :nameType ,'%') " +
            "GROUP BY " +
            "p.id_product, p.code_product, p.name_product, p.price, p.description, t.name_type",nativeQuery = true)
    Page<IProductDto> searchTypeProduct(@Param("nameType") String nameType, Pageable pageable);

    @Query(value = PREFIX_SEARCH_NOT_PRICE +
            " WHERE p.flag_deleted = false " +
            "AND p.price <= :priceProduct " +
            "GROUP BY " +
            "p.id_product, p.code_product, p.name_product, p.price, p.description, t.name_type",nativeQuery = true)
    Page<IProductDto> searchWithGreaterThanOrEqualPrice(@Param("priceProduct") Float priceProduct, Pageable pageable);

    @Query(value = PREFIX_SEARCH_NOT_PRICE +
            " WHERE p.flag_deleted = false " +
            "AND p.price >= :priceProduct " +
            "GROUP BY " +
            "p.id_product, p.code_product, p.name_product, p.price, p.description, t.name_type",nativeQuery = true)
    Page<IProductDto> searchWithSmallerThanOrEqualPrice(@Param("priceProduct") Float priceProduct, Pageable pageable);

    @Query(value = "SELECT p.*, t.name_type FROM product p " +
            "JOIN " +
            "type_product t ON p.id_type = t.id_type " +
            "WHERE p.flag_deleted = false",nativeQuery = true)
    List<Product> findAllProduct();

    boolean existsByIdProductAndFlagDeletedIsFalse(Long idProduct);
}
