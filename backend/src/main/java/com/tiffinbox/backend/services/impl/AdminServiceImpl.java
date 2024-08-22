/**
 * Author: Keval Gandevia
 */

package com.tiffinbox.backend.services.impl;

import com.tiffinbox.backend.dto.AdminGetAnalysisDTO;
import com.tiffinbox.backend.dto.AdminGetSinglePendingRequestDTO;
import com.tiffinbox.backend.dto.UserFoodServiceProviderDTO;
import com.tiffinbox.backend.dto.mappers.UserPendingRequestMapper;
import com.tiffinbox.backend.dto.mappers.UserSinglePendingRequestMapper;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.admin.GetAllPendingRequestsResponse;
import com.tiffinbox.backend.dto.response.admin.GetAllUsersResponse;
import com.tiffinbox.backend.dto.response.admin.GetAnalysisResponse;
import com.tiffinbox.backend.dto.response.admin.GetSinglePendingRequestResponse;
import com.tiffinbox.backend.exceptions.NotFoundException;
import com.tiffinbox.backend.models.FoodServiceProvider;
import com.tiffinbox.backend.models.Payment;
import com.tiffinbox.backend.models.User;
import com.tiffinbox.backend.repositories.OrderRepository;
import com.tiffinbox.backend.repositories.PaymentRepository;
import com.tiffinbox.backend.repositories.SellerRepository;
import com.tiffinbox.backend.repositories.UserRepository;
import com.tiffinbox.backend.services.IAdminService;
import com.tiffinbox.backend.utils.ResponseMessages;
import com.tiffinbox.backend.utils.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminServiceImpl implements IAdminService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PaymentRepository paymentRepository;

    /**
     * Get all pending requests for food service providers.
     *
     * @return GetAllPendingRequestsResponse containing the list of all pending requests.
     */
    @Override
    public GetAllPendingRequestsResponse getAllPendingRequests() {

        List<User> userList = userRepository.findAllByIsAdminVerifiedAndUserRole(false, UserRole.FOOD_SERVICE_PROVIDER);

        List<FoodServiceProvider> foodServiceProviderList = userList.stream()
                .map(sellerRepository::findByUser)
                .toList();

        List<UserFoodServiceProviderDTO> allPendingRequests = UserPendingRequestMapper.convertToPendingRequestListDTO(userList, foodServiceProviderList);

        return GetAllPendingRequestsResponse.builder()
                .success(true)
                .message(ResponseMessages.USER_PENDING_REQUEST_RETRIVED)
                .pendingRequestList(allPendingRequests)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    /**
     * Get details of a single pending request for a food service provider.
     *
     * @param foodServiceProviderId the ID of the food service provider.
     * @return GetSinglePendingRequestResponse containing details of the pending request.
     */
    @Override
    public GetSinglePendingRequestResponse getSinglePendingRequest(String foodServiceProviderId) {

        FoodServiceProvider foodServiceProvider = sellerRepository.findSellerByFoodServiceProviderId(foodServiceProviderId);

        if (foodServiceProvider == null) {
            throw new NotFoundException(ResponseMessages.FOOD_SERVICE_PROVIDER_NOT_FOUND);
        }

        AdminGetSinglePendingRequestDTO adminGetSinglePendingRequestDTO = UserSinglePendingRequestMapper.convertToSinglePendingRequestDTO(foodServiceProvider);

        return GetSinglePendingRequestResponse.builder()
                .success(true)
                .message(ResponseMessages.USER_SINGLE_PENDING_REQUEST_RETRIEVED)
                .timeStamp(LocalDateTime.now())
                .foodServiceProviderDetails(adminGetSinglePendingRequestDTO)
                .build();
    }

    /**
     * Approve a pending request for a food service provider.
     *
     * @param email the email of the food service provider.
     * @return BasicResponse indicating the success of the operation.
     */
    @Override
    public BasicResponse approvePendingRequest(String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
        }

        user.setIsAdminVerified(true);
        userRepository.save(user);

        return BasicResponse.builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .message(ResponseMessages.APPROVE_PENDING_REQUEST)
                .build();
    }

    /**
     * Reject a pending request for a food service provider.
     *
     * @param email the email of the food service provider.
     * @return BasicResponse indicating the success of the operation.
     */
    @Override
    public BasicResponse rejectPendingRequest(String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
        }

        user.setIsAdminVerified(false);
        userRepository.save(user);

        return BasicResponse.builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .message(ResponseMessages.REJECT_PENDING_REQUEST)
                .build();
    }

    /**
     * Get all users who are verified food service providers.
     *
     * @return GetAllUsersResponse containing the list of all verified food service providers.
     */
    @Override
    public GetAllUsersResponse getAllUsers() {
        List<User> userList = userRepository.findAllByIsAdminVerifiedAndUserRole(true, UserRole.FOOD_SERVICE_PROVIDER);

        List<FoodServiceProvider> foodServiceProviderList = userList.stream()
                .map(sellerRepository::findByUser)
                .toList();

        List<UserFoodServiceProviderDTO> userFoodServiceProviderDTOList = UserPendingRequestMapper.convertToPendingRequestListDTO(userList, foodServiceProviderList);

        return GetAllUsersResponse.builder()
                .success(true)
                .message(ResponseMessages.USER_PENDING_REQUEST_RETRIVED)
                .userList(userFoodServiceProviderDTOList)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    /**
     * Remove a verified food service provider.
     *
     * @param email the email of the food service provider.
     * @return BasicResponse indicating the success of the operation.
     */
    @Override
    public BasicResponse removeUser(String email) {
        User user = userRepository.findByEmailAndIsAdminVerifiedAndUserRole(email, true, UserRole.FOOD_SERVICE_PROVIDER);

        if (user == null) {
            throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
        }

        FoodServiceProvider foodServiceProvider = sellerRepository.findByUser(user);

        if (foodServiceProvider == null) {
            throw new NotFoundException(ResponseMessages.FOOD_SERVICE_PROVIDER_NOT_FOUND);
        }

        sellerRepository.delete(foodServiceProvider);
        userRepository.delete(user);

        return BasicResponse.builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .message(ResponseMessages.REMOVE_USER_SUCCESSFUL)
                .build();
    }

    /**
     * Get analysis data including total users, total orders, and total earnings.
     *
     * @return GetAnalysisResponse containing the analysis data.
     */
    @Override
    public GetAnalysisResponse getAnalysis() {
        Long totalUsers = userRepository.countByIsAdminVerified(true);
        Long totalOrders = orderRepository.count();
        List<Payment> paymentList = paymentRepository.findAll();
        Double totalEarnings = paymentList.stream().mapToDouble(Payment::getAmount).sum();

        AdminGetAnalysisDTO adminGetAnalysisDTO = new AdminGetAnalysisDTO(totalUsers, totalOrders, totalEarnings);

        return GetAnalysisResponse.builder()
                .success(true)
                .timeStamp(LocalDateTime.now())
                .message(ResponseMessages.GET_ANALYSIS)
                .analysisDetails(adminGetAnalysisDTO)
                .build();
    }
}
