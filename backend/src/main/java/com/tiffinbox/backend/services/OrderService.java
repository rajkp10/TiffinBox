/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

package com.tiffinbox.backend.services;

import com.tiffinbox.backend.dto.request.CreateOrderRequest;
import com.tiffinbox.backend.dto.response.orders.GetAllOrderDetailsResponse;
import com.tiffinbox.backend.dto.response.orders.GetOrderDetailsResponse;
import com.tiffinbox.backend.models.Order;

import java.security.Principal;
import java.time.LocalDateTime;

public interface OrderService {
    Order createOrder(CreateOrderRequest request, Principal principal);
    GetAllOrderDetailsResponse getOwnOrders(Principal principal);
    GetOrderDetailsResponse getOrderDetails(String orderId, Principal principal);
    GetAllOrderDetailsResponse getFoodServiceProviderOrders(LocalDateTime orderDate, Principal principal);
}
