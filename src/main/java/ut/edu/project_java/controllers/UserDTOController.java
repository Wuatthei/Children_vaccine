package ut.edu.project_java.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ut.edu.project_java.models.User;
import ut.edu.project_java.models.UserDTO;
import ut.edu.project_java.repositories.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserDTOController {

    @Autowired
    private UserRepository userRepository;

    // API: /api/users/email/{email}
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = optionalUser.get();
        UserDTO userDTO = new UserDTO(user.getId(), user.getFullName(), user.getEmail(), user.getPhone());

        return ResponseEntity.ok(userDTO);
    }
}
