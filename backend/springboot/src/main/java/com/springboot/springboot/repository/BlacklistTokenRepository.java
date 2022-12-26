package com.springboot.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.springboot.model.BlacklistToken;

public interface BlacklistTokenRepository extends JpaRepository<BlacklistToken, Long> {

    @Query(value = "SELECT COUNT(*) FROM blacklist_token WHERE token = :token", nativeQuery = true)
    Integer TokenExist(@Param("token") String token);
}