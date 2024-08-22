/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

package com.tiffinbox.backend.dto.mappers;

import com.tiffinbox.backend.dto.OrdersDTO;
import com.tiffinbox.backend.dto.RevenueDTO;
import com.tiffinbox.backend.models.Order;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FoodServiceProviderDashboardMapper {
    public static List<OrdersDTO> convertToOrdersDTO(List<Order> orders){
        List<OrdersDTO> ordersDTOList = new ArrayList<>();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMMM");

        YearMonth currentMonth = YearMonth.now();
        List<Order> currentMonthOrders = getOrdersForMonth(currentMonth, orders);

        YearMonth previousMonth = currentMonth.minusMonths(1);
        List<Order> previousMonthOrders = getOrdersForMonth(previousMonth, orders);

        ordersDTOList.add(new OrdersDTO(previousMonth.format(monthFormatter), previousMonthOrders.size()));
        ordersDTOList.add(new OrdersDTO(currentMonth.format(monthFormatter), currentMonthOrders.size()));
        ordersDTOList.add(new OrdersDTO("Total", orders.size()));

        return ordersDTOList;
    }

    public static List<RevenueDTO> convertToRevenueDTO(List<Order> orders){
        List<RevenueDTO> revenueDTOList = new ArrayList<>();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMMM");
        Double previousMonthRevenue = 0D;
        Double currentMonthRevenue = 0D;
        Double totalRevenue = 0D;

        YearMonth currentMonth = YearMonth.now();
        List<Order> currentMonthOrders = getOrdersForMonth(currentMonth, orders);

        YearMonth previousMonth = currentMonth.minusMonths(1);
        List<Order> previousMonthOrders = getOrdersForMonth(previousMonth, orders);

        for(Order order: previousMonthOrders){
            previousMonthRevenue += order.getTotalAmount();
        }

        for(Order order: currentMonthOrders){
            currentMonthRevenue += order.getTotalAmount();
        }

        for(Order order: orders){
            totalRevenue += order.getTotalAmount();
        }

        revenueDTOList.add(new RevenueDTO(previousMonth.format(monthFormatter), previousMonthRevenue));
        revenueDTOList.add(new RevenueDTO(currentMonth.format(monthFormatter), currentMonthRevenue));
        revenueDTOList.add(new RevenueDTO("Total", totalRevenue));

        return revenueDTOList;
    }

    public static List<Order> getOrdersForMonth(YearMonth month, List<Order> orders){
        List<Order> monthOrders = orders.stream()
                .filter(order -> {
                    LocalDateTime date = order.getOrderDate();
                    YearMonth orderMonth = YearMonth.from(date);
                    return orderMonth.equals(month);
                })
                .collect(Collectors.toList());

        return monthOrders;
    }
}
