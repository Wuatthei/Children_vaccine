package ut.edu.project_java.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "support_requests")
public class SupportRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String chude;
    private String douutien;
    private String tepdinhkem;
    private String tieude;

    @Column(columnDefinition = "TEXT")
    private String chitiet;

    @CreationTimestamp
    private LocalDateTime createdAt;
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getChude() { return chude; }
    public void setChude(String chude) { this.chude = chude; }

    public String getDouutien() { return douutien; }
    public void setDouutien(String douutien) { this.douutien = douutien; }

    public String getTepdinhkem() { return tepdinhkem; }
    public void setTepdinhkem(String tepdinhkem) { this.tepdinhkem = tepdinhkem; }

    public String getTieude() { return tieude; }
    public void setTieude(String tieude) { this.tieude = tieude; }

    public String getChitiet() { return chitiet; }
    public void setChitiet(String chitiet) { this.chitiet = chitiet; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
