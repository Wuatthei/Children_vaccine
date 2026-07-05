package ut.edu.project_java.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.ui.Model;
import ut.edu.project_java.models.Appointment;
import ut.edu.project_java.repositories.AppointmentRepository;


@Controller
public class AdminViewAppoitmentController {
     @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("/adminPages/admin_sualichtiem")
    public String suaLichTiem(@RequestParam("id") Long id, Model model) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch tiêm với id: " + id));
        model.addAttribute("appointment", appointment);
        return "adminPages/admin_sualichtiem";
    }
}
