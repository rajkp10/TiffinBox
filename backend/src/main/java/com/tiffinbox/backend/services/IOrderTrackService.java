/**
 * Author: Keval Gandevia
 */

package com.tiffinbox.backend.services;

import com.tiffinbox.backend.dto.request.UpdateOrderRequest;
import com.tiffinbox.backend.dto.request.VerifyOTPRequest;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.ordertrack.GetAllAcceptedOrdersResponse;
import com.tiffinbox.backend.dto.response.ordertrack.GetOrderStatusResponse;
import jakarta.mail.MessagingException;

import java.security.Principal;
import java.time.LocalDateTime;

public interface IOrderTrackService {
    public GetAllAcceptedOrdersResponse getAllAcceptedOrders(LocalDateTime orderDate, Principal principal);

    public BasicResponse acceptOrder(String orderId);

    public BasicResponse updateStatus(UpdateOrderRequest updateOrderRequest, String orderId, Principal principal) throws MessagingException;

    public BasicResponse verifyOTP(VerifyOTPRequest verifyOTPRequest, String orderId);

    public GetOrderStatusResponse getOrderStatus(String orderId);
}
