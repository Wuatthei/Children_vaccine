package ut.edu.project_java.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ut.edu.project_java.services.AuthService;
import ut.edu.project_java.dtos.AuthResponse;
import ut.edu.project_java.dtos.RegisterRequest;
import ut.edu.project_java.dtos.LoginRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend khác domain nếu cần
public class AuthController {

    private final AuthService authService;

    // ✅ Constructor để Spring tự inject AuthService
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // API Đăng ký
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            System.out.println("✅ Register successful: " + response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, e.getMessage(), null, null));
        }
    }

    // API Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            System.out.println("✅ Login successful: " + response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, e.getMessage(), null, null));
        }
    }
}
