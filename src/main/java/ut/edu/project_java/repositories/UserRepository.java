package ut.edu.project_java.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.project_java.models.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
