package com.tiffinbox.backend.dto.response.foodserviceprovider;

import com.tiffinbox.backend.dto.OrdersDTO;
import com.tiffinbox.backend.dto.RevenueDTO;
import com.tiffinbox.backend.dto.response.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class DashboardResponse extends BasicResponse {
    private List<OrdersDTO> ordersAnalysis;
    private List<RevenueDTO> revenueAnalysis;
    private String mostOrderedMeal;
    private Double averageRating;
}
