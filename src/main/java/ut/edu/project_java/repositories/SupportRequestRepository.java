package ut.edu.project_java.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.project_java.models.SupportRequest;

public interface SupportRequestRepository extends JpaRepository<SupportRequest, Long> {
}

