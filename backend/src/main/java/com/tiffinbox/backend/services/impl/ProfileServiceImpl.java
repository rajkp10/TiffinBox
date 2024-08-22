/**
 * Author: Harsh Maisuri
 */

package com.tiffinbox.backend.services.impl;

import com.tiffinbox.backend.dto.request.*;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.ViewProfileResponseCustomer;
import com.tiffinbox.backend.dto.response.ViewProfileResponseSeller;
import com.tiffinbox.backend.dto.response.profile.UploadProfileImageResponse;
import com.tiffinbox.backend.exceptions.ApiRequestException;
import com.tiffinbox.backend.exceptions.NotFoundException;
import com.tiffinbox.backend.models.Customer;
import com.tiffinbox.backend.models.FoodServiceProvider;
import com.tiffinbox.backend.models.User;
import com.tiffinbox.backend.repositories.CustomerRepository;
import com.tiffinbox.backend.repositories.SellerRepository;
import com.tiffinbox.backend.repositories.UserRepository;
import com.tiffinbox.backend.services.CloudinaryService;
import com.tiffinbox.backend.services.IProfileService;
import com.tiffinbox.backend.utils.ResponseMessages;
import com.tiffinbox.backend.utils.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;

@Service
public class ProfileServiceImpl implements IProfileService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CloudinaryService cloudinaryService;

    public ViewProfileResponseCustomer customerProfile(Principal principal){
        ViewProfileResponseCustomer viewProfileResponseCustomer = new ViewProfileResponseCustomer();
        Customer customer = userRepository.findByEmail(principal.getName()).getCustomer();
        if(customer==null){
          throw new NotFoundException("User not Found!");
        }

        viewProfileResponseCustomer.setProfileImage(customer.getProfileImage());
        viewProfileResponseCustomer.setFirstname(customer.getFirstName());
        viewProfileResponseCustomer.setLastname(customer.getLastName());
        viewProfileResponseCustomer.setEmail(principal.getName());
        viewProfileResponseCustomer.setCity(customer.getCity());
        viewProfileResponseCustomer.setProvince(customer.getProvince());
        viewProfileResponseCustomer.setStreetAddress(customer.getStreetAddress());
        viewProfileResponseCustomer.setPostalCode(customer.getPostalCode());
        viewProfileResponseCustomer.setContact(customer.getContactNumber());

        return viewProfileResponseCustomer;
    }

    public ViewProfileResponseSeller sellerProfile(Principal principal){
        ViewProfileResponseSeller viewProfileResponseSeller = new ViewProfileResponseSeller();
        FoodServiceProvider seller = userRepository.findByEmail(principal.getName()).getFoodServiceProvider();
        if(seller==null){
          throw new NotFoundException("Seller not Found!");
        }

        viewProfileResponseSeller.setProfileImage(seller.getProfileImage());
        viewProfileResponseSeller.setFirstname(seller.getFirstName());
        viewProfileResponseSeller.setLastname(seller.getLastName());
        viewProfileResponseSeller.setEmail(principal.getName());
        viewProfileResponseSeller.setCity(seller.getCity());
        viewProfileResponseSeller.setCompanyName(seller.getCompanyName());
        viewProfileResponseSeller.setProvince(seller.getProvince());
        viewProfileResponseSeller.setCompanyAddress(seller.getCompanyAddress());
        viewProfileResponseSeller.setCompanyZipCode(seller.getCompanyPostalCode());
        viewProfileResponseSeller.setContactNumber(seller.getContact());
        viewProfileResponseSeller.setCuisine(seller.getCuisineType());

        return viewProfileResponseSeller;
    }

    public BasicResponse editProfileCustomer (Principal principal, EditCustomerRequest signUpRequestCustomer){
        BasicResponse basicResponse =new BasicResponse();
        User user = userRepository.findByEmail(principal.getName());
        System.out.println(user);
        if (user == null){
            throw new NotFoundException("User not Found!");
        }
        Customer customer = userRepository.findByEmail(principal.getName()).getCustomer();
        if(!(user.getUserRole()==UserRole.CUSTOMER)){
            throw new ApiRequestException("User is not identified as Customer type!");
        }

        customer.setFirstName(signUpRequestCustomer.getFirstname());
        customer.setLastName(signUpRequestCustomer.getLastname());
        customer.setContactNumber(signUpRequestCustomer.getContactNumber());
        customer.setStreetAddress(signUpRequestCustomer.getStreetAddress());
        customer.setCity(signUpRequestCustomer.getCity());
        customer.setProvince(signUpRequestCustomer.getProvince());
        customer.setPostalCode(signUpRequestCustomer.getPostalCode());
        customerRepository.save(customer);
        basicResponse.setTimeStamp(LocalDateTime.now());
        basicResponse.setSuccess(true);
        basicResponse.setMessage("Hello Customer, "+customer.getFirstName()+" "+customer.getLastName()+", your profile updated");
        return basicResponse;
    }

    public BasicResponse editProfileSeller (Principal principal, EditSellerRequest signUpRequestSeller){
        BasicResponse basicResponse =new BasicResponse();
        User user = userRepository.findByEmail(principal.getName());
        if (user == null){
            throw new NotFoundException("User not Found!");
        }
        FoodServiceProvider seller = userRepository.findByEmail(principal.getName()).getFoodServiceProvider();
        if(!(user.getUserRole()==UserRole.FOOD_SERVICE_PROVIDER)){
            throw new ApiRequestException("User is not the type of the Seller!");
        }
        seller.setFirstName(signUpRequestSeller.getFirstname());
        seller.setLastName(signUpRequestSeller.getLastname());
        seller.setContact(signUpRequestSeller.getContact());
        seller.setCompanyAddress(signUpRequestSeller.getCompanyAddress());
        seller.setCompanyName(seller.getCompanyName());
        seller.setCity(signUpRequestSeller.getCity());
        seller.setProvince(signUpRequestSeller.getProvince());
        seller.setCompanyPostalCode(signUpRequestSeller.getCompanyPostalCode());
        seller.setCuisineType(signUpRequestSeller.getCuisineType());
        seller.setLicenseNumber(signUpRequestSeller.getLicenseNumber());
        sellerRepository.save(seller);
        basicResponse.setTimeStamp(LocalDateTime.now());
        basicResponse.setSuccess(true);
        basicResponse.setMessage("Hello Seller, "+seller.getFirstName()+" "+seller.getLastName()+", your profile is updated");
        return basicResponse;
    }

    public BasicResponse resetPassword(Principal principal, ResetPasswordRequest resetPasswordRequest){
        BasicResponse basicResponse = new BasicResponse();
        User user = userRepository.findByEmail(principal.getName());
        if (user == null){
            throw new NotFoundException("User not Found!");
        }
        if (!BCrypt.checkpw(resetPasswordRequest.getOldPassword(), user.getPassword())) {
            throw new ApiRequestException(ResponseMessages.PSWD_MISS_MATCH);
        }
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getNewPassword()));
        userRepository.save(user);
        basicResponse.setTimeStamp(LocalDateTime.now());
        basicResponse.setSuccess(true);
        basicResponse.setMessage("Password Reset was Successful!");
        return basicResponse;
    }

    public UploadProfileImageResponse uploadProfilePicture (Principal principal, ImageUploadRequest profileImage) throws IOException {
        UploadProfileImageResponse response = new UploadProfileImageResponse();
        User user = userRepository.findByEmail(principal.getName());

        if (user == null){
            throw new NotFoundException("User Not Logged In");
        }
        if(profileImage == null){
            throw new ApiRequestException("Please upload a valid Image"+System.lineSeparator()+"Format Supported: .jpeg, .jpg, .png");
        }
        if(user.getUserRole()==UserRole.FOOD_SERVICE_PROVIDER){
            FoodServiceProvider foodServiceProvider = user.getFoodServiceProvider();
            Map uploadedFile = cloudinaryService.upload(profileImage.getImage());
            foodServiceProvider.setProfileImage(uploadedFile.get("url").toString());
            sellerRepository.save(foodServiceProvider);
            response.setMessage("Hello Seller, "+foodServiceProvider.getFirstName()+" "+foodServiceProvider.getLastName()+", your Avatar has been successfully updated");
            response.setSuccess(true);
            response.setTimeStamp(LocalDateTime.now());
        }
        if(user.getUserRole()==UserRole.CUSTOMER){
            Customer customer = user.getCustomer();
            Map uploadedFile = cloudinaryService.upload(profileImage.getImage());
            customer.setProfileImage(uploadedFile.get("url").toString());
            customerRepository.save(customer);
            response.setMessage("Hello Customer, "+customer.getFirstName()+" "+customer.getLastName()+", your Avatar has been successfully updated");
            response.setProfileImage(uploadedFile.get("url").toString());
            response.setSuccess(true);
            response.setTimeStamp(LocalDateTime.now());
        }
        return response;
    }
}
