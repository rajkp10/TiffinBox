/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

package com.tiffinbox.backend.controllers;

import com.tiffinbox.backend.dto.request.CreateOrderRequest;
import com.tiffinbox.backend.services.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequestMapping(path = "/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    private ResponseEntity<?> createOrder(@Valid @RequestBody CreateOrderRequest request, Principal principal){
        return new ResponseEntity<>(orderService.createOrder(request, principal), HttpStatus.CREATED);
    }

    @GetMapping
    private ResponseEntity<?> getOwnOrders(Principal principal){
        return new ResponseEntity<>(orderService.getOwnOrders(principal), HttpStatus.OK);
    }

    @GetMapping(path = "/{orderId}")
    private ResponseEntity<?> getOrderDetails(@PathVariable String orderId, Principal principal){
        return new ResponseEntity<>(orderService.getOrderDetails(orderId, principal), HttpStatus.OK);
    }

    @GetMapping(path = "/received")
    private ResponseEntity<?> getFoodServiceProviderOrders(@RequestParam(value = "orderDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime orderDate, Principal principal){
        return new ResponseEntity<>(orderService.getFoodServiceProviderOrders(orderDate, principal), HttpStatus.OK);
    }
}
