package ut.edu.project_java.controllers;

import ut.edu.project_java.models.Appointment;
import ut.edu.project_java.repositories.AppointmentRepository;
import ut.edu.project_java.services.AppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        if (!appointmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        appointmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Long id, @RequestBody Appointment updatedAppointment) {
        return appointmentRepository.findById(id)
            .map(existing -> {
                existing.setHoTenNguoiTiem(updatedAppointment.getHoTenNguoiTiem());
                existing.setNgaySinh(updatedAppointment.getNgaySinh());
                existing.setGioiTinh(updatedAppointment.getGioiTinh());
                existing.setDiaChi(updatedAppointment.getDiaChi());
                existing.setHoTenNguoiLienHe(updatedAppointment.getHoTenNguoiLienHe());
                existing.setMoiQuanHe(updatedAppointment.getMoiQuanHe());
                existing.setSoDienThoai(updatedAppointment.getSoDienThoai());
                existing.setLoaiVaccine(updatedAppointment.getLoaiVaccine());
                existing.setTrungTam(updatedAppointment.getTrungTam());
                existing.setNgayTiem(updatedAppointment.getNgayTiem());
                existing.setEmail(updatedAppointment.getEmail());

                appointmentRepository.save(existing);
                return ResponseEntity.ok(existing);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<?> getAppointmentsByPhone(@RequestParam("phone") String phone) {
        List<Appointment> appointments = appointmentRepository.findBySoDienThoai(phone);
        if (appointments.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy cuộc hẹn với số điện thoại: " + phone);
        }
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/search-by-email")
    public ResponseEntity<?> updateByEmail(@RequestParam String email, @RequestBody Appointment updated) {
        List<Appointment> appointments = appointmentRepository.findByEmail(email);
        if (appointments.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy cuộc hẹn với email: " + email);
        }

        Appointment appointment = appointments.get(0);
        
        // Cập nhật các thông tin
        appointment.setHoTenNguoiTiem(updated.getHoTenNguoiTiem());
        appointment.setNgaySinh(updated.getNgaySinh());
        appointment.setGioiTinh(updated.getGioiTinh());
        appointment.setDiaChi(updated.getDiaChi());
        appointment.setHoTenNguoiLienHe(updated.getHoTenNguoiLienHe());
        appointment.setMoiQuanHe(updated.getMoiQuanHe());
        appointment.setSoDienThoai(updated.getSoDienThoai());
        appointment.setLoaiVaccine(updated.getLoaiVaccine());
        appointment.setTrungTam(updated.getTrungTam());
        appointment.setNgayTiem(updated.getNgayTiem());
        appointment.setEmail(email);

        appointmentRepository.save(appointment);
        return ResponseEntity.ok(appointment);
}

}
