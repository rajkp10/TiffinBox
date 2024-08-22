/**
 * Author : Kunj Hiteshkumar Pathak
 * Dalhousie Email : kn743706@dal.ca
 * Commit Email : kunjpathak1212@gmail.com
 */

package com.tiffinbox.backend.repositories;

import com.tiffinbox.backend.models.TempPasswordRegistry;
import com.tiffinbox.backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TempPasswordRepository extends MongoRepository<TempPasswordRegistry,String> {
    User findByUser(String userId);
    TempPasswordRegistry findByTempPswdId(String tempPswdId);
}
