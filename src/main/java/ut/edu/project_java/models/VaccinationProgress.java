package ut.edu.project_java.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class VaccinationProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tenMuiTiem;
    private LocalDate ngayTiemDuKien;
    private Boolean daTiem = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters và setters
    public Long getId() {
        return id;
    }

    public String getTenMuiTiem() {
        return tenMuiTiem;
    }

    public void setTenMuiTiem(String tenMuiTiem) {
        this.tenMuiTiem = tenMuiTiem;
    }

    public LocalDate getNgayTiemDuKien() {
        return ngayTiemDuKien;
    }

    public void setNgayTiemDuKien(LocalDate ngayTiemDuKien) {
        this.ngayTiemDuKien = ngayTiemDuKien;
    }

    public Boolean getDaTiem() {
        return daTiem;
    }

    public void setDaTiem(Boolean daTiem) {
        this.daTiem = daTiem;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
