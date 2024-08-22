/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

package com.tiffinbox.backend.dto.mappers;

import com.tiffinbox.backend.dto.SubscriptionDTO;
import com.tiffinbox.backend.models.FoodServiceProvider;
import com.tiffinbox.backend.models.Meal;
import com.tiffinbox.backend.models.Subscription;
import com.tiffinbox.backend.models.User;

import java.util.ArrayList;
import java.util.List;

public class SubscriptionMapper {
    public static SubscriptionDTO convertToSubscriptionDTO(Subscription subscription) {
        Meal meal = subscription.getMeal();
        User foodServiceProviderUser = subscription.getFoodServiceProvider();
        FoodServiceProvider foodServiceProvider = foodServiceProviderUser.getFoodServiceProvider();

        return new SubscriptionDTO(
                subscription.getSubscriptionId(),
                meal.getMealId(),
                foodServiceProvider.getCompanyName(),
                foodServiceProvider.getContact(),
                foodServiceProviderUser.getEmail(),
                meal.getMealName(),
                meal.getMealImage(),
                subscription.getStartDate(),
                subscription.getEndDate()
        );
    }

    public static List<SubscriptionDTO> convertToSubscriptionDTOList(List<Subscription> subscriptionList){
        List<SubscriptionDTO> subscriptionDTOList = new ArrayList<>();
        for(Subscription subscription: subscriptionList){
            subscriptionDTOList.add(convertToSubscriptionDTO(subscription));
        }
        return subscriptionDTOList;
    }
}
