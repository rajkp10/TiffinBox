/**
 * Author : Kunj Hiteshkumar Pathak
 * Dalhousie Email : kn743706@dal.ca
 * Commit Email : kunjpathak1212@gmail.com
 */

package com.tiffinbox.backend.controllers;


import com.tiffinbox.backend.dto.request.*;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.LoginResponse;
import com.tiffinbox.backend.dto.response.SignUpResponse;
import com.tiffinbox.backend.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final IAuthService authService;

    @PostMapping("/customer/signUp")
    public ResponseEntity<SignUpResponse> customerRegisteration(@RequestBody @Valid  SignUpRequestCustomer signUpRequestCustomer){
        SignUpResponse response = authService.customerSignUp(signUpRequestCustomer);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PostMapping("/seller/signUp")
    public ResponseEntity<SignUpResponse> sellerRegisteration(@RequestBody @Valid SignUpRequestSeller signUpRequestSeller){
        SignUpResponse response = authService.sellerSignUp(signUpRequestSeller);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PostMapping("/logIn")
    public ResponseEntity<LoginResponse> userLogin(@RequestBody @Valid LoginRequest loginRequest){
        LoginResponse response = authService.logIn(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PostMapping("/refreshToken")
    public ResponseEntity<LoginResponse> refreshToken(@RequestBody @Valid RefreshTokenRequest refreshTokenRequest){
        LoginResponse response = authService.jwtRefreshToken(refreshTokenRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<BasicResponse> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest){
        BasicResponse response = authService.forgotPassword(forgotPasswordRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
