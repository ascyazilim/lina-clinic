package com.lina.clinic.common.security;

import com.lina.clinic.auth.entity.User;
import com.lina.clinic.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameAndActiveTrue(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new SecurityUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getFullName(),
                user.getRole(),
                Boolean.TRUE.equals(user.getActive())
        );
    }

    public SecurityUser getActiveSecurityUser(String username) {
        return (SecurityUser) loadUserByUsername(username);
    }
}
