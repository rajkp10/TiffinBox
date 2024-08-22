package com.tiffinbox.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionDTO {
    private String subscriptionId;
    private String mealId;
    private String companyName;
    private String contactNumber;
    private String contactEmail;
    private String mealName;
    private String mealImage;
    @JsonFormat(pattern = "dd MMMM, yyyy")
    private LocalDateTime startDate;
    @JsonFormat(pattern = "dd MMMM, yyyy")
    private LocalDateTime endDate;
}
