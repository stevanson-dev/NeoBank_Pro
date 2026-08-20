package com.neobankpro.neobankpro.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test/protected")
    public String protectedEndpoint(Authentication authentication) {

        return "Welcome " + authentication.getName()
                + ". JWT authentication is working!";
    }
}