package com.example.banlinhkienad.order.service;
import com.example.banlinhkienad.order.dto.IOderDto;
import com.example.banlinhkienad.order.dto.IOrderProjection;
import com.example.banlinhkienad.order.dto.OderDetailDto;
import com.example.banlinhkienad.order.dto.OrderDetailProjection;
import com.example.banlinhkienad.order.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface IOrderService {
    void createOrders(OderDetailDto oderDetailDto, String userName);
    Integer checkIdOrdersDetail(String appUserId, Long idProduct);
    Page<IOderDto> getOrders(String userName, Pageable pageable);
    List<Orders> getAllOrders(String userName);

    Page<IOrderProjection> getAllListOrder(Pageable pageable);
    Page<IOrderProjection> findByDateTimeRange(Pageable pageable,
                                               LocalDate startDateTime,
                                               LocalDate endDateTime);
    List<OrderDetailProjection> findCartDetailsForMail(Long idOrder);
}
