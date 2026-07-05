package ut.edu.project_java.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import ut.edu.project_java.models.User;
import ut.edu.project_java.models.Role;
import ut.edu.project_java.repositories.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@gmail.com";

            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User();
                admin.setFullName("Administrator");
                admin.setEmail(adminEmail);
                admin.setPhone("0866588900");
                admin.setPassword(passwordEncoder.encode("admin123")); // 👈 đổi mật khẩu nếu cần
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);
                System.out.println("Admin account created: " + adminEmail);
            } else {
                System.out.println("Admin account already exists.");
            }
        };
    }
}

