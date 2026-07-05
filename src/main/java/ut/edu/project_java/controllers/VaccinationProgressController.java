package ut.edu.project_java.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ut.edu.project_java.models.VaccinationProgress;
import ut.edu.project_java.repositories.VaccinationProgressRepository;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class VaccinationProgressController {

    @Autowired
    private VaccinationProgressRepository progressRepo;

    // ✅ Lấy toàn bộ quá trình tiêm cho admin
    @GetMapping("/all")
    public List<VaccinationProgress> getAllProgress() {
        return progressRepo.findAll();
    }

    // ✅ Lấy theo userId (dành cho người dùng)
    @GetMapping("/by-user/{userId}")
    public List<VaccinationProgress> getProgressByUser(@PathVariable Long userId) {
        return progressRepo.findByUserId(userId);
    }

    // ✅ Toggle trạng thái (admin cập nhật)
    @PutMapping("/{id}/toggle")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        return progressRepo.findById(id)
            .map(progress -> {
                progress.setDaTiem(!progress.getDaTiem());
                progressRepo.save(progress);
                return ResponseEntity.ok(progress);
            }).orElse(ResponseEntity.notFound().build());
    }
}
