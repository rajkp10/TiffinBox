/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

package com.tiffinbox.backend.dto.response.orders;

import com.tiffinbox.backend.dto.OrderDetailsDTO;
import com.tiffinbox.backend.dto.response.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class GetOrderDetailsResponse extends BasicResponse {
    private OrderDetailsDTO orderDetails;
}
