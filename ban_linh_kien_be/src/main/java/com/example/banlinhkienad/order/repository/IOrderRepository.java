package com.example.banlinhkienad.order.repository;
import com.example.banlinhkienad.order.dto.IOderDto;
import com.example.banlinhkienad.order.dto.IOrderProjection;
import com.example.banlinhkienad.order.dto.OrderDetailProjection;
import com.example.banlinhkienad.order.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface IOrderRepository extends JpaRepository<Orders, Long> {

    @Transactional
    @Modifying
    @Query(value = "insert into orders(date_time,flag_deleted,app_user_id) " +
            "values (:dateTime , false , :appUserId)", nativeQuery = true)
    void createOrders(String dateTime, Long appUserId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO orders_detail(flag_deleted,price,quantity,id_order,id_product) " +
            "VALUES (false,:price,:quantity,:idOrder,:idProduct)", nativeQuery = true)
    void createOderDetail(@Param("price") Float price,
                          @Param("idOrder") Long idOrder,
                          @Param("quantity") Integer quantity,
                          @Param("idProduct") Long idProduct);

    @Transactional
    @Modifying
    @Query(value = "update product set quantity = :quantity where id_product = :idProduct", nativeQuery = true)
    void updateProduct(@Param("quantity") Integer quantity,
                       @Param("idProduct") Long idProduct);

    @Query(value = "SELECT max(id) FROM orders", nativeQuery = true)
    Long getIdMaxOrder();

    @Query(value = "SELECT o.id FROM orders_detail od " +
            "JOIN orders o ON od.id_order = o.id " +
            "WHERE o.app_user_id = :appUserId AND " +
            "od.id_product = :idProduct LIMIT 1", nativeQuery = true)
    Integer checkOrderDetail(Long appUserId, Long idProduct);

    @Query(value = "SELECT o.date_time, sum(price) as price " +
            "FROM orders o " +
            "JOIN orders_detail od ON od.id_order = o.id " +
            "WHERE o.app_user_id = :id " +
            "GROUP BY o.date_time", nativeQuery = true)
    Page<IOderDto> getOrderDto(Long id, Pageable pageable);

    @Query(value = "SELECT o.*\n" +
            "FROM orders AS o\n" +
            "         RIGHT JOIN app_user AS a ON a.id = o.app_user_id\n" +
            "WHERE a.id = :appUserId AND o.flag_deleted = false\n" +
            "ORDER BY o.date_time ASC", nativeQuery = true)
    List<Orders> listOrders(@Param("appUserId") Long appUserId);

    @Query(value = "SELECT " +
            " od.id as idOrder, " +
            " o.id as id, " +
            "            o.code AS code," +
            "            MAX(app.full_name) AS fullName," +
            "            o.date_time AS orderDate," +
            "            CASE" +
            "            WHEN app.id IS NULL THEN" +
            "            sum(od.price * od.quantity)" +
            "            WHEN app.id IS NOT NULL THEN" +
            "            sum(od.price * od.quantity) END AS orderDetailPrice" +
            "             FROM" +
            "             orders o" +
            "            LEFT JOIN app_user app on app.id = o.app_user_id" +
            "            LEFT JOIN user_role ur on app.id = ur.app_user_id" +
            "            LEFT OUTER JOIN app_role ar on ar.id = ur.app_role_id" +
            "            LEFT JOIN orders_detail od on o.id = od.id_order " +
            "GROUP BY o.code, o.date_time, o.id ", nativeQuery = true)
    Page<IOrderProjection> getAllListOrder(Pageable pageable);

    @Query(value = "SELECT" +
            " od.id as idOrder , " +
            " o.id as id," +
            "            o.code AS code, " +
            "            MAX(app.full_name) AS fullName, " +
            "            o.date_time AS orderDate, " +
            "            CASE\n" +
            "            WHEN app.id IS NULL THEN " +
            "            sum(od.price * od.quantity) " +
            "            WHEN app.id IS NOT NULL THEN " +
            "            sum(od.price * od.quantity) END AS orderDetailPrice " +
            "             FROM " +
            "             orders o " +
            "            LEFT JOIN app_user app on app.id = o.app_user_id " +
            "            LEFT JOIN user_role ur on app.id = ur.app_user_id " +
            "            LEFT OUTER JOIN app_role ar on ar.id = ur.app_role_id " +
            "            LEFT JOIN orders_detail od on od.id_order = o.id " +
            "             where o.flag_deleted = false " +
            "             and o.date_time >= :startDateTime AND o.date_time <= :endDateTime " +
            "GROUP BY o.code, o.date_time, od.id", nativeQuery = true)
    Page<IOrderProjection> findByDateTimeRange(Pageable pageable,
                                               @Param("startDateTime") LocalDate startDateTime,
                                               @Param("endDateTime") LocalDate endDateTime);

    @Query(value = "call getCartDetailsForMail( :idOrder)",nativeQuery = true)
    List<OrderDetailProjection> findCartDetailsByOrderId(@Param("idOrder") Long idOrder);
}
