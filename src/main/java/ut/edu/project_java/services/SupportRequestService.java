package ut.edu.project_java.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ut.edu.project_java.models.SupportRequest;
import ut.edu.project_java.repositories.SupportRequestRepository;

import java.util.Optional;

// Interface
public interface SupportRequestService {
    Long createSupport(SupportRequest request);
    Optional<SupportRequest> getSupportById(Long id);
}

// Implementation
@Service
class SupportRequestServiceImpl implements SupportRequestService {

    @Autowired
    private SupportRequestRepository repository;

    @Override
    public Long createSupport(SupportRequest request) {
        SupportRequest saved = repository.save(request);
        return saved.getId();
    }

    @Override
    public Optional<SupportRequest> getSupportById(Long id) {
        return repository.findById(id);
    }
}
