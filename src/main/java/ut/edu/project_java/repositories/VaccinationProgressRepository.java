package ut.edu.project_java.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ut.edu.project_java.models.VaccinationProgress;

import java.util.List;

public interface VaccinationProgressRepository extends JpaRepository<VaccinationProgress, Long> {
    List<VaccinationProgress> findByUserId(Long userId);
}
