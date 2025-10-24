package com.example.util;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;

public class JwtUtil {
    private static final long EXPIRATION = 1000 * 60 * 60; // 1小時
    private static final String SECRET = "MySecretKeyMySecretKeyMySecretKey"; // 至少32字元
     private static final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());
    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }
}
