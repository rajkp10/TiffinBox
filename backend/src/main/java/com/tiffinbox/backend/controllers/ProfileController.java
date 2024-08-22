/**
 * Author: Harsh Maisuri
 */
package com.tiffinbox.backend.controllers;

import com.tiffinbox.backend.dto.request.*;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.ViewProfileResponseCustomer;
import com.tiffinbox.backend.dto.response.ViewProfileResponseSeller;
import com.tiffinbox.backend.dto.response.profile.UploadProfileImageResponse;
import com.tiffinbox.backend.services.IProfileService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
    @Autowired
    private IProfileService profileService;

    @GetMapping("/customer")
    public ResponseEntity<ViewProfileResponseCustomer> customerProfile(Principal principal){
        ViewProfileResponseCustomer response = profileService.customerProfile(principal);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping("/seller")
    public ResponseEntity<ViewProfileResponseSeller> sellerProfile(Principal principal){
        ViewProfileResponseSeller response = profileService.sellerProfile(principal);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PostMapping("/seller/editProfile")
    public ResponseEntity<BasicResponse> editSeller(Principal principal, @RequestBody EditSellerRequest signUpRequestSeller){
        BasicResponse response = profileService.editProfileSeller(principal, signUpRequestSeller);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PostMapping("/customer/editProfile")
    public ResponseEntity<BasicResponse> editCustomer(Principal principal, @RequestBody EditCustomerRequest signUpRequestCustomer){
        BasicResponse response = profileService.editProfileCustomer(principal, signUpRequestCustomer);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PostMapping("/resetPassword")
    public ResponseEntity<BasicResponse> resetPassword(Principal principal, @RequestBody ResetPasswordRequest resetPasswordRequest){
        BasicResponse response = profileService.resetPassword(principal, resetPasswordRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @SneakyThrows
    @PostMapping(path = "/uploadImg", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<UploadProfileImageResponse> editProfileImg(@ModelAttribute ImageUploadRequest image, Principal principal){
        UploadProfileImageResponse response = profileService.uploadProfilePicture(principal,image);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
