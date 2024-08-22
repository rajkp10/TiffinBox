/**
 * Author: Savan Patel
 */

/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

package com.tiffinbox.backend.services;

import com.tiffinbox.backend.dto.request.AddMealRequest;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.foodserviceprovider.DashboardResponse;
import com.tiffinbox.backend.dto.response.mealmenumanagement.GetASingleMealResponse;
import com.tiffinbox.backend.dto.response.mealmenumanagement.GetMealListResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

public interface IFoodProviderService {
    GetASingleMealResponse addMeal(Principal principal, AddMealRequest addMealRequest, MultipartFile mealImage) throws IOException;
    GetMealListResponse getAllMeals(Principal principal);
    GetASingleMealResponse getMeal(String mealId);
    GetASingleMealResponse updateMeal(String mealId, AddMealRequest addMealRequest, MultipartFile mealImage) throws IOException;
    BasicResponse deleteMeal(String mealId);
    DashboardResponse dashboardAnalytics(Principal principal);
}
