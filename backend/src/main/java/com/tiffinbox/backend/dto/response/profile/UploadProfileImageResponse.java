/**
 * Author: Harsh Maisuri
 */
package com.tiffinbox.backend.dto.response.profile;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tiffinbox.backend.dto.response.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UploadProfileImageResponse extends BasicResponse {
    private String profileImage;
}
