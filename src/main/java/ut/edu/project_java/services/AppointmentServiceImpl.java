// package ut.edu.project_java.services;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import ut.edu.project_java.repositories.AppointmentRepository;  // Sửa lại import repository chính xác
// import ut.edu.project_java.models.Appointment;

// @Service
// public class AppointmentServiceImpl implements AppointmentService {

//     // Inject AppointmentRepository vào service
//     @Autowired
//     private AppointmentRepository appointmentRepository;

//     @Override
//     public Appointment getAppointmentDetails(Long appointmentId) {
//         // Trả về cuộc hẹn theo ID nếu có, nếu không trả về null
//         return appointmentRepository.findById(appointmentId).orElse(null);
//     }

//     @Override
//     public List<Appointment> getAllAppointments() {
//         // Trả về danh sách tất cả các cuộc hẹn
//         return appointmentRepository.findAll();
//     }
// }
