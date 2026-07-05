package ut.edu.project_java.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ut.edu.project_java.models.Appointment;
import ut.edu.project_java.repositories.AppointmentRepository;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> findByEmail(String email) {
        return appointmentRepository.findByEmail(email);
    }
}
