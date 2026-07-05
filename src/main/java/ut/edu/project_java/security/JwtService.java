package ut.edu.project_java.security;

import org.springframework.stereotype.Service;

@Service
public class JwtService {
    public String generateToken(String username) {
        return "mock-jwt-token-for-" + username;
    }
}
