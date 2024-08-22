/**
 * Author: Harsh Maisuri
 */
package com.tiffinbox.backend.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImageUploadRequest {
    MultipartFile image;
}
