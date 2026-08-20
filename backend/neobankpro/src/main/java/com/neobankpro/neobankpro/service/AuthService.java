        package com.neobankpro.neobankpro.service;

        import com.neobankpro.neobankpro.dto.ChangePasswordRequest;
        import com.neobankpro.neobankpro.dto.LoginRequest;
        import com.neobankpro.neobankpro.dto.LoginResponse;
        import com.neobankpro.neobankpro.dto.RegisterRequest;
        import com.neobankpro.neobankpro.dto.UpdateProfileRequest;
        import com.neobankpro.neobankpro.entity.User;
        import com.neobankpro.neobankpro.exception.DuplicateResourceException;
        import com.neobankpro.neobankpro.repository.UserRepository;

        import org.springframework.security.crypto.password.PasswordEncoder;
        import org.springframework.stereotype.Service;

        @Service
        public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        public AuthService(
                UserRepository userRepository,
                PasswordEncoder passwordEncoder,
                JwtService jwtService) {

                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtService = jwtService;
        }

        // REGISTER
        public User register(RegisterRequest request) {

                if (userRepository.existsByEmail(request.getEmail())) {
                throw new DuplicateResourceException(
                        "Email already registered"
                );
                }

                if (userRepository.existsByMobile(request.getMobile())) {
                throw new DuplicateResourceException(
                        "Mobile number already registered"
                );
                }

                String hashedPassword =
                        passwordEncoder.encode(request.getPassword());

                User user = new User(
                        request.getFullName(),
                        request.getEmail(),
                        request.getMobile(),
                        hashedPassword
                );

                return userRepository.save(user);
        }

        // LOGIN
        public LoginResponse login(LoginRequest request) {

                User user = userRepository.findByEmail(request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                ));

                if (!passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword())) {

                throw new RuntimeException(
                        "Invalid email or password"
                );
                }

                String token =
                        jwtService.generateToken(user.getEmail());

                return new LoginResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        token
                );
        }

        // GET CURRENT USER
        public User getCurrentUser(String email) {

                return userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));
        }

        // UPDATE PROFILE
        public User updateProfile(
                String currentEmail,
                UpdateProfileRequest request) {

                User user = userRepository.findByEmail(currentEmail)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

                if (!user.getEmail().equals(request.getEmail())
                        && userRepository.existsByEmail(
                                request.getEmail())) {

                throw new DuplicateResourceException(
                        "Email already registered"
                );
                }

                if (!user.getMobile().equals(request.getMobile())
                        && userRepository.existsByMobile(
                                request.getMobile())) {

                throw new DuplicateResourceException(
                        "Mobile number already registered"
                );
                }

                user.setFullName(request.getFullName());
                user.setEmail(request.getEmail());
                user.setMobile(request.getMobile());

                return userRepository.save(user);
        }

        // CHANGE PASSWORD
        public void changePassword(
                String email,
                ChangePasswordRequest request) {

                User user = userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

                // Check current password
                boolean currentPasswordCorrect =
                        passwordEncoder.matches(
                                request.getCurrentPassword(),
                                user.getPassword()
                        );

                if (!currentPasswordCorrect) {

                throw new RuntimeException(
                        "Current password is incorrect"
                );
                }

                // New password cannot be same as current password
                boolean samePassword =
                        passwordEncoder.matches(
                                request.getNewPassword(),
                                user.getPassword()
                        );

                if (samePassword) {

                throw new RuntimeException(
                        "New password must be different from current password"
                );
                }

                // Encode new password
                String hashedPassword =
                        passwordEncoder.encode(
                                request.getNewPassword()
                        );

                user.setPassword(hashedPassword);

                userRepository.save(user);
        }
        }