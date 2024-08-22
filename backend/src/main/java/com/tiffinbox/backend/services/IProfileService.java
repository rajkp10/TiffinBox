/**
 * Author: Harsh Maisuri
 */

package com.tiffinbox.backend.services;

import com.tiffinbox.backend.dto.request.*;
import com.tiffinbox.backend.dto.response.BasicResponse;
import com.tiffinbox.backend.dto.response.ViewProfileResponseCustomer;
import com.tiffinbox.backend.dto.response.ViewProfileResponseSeller;
import com.tiffinbox.backend.dto.response.profile.UploadProfileImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

public interface IProfileService {
    ViewProfileResponseCustomer customerProfile(Principal principal);
    ViewProfileResponseSeller sellerProfile(Principal principal);
    BasicResponse editProfileSeller (Principal principal, EditSellerRequest signUpRequestSeller);
    BasicResponse editProfileCustomer (Principal principal, EditCustomerRequest signUpRequestCustomer);
    BasicResponse resetPassword(Principal principal, ResetPasswordRequest resetPasswordRequest);
    UploadProfileImageResponse uploadProfilePicture (Principal principal, ImageUploadRequest imageUploadRequest) throws IOException;

}
