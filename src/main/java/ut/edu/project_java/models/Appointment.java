package ut.edu.project_java.models;

import jakarta.persistence.*;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hoTenNguoiTiem;
    private String ngaySinh;
    private String maKhachHang;
    private String gioiTinh;

    private String diaChi;
    private String hoTenNguoiLienHe;
    private String moiQuanHe;
    private String soDienThoai;

    private String loaiVaccine;
    private String trungTam;
    private String ngayTiem;
    private String email; 

    // Getters + Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getHoTenNguoiTiem() { return hoTenNguoiTiem; }
    public void setHoTenNguoiTiem(String hoTenNguoiTiem) { this.hoTenNguoiTiem = hoTenNguoiTiem; }

    public String getNgaySinh() { return ngaySinh; }
    public void setNgaySinh(String ngaySinh) { this.ngaySinh = ngaySinh; }

    public String getMaKhachHang() { return maKhachHang; }
    public void setMaKhachHang(String maKhachHang) { this.maKhachHang = maKhachHang; }

    public String getGioiTinh() { return gioiTinh; }
    public void setGioiTinh(String gioiTinh) { this.gioiTinh = gioiTinh; }

    public String getDiaChi() { return diaChi; }
    public void setDiaChi(String diaChi) { this.diaChi = diaChi; }

    public String getHoTenNguoiLienHe() { return hoTenNguoiLienHe; }
    public void setHoTenNguoiLienHe(String hoTenNguoiLienHe) { this.hoTenNguoiLienHe = hoTenNguoiLienHe; }

    public String getMoiQuanHe() { return moiQuanHe; }
    public void setMoiQuanHe(String moiQuanHe) { this.moiQuanHe = moiQuanHe; }

    public String getSoDienThoai() { return soDienThoai; }
    public void setSoDienThoai(String soDienThoai) { this.soDienThoai = soDienThoai; }

    public String getLoaiVaccine() { return loaiVaccine; }
    public void setLoaiVaccine(String loaiVaccine) { this.loaiVaccine = loaiVaccine; }

    public String getTrungTam() { return trungTam; }
    public void setTrungTam(String trungTam) { this.trungTam = trungTam; }

    public String getNgayTiem() { return ngayTiem; }
    public void setNgayTiem(String ngayTiem) { this.ngayTiem = ngayTiem; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}