/**
 * Author: Savan Patel
 */

/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

package com.tiffinbox.backend.services.impl;

import com.tiffinbox.backend.dto.MealResponseDTO;
import com.tiffinbox.backend.dto.OrdersDTO;
import com.tiffinbox.backend.dto.RevenueDTO;
import com.tiffinbox.backend.dto.mappers.FoodServiceProviderDashboardMapper;
import com.tiffinbox.backend.dto.request.AddMealRequest;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.foodserviceprovider.DashboardResponse;
import com.tiffinbox.backend.dto.response.mealmenumanagement.GetASingleMealResponse;
import com.tiffinbox.backend.dto.response.mealmenumanagement.GetMealListResponse;
import com.tiffinbox.backend.exceptions.NotFoundException;
import com.tiffinbox.backend.models.Meal;
import com.tiffinbox.backend.models.Order;
import com.tiffinbox.backend.models.Review;
import com.tiffinbox.backend.models.User;
import com.tiffinbox.backend.repositories.MealRepository;
import com.tiffinbox.backend.repositories.OrderRepository;
import com.tiffinbox.backend.repositories.ReviewRepository;
import com.tiffinbox.backend.repositories.UserRepository;
import com.tiffinbox.backend.services.CloudinaryService;
import com.tiffinbox.backend.services.IFoodProviderService;
import com.tiffinbox.backend.utils.ResponseMessages;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FoodProviderServiceImpl implements IFoodProviderService {
    private final UserRepository userRepository;
    private final MealRepository mealRepository;
    private final OrderRepository orderRepository;
    private final ReviewRepository reviewRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public GetASingleMealResponse  addMeal(Principal principal, AddMealRequest addMealRequest, MultipartFile mealImage) throws IOException {
        User user = userRepository.findByEmail(principal.getName());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        String imageUrl = (String)cloudinaryService.upload(mealImage).get("url");
        Meal meal = new Meal();
        meal.setMealName(addMealRequest.getMealName());
        meal.setMealDescription(addMealRequest.getMealDescription());
        meal.setMealImage(imageUrl);
        meal.setCuisineType(addMealRequest.getCuisineType());
        meal.setMealType(addMealRequest.getMealType());
        meal.setMealPrice(addMealRequest.getMealPrice());
        meal.setUser(user);

        mealRepository.save(meal);

        MealResponseDTO mealResponseDTO = convertToMealResponse(meal);

        return GetASingleMealResponse.builder()
                .success(true)
                .message(ResponseMessages.MEAL_ADD_SUCCESSFUL)
                .timeStamp(LocalDateTime.now())
                .mealResponse(mealResponseDTO)
                .build();
    }

    @Override
    public GetMealListResponse getAllMeals(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());

        if (user == null) {
            throw new NotFoundException(ResponseMessages.FOOD_SERVICE_PROVIDER_NOT_FOUND);
        }

        List<MealResponseDTO> getMealListResponse = mealRepository
                                .findByUser(user)
                .stream().map(this::convertToMealResponse)
                .toList();

        return GetMealListResponse.builder()
                .success(true)
                .message(ResponseMessages.MEALS_RETRIEVED_SUCCESSFUL)
                .timeStamp(LocalDateTime.now())
                .mealResponseList(getMealListResponse)
                .build();
    }

    @Override
    public GetASingleMealResponse getMeal(String mealId) {
        MealResponseDTO mealResponseDTO = mealRepository.findById(mealId)
                .map(this::convertToMealResponse)
                .orElse(null);

        return GetASingleMealResponse.builder()
                .success(true)
                .message(ResponseMessages.MEAL_RETRIEVED_SUCCESSFUL)
                .timeStamp(LocalDateTime.now())
                .mealResponse(mealResponseDTO)
                .build();
    }

    @Override
    public GetASingleMealResponse updateMeal(String mealId, AddMealRequest addMealRequest,MultipartFile mealImage) throws IOException {
        Meal meal = mealRepository.findById(mealId).orElse(null);
        if (meal == null) {
            System.out.println("Meal not found");
            throw new NotFoundException(ResponseMessages.MEAL_NOT_FOUND);
        }

        if(mealImage != null && !mealImage.isEmpty()) {
            String imageUrl = (String) cloudinaryService.upload(mealImage).get("url");
            meal.setMealImage(imageUrl);
        }
        meal.setMealName(addMealRequest.getMealName());
        meal.setMealDescription(addMealRequest.getMealDescription());
        meal.setCuisineType(addMealRequest.getCuisineType());
        meal.setMealType(addMealRequest.getMealType());
        meal.setMealPrice(addMealRequest.getMealPrice());

        mealRepository.save(meal);

        MealResponseDTO mealResponseDTO = convertToMealResponse(meal);

        return GetASingleMealResponse.builder()
                .success(true)
                .message(ResponseMessages.MEAL_UPDATE_SUCCESSFUL)
                .timeStamp(LocalDateTime.now())
                .mealResponse(mealResponseDTO)
                .build();
    }

    @Override
    public BasicResponse deleteMeal(String mealId) {
        Meal meal = mealRepository.findById(mealId).orElse(null);

        if (meal == null) {
            throw new RuntimeException("Meal not found");
        }

        mealRepository.delete(meal);

        return BasicResponse.builder()
                .success(true)
                .message(ResponseMessages.MEAL_DELETE_SUCCESSFUL)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    private MealResponseDTO convertToMealResponse(Meal meal) {
        MealResponseDTO response = new MealResponseDTO();
        response.setMealId(meal.getMealId());
        response.setMealName(meal.getMealName());
        response.setMealImage(meal.getMealImage());
        response.setMealDescription(meal.getMealDescription());
        response.setMealType(meal.getMealType());
        response.setCuisineType(meal.getCuisineType());
        response.setMealPrice(meal.getMealPrice());
        if (meal.getUser() != null) {
            response.setFoodProviderEmail(meal.getUser().getEmail());
        }
        return response;
    }

    @Override
    public DashboardResponse dashboardAnalytics(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());

        if(user == null){
            throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
        }

        List<Review> reviews = reviewRepository.findAllByFoodServiceProvider(user.getFoodServiceProvider());

        OptionalDouble averageRating = reviews.stream()
                .mapToDouble(Review::getReviewStars)
                .average();

        if(averageRating.isEmpty()){
            averageRating = OptionalDouble.of(0D);
        }

        List<Order> orders = orderRepository.findAllByFoodServiceProvider(user);
        Map<String, Integer> mealCountMap = new HashMap<>();

        for (Order order : orders) {
            if (order.getMeal() != null && order.getMeal().getMealId() != null) {
                String mealId = order.getMeal().getMealId();
                mealCountMap.put(mealId, mealCountMap.getOrDefault(mealId, 0) + 1);
            }
        }

        String mostOrderedMealId = mealCountMap.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        Optional<Meal> mostOrderedMeal =  mealRepository.findById(mostOrderedMealId);

        String mealName = "";
        if(mostOrderedMeal.isEmpty()){
            mealName = "None";
        }else{
            mealName = mostOrderedMeal.get().getMealName();
        }

        List<OrdersDTO> ordersDTOList = FoodServiceProviderDashboardMapper.convertToOrdersDTO(orders);
        List<RevenueDTO> revenueDTOList = FoodServiceProviderDashboardMapper.convertToRevenueDTO(orders);


        return DashboardResponse.builder()
                .success(true)
                .message(ResponseMessages.DASHBOARD_ANALYTICS_FETCHED)
                .ordersAnalysis(ordersDTOList)
                .revenueAnalysis(revenueDTOList)
                .mostOrderedMeal(mealName)
                .averageRating(averageRating.getAsDouble())
                .timeStamp(LocalDateTime.now())
                .build();
    }
}
