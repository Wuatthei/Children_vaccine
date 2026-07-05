package ut.edu.project_java;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import ut.edu.project_java.services.AuthService;

@SpringBootApplication
@EnableJpaRepositories("ut.edu.project_java.repositories") 
public class ProjectJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectJavaApplication.class, args);
    }

    CommandLineRunner testAuthService(AuthService authService) {
    return args -> {
        System.out.println("AuthService instance: " + authService);
    };
}
}
