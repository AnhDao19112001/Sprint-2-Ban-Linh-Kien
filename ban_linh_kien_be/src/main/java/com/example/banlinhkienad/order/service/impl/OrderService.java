package com.example.banlinhkienad.order.service.impl;
import com.example.banlinhkienad.order.dto.*;
import com.example.banlinhkienad.order.model.Orders;
import com.example.banlinhkienad.order.repository.ICartDetailRepository;
import com.example.banlinhkienad.order.repository.IOrderRepository;
import com.example.banlinhkienad.order.service.IOrderService;
import com.example.banlinhkienad.product.model.Product;
import com.example.banlinhkienad.product.repository.IProductRepository;
import com.example.banlinhkienad.user.model.AppUser;
import com.example.banlinhkienad.user.repository.IAppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private ICartDetailRepository cartDetailRepository;
    @Autowired
    private IAppUserRepository appUserRepository;
    @Override
    public void createOrders(OderDetailDto oderDetailDto, String userName) {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String formattedDate = currentDate.format(formatter);
        AppUser appUser = appUserRepository.findAppUserByName(userName);
        orderRepository.createOrders(formattedDate,appUser.getId());
        Long isOrders = orderRepository.getIdMaxOrder();
        List<Product> products = productRepository.findAll();
        for (CartDetailDto o: oderDetailDto.getCartDetailDtoList()) {
            cartDetailRepository.deletedCart(o.getIdProduct(), appUser.getId());
            orderRepository.createOderDetail(o.getPrice(),isOrders,o.getQuantity(),o.getIdProduct());
            for (Product p: products) {
                if (Objects.equals(p.getIdProduct(), o.getIdProduct())){
                    orderRepository.updateProduct(p.getQuantity() - o.getQuantity(), o.getIdProduct());
                }
            }
        }
    }

    @Override
    public Integer checkIdOrdersDetail(String appUserId, Long idProduct) {
        AppUser appUser = appUserRepository.findAppUserByName(appUserId);
        return orderRepository.checkOrderDetail(appUser.getId(), idProduct);
    }

    @Override
    public Page<IOderDto> getOrders(String userName, Pageable pageable) {
        AppUser appUser = appUserRepository.findAppUserByName(userName);
        Page<IOderDto> oderDtos = orderRepository.getOrderDto(appUser.getId(), pageable);
        return oderDtos;
    }

    @Override
    public List<Orders> getAllOrders(String userName) {
        AppUser appUser = appUserRepository.findAppUserByName(userName);
        return orderRepository.listOrders(appUser.getId());
    }

    @Override
    public Page<IOrderProjection> getAllListOrder(Pageable pageable) {
        return orderRepository.getAllListOrder(pageable);
    }

    @Override
    public Page<IOrderProjection> findByDateTimeRange(Pageable pageable, LocalDate startDateTime, LocalDate endDateTime) {
        return orderRepository.findByDateTimeRange(pageable, startDateTime, endDateTime);
    }

    @Override
    public List<OrderDetailProjection> findCartDetailsForMail(Long idOrder) {
        return orderRepository.findCartDetailsByOrderId(idOrder);
    }

}
