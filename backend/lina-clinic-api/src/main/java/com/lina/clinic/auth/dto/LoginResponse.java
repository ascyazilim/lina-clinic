package com.lina.clinic.auth.dto;

import com.lina.clinic.auth.enums.UserRole;

public record LoginResponse(
        String accessToken,
        String tokenType,
        String username,
        String fullName,
        UserRole role
) {
}
