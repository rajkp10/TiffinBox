/**
 * Author : Kunj Hiteshkumar Pathak
 * Dalhousie Email : kn743706@dal.ca
 * Commit Email : kunjpathak1212@gmail.com
 */

package com.tiffinbox.backend.dto.response;

import com.tiffinbox.backend.utils.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class LoginResponse extends BasicResponse{
    private String firstname;
    private String lastname;
    private UserRole userRole;
    private String userId;
    private String token;
    private String refreshToken;
    private String profileImage;

}