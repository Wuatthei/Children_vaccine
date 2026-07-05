package ut.edu.project_java.dtos;

public class AuthResponse {
    private String token;
    private String message;
    private String email;
    private LoginResponse user;

    // Default constructor
    public AuthResponse() {
    }

    // Constructor với 3 tham số
    public AuthResponse(String token, String message, String email, LoginResponse user) {
        this.token = token;
        this.message = message;
        this.email = email;
        this.user = user;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LoginResponse getUser() {
        return user;
    }

    public void setUser(LoginResponse user) {
        this.user = user;
    }
}