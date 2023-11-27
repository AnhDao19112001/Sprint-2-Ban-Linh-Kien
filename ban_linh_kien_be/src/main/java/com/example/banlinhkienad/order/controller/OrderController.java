package com.example.banlinhkienad.order.controller;
import com.example.banlinhkienad.order.dto.IOderDto;
import com.example.banlinhkienad.order.dto.IOrderProjection;
import com.example.banlinhkienad.order.dto.OderDetailDto;
import com.example.banlinhkienad.order.dto.SortOrders;
import com.example.banlinhkienad.order.model.Orders;
import com.example.banlinhkienad.order.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrders(@RequestBody OderDetailDto oderDetailDto,
                                          @RequestParam String userName) {
        orderService.createOrders(oderDetailDto, userName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(@RequestParam(defaultValue = "5") Integer size,
                                       @RequestParam(defaultValue = "0") Integer page,
                                       @RequestParam String userName) {
        Pageable pageable = PageRequest.of(page, size);
        Page<IOderDto> oderDtoPage = orderService.getOrders(userName, pageable);
        return new ResponseEntity<>(oderDtoPage, HttpStatus.OK);
    }

    @GetMapping("/list-order")
    public ResponseEntity<List<Orders>> getAllOrder(@RequestParam String userName) {
        List<Orders> ordersList = orderService.getAllOrders(userName);
        return new ResponseEntity<>(ordersList, HttpStatus.OK);
    }

    @GetMapping(value = {"/list"})
    public ResponseEntity<?> getListOrders(@RequestParam(required = false, defaultValue = "0") int page,
                                           @RequestParam(required = false, defaultValue = "") String sortBy,
                                           @RequestParam(required = false, defaultValue = "") String startDateTime,
                                           @RequestParam(required = false, defaultValue = "") String endDateTime) {
        Pageable pageable = SortOrders.sortBy(sortBy, page);
        if (!startDateTime.equals("") || !endDateTime.equals("")) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            LocalDate localStartDate = LocalDate.parse(startDateTime, formatter);
            LocalDate localEndDate = LocalDate.parse(endDateTime, formatter);
            Page<IOrderProjection> orderProjections = orderService.findByDateTimeRange(pageable, localStartDate, localEndDate);
            return new ResponseEntity<>(orderProjections, HttpStatus.OK);
        } else {
            Page<IOrderProjection> orderProjections = orderService.getAllListOrder(pageable);
            return new ResponseEntity<>(orderProjections, HttpStatus.OK);
        }
    }

    @GetMapping("/get-order-detail")
    public ResponseEntity<?> getOrderDetail(@RequestParam("idOrder") Long idOrder) {
        return new ResponseEntity<>(orderService.findCartDetailsForMail(idOrder),HttpStatus.OK);
    }
}
