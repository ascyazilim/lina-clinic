package com.lina.clinic.auth.service;

import com.lina.clinic.auth.dto.LoginRequest;
import com.lina.clinic.auth.dto.LoginResponse;
import com.lina.clinic.common.security.JwtService;
import com.lina.clinic.common.security.SecurityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        String accessToken = jwtService.generateToken(securityUser);

        return new LoginResponse(
                accessToken,
                "Bearer",
                securityUser.getUsername(),
                securityUser.getFullName(),
                securityUser.getRole()
        );
    }
}
