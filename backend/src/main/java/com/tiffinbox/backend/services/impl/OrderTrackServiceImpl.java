/**
 * Author: Keval Gandevia
 */

package com.tiffinbox.backend.services.impl;

import com.tiffinbox.backend.dto.AcceptedOrderListDTO;
import com.tiffinbox.backend.dto.mappers.AcceptedOrderMapper;
import com.tiffinbox.backend.dto.request.UpdateOrderRequest;
import com.tiffinbox.backend.dto.request.VerifyOTPRequest;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.ordertrack.GetAllAcceptedOrdersResponse;
import com.tiffinbox.backend.dto.response.ordertrack.GetOrderStatusResponse;
import com.tiffinbox.backend.exceptions.NotFoundException;
import com.tiffinbox.backend.models.Order;
import com.tiffinbox.backend.models.User;
import com.tiffinbox.backend.repositories.OrderRepository;
import com.tiffinbox.backend.repositories.UserRepository;
import com.tiffinbox.backend.services.EmailService;
import com.tiffinbox.backend.services.IOrderTrackService;
import com.tiffinbox.backend.utils.EmailType;
import com.tiffinbox.backend.utils.OTPService;
import com.tiffinbox.backend.utils.OrderStatus;
import com.tiffinbox.backend.utils.ResponseMessages;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class OrderTrackServiceImpl implements IOrderTrackService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    /**
     * Retrieves all accepted orders for a given user.
     *
     * @param principal the security principal of the authenticated user
     * @return a response containing a list of accepted orders
     */
    @Override
    public GetAllAcceptedOrdersResponse getAllAcceptedOrders(LocalDateTime orderDate, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        if(orderDate == null){
            orderDate = LocalDateTime.now();
        }

        LocalDateTime startOfDay = orderDate.with(LocalTime.MIN);
        LocalDateTime endOfDay = orderDate.with(LocalTime.MAX);
        Sort sort = Sort.by(Sort.Direction.DESC, "orderDate");

        List<OrderStatus> orderStatuses = Arrays.asList(OrderStatus.ACCEPTED, OrderStatus.IN_PREPARATION, OrderStatus.DELIVERED);

        List<Order> orderList = orderRepository.findAllByUserIdAndOrderStatusInAndOrderDateBetween(user.getUserId(), orderStatuses, startOfDay, endOfDay, sort);

//        List<Order> orderList = orderRepository.findAllByFoodServiceProviderAndOrderStatusIn(user, orderStatuses);
        List<AcceptedOrderListDTO> acceptedOrderList = AcceptedOrderMapper.convertToAcceptedOrderListDTO(orderList);

        return GetAllAcceptedOrdersResponse.builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .message(ResponseMessages.GET_ALL_ACCEPTED_ORDERS)
                .acceptedOrderList(acceptedOrderList)
                .build();
    }

    @Override
    public BasicResponse acceptOrder(String orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);

        if(!orderOptional.isPresent()) {
            throw new NotFoundException(ResponseMessages.ORDER_NOT_FOUND);
        }

        Order order = orderOptional.get();

        order.setOrderStatus(OrderStatus.ACCEPTED);
        orderRepository.save(order);

        return BasicResponse.builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .message(ResponseMessages.ORDER_ACCEPTED)
                .build();
    }

    /**
     * Updates the status of an order.
     *
     * @param updateOrderRequest the request containing the new status of the order
     * @param orderId the ID of the order to update
     * @param principal the security principal of the authenticated user
     * @return a basic response indicating success or failure
     * @throws MessagingException if an error occurs while sending an email
     */
    @Override
    public BasicResponse updateStatus(UpdateOrderRequest updateOrderRequest, String orderId, Principal principal) throws MessagingException {
        User user = userRepository.findByEmail(principal.getName());
        Optional<Order> orderOptional = orderRepository.findByOrderIdAndFoodServiceProvider(orderId, user);
        if (!orderOptional.isPresent()) {
            throw new NotFoundException(ResponseMessages.ORDER_NOT_FOUND);
        }
        Order order = orderOptional.get();
        if (updateOrderRequest.getOrderStatus().equals(OrderStatus.IN_PREPARATION.name())) {
            order.setOrderStatus(OrderStatus.IN_PREPARATION);
            orderRepository.save(order);

            return BasicResponse.builder()
                    .success(true)
                    .message(ResponseMessages.UPDATE_ORDER_STATUS)
                    .timeStamp(LocalDateTime.now())
                    .build();
        } else if (updateOrderRequest.getOrderStatus().equals(OrderStatus.DELIVERED.name())) {

            String otp = OTPService.generateOTP();
            order.setOTP(otp);
            orderRepository.save(order);
            String customerEmail = order.getCustomer().getEmail();
            emailService.sendEmail(EmailType.DELIVERY_OTP, customerEmail, "Order Delivery - OTP Confirmation", "Your OTP is: ", otp);
            return BasicResponse.builder()
                    .success(true)
                    .timeStamp(LocalDateTime.now())
                    .message(ResponseMessages.OTP_SENT_VIA_EMAIL_SUCCESS)
                    .build();
        } else {
            return BasicResponse.builder()
                    .success(false)
                    .timeStamp(LocalDateTime.now())
                    .message(ResponseMessages.UPDATE_ORDER_STATUS_ERROR)
                    .build();
        }
    }

    /**
     * Verifies the OTP for a given order.
     *
     * @param verifyOTPRequest the request containing the OTP to verify
     * @param orderId the ID of the order to verify
     * @return a basic response indicating success or failure
     */
    @Override
    public BasicResponse verifyOTP(VerifyOTPRequest verifyOTPRequest, String orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);

        if (!orderOptional.isPresent()) {
            throw new NotFoundException(ResponseMessages.ORDER_NOT_FOUND);
        }

        Order order = orderOptional.get();

        if (order.getOTP().equals(verifyOTPRequest.getOtp())) {
            order.setOrderStatus(OrderStatus.DELIVERED);
            orderRepository.save(order);

            return BasicResponse.builder()
                    .success(true)
                    .timeStamp(LocalDateTime.now())
                    .message(ResponseMessages.OTP_VERIFIED)
                    .build();
        } else {
            return BasicResponse.builder()
                    .success(false)
                    .timeStamp(LocalDateTime.now())
                    .message(ResponseMessages.OTP_VERIFIED_FAILED)
                    .build();
        }
    }

    /**
     * Retrieves the status of a given order.
     *
     * @param orderId the ID of the order to retrieve the status of
     * @return a response containing the status of the order
     */
    @Override
    public GetOrderStatusResponse getOrderStatus(String orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);

        if (!orderOptional.isPresent()) {
            throw new NotFoundException(ResponseMessages.ORDER_NOT_FOUND);
        }

        Order order = orderOptional.get();

        return GetOrderStatusResponse.builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .message(ResponseMessages.ORDER_STATUS_RETRIEVED)
                .orderStatus(order.getOrderStatus())
                .build();
    }
}
