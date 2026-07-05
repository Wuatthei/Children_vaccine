function initDatLichPage() {
  const emailUser = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const apiBaseUrl = `http://${window.location.hostname}:8080`;
  if (emailUser && token) {
    fetch(`/api/users/email/${emailUser}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Dữ liệu người dùng:", data);
      document.getElementById('hoTenNguoiLienHe').value = data.fullName || '';
      document.getElementById('maKhachHang').value = data.id || '';
      document.getElementById('soDienThoai').value = data.phone || '';
    })
    .catch(error => {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    });
  } else {
    console.log("Chưa có token hoặc email.");
  }

  // Lắng nghe sự kiện submit form
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    // Ngừng hành động mặc định của form (submit)
    event.preventDefault();

    // Lấy từng giá trị
    const hoTenNguoiTiem = document.getElementById("hoTenNguoiTiem").value.trim();
    const ngaySinh = document.getElementById("ngaySinh").value;
    const maKhachHang = document.getElementById("maKhachHang").value.trim();
    const gioiTinh = document.querySelector('input[name="gender"]:checked')?.value || "";

    const diaChi = document.getElementById("address").value.trim();

    const hoTenNguoiLienHe = document.getElementById("hoTenNguoiLienHe").value.trim();
    const moiQuanHe = document.getElementById("moiQuanHe").value;
    const soDienThoai = document.getElementById("soDienThoai").value.trim();

    const loaiVaccine = document.querySelector('input[name="vaccineType"]:checked')?.value || "";
    const trungTam = document.getElementById("trungTam").value;
    const ngayTiem = document.getElementById("ngayTiem").value;
    const email = emailUser;
    console.log("Email:", email);

    // Kiểm tra thủ công từng trường bắt buộc
    if (
      hoTenNguoiTiem === "" || ngaySinh === "" || gioiTinh === "" || diaChi === "" ||
      maKhachHang === "" || hoTenNguoiLienHe === "" || moiQuanHe === "" || soDienThoai === "" ||
      loaiVaccine === "" || trungTam === "" || ngayTiem === "" || email === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    const thongTinDatLich = {
      hoTenNguoiTiem,
      ngaySinh,
      maKhachHang,
      gioiTinh,
      diaChi,
      hoTenNguoiLienHe,
      moiQuanHe,
      soDienThoai,
      vaccineType: document.querySelector('input[name="vaccineType"]:checked').value,
      trungTam,
      ngayTiem,
      email
    };

    // Lưu vào localStorage
    localStorage.setItem("thongTinDatLich", JSON.stringify(thongTinDatLich));

    // Nếu hợp lệ, gửi request
    fetch(`${apiBaseUrl}/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hoTenNguoiTiem,
        ngaySinh,
        maKhachHang,
        gioiTinh,
        diaChi,
        hoTenNguoiLienHe,
        moiQuanHe,
        soDienThoai,
        loaiVaccine,
        trungTam,
        ngayTiem,
        email
      }),
    })
    .then(async response => {
      if (response.ok) {
        alert("Đăng ký thành công!");
        document.querySelector("form").reset();
        window.location.href = "/pages/index_ThanhToan";
      } else {
        const errorText = await response.text();
        console.error("Lỗi từ server:", errorText);
        alert("Đăng ký thất bại. Vui lòng thử lại.");
      }
    })
    .catch(error => {
      console.error("Lỗi khi gửi request:", error);
      alert("Có lỗi xảy ra khi gửi yêu cầu.");
    });
  }
}
window.initDatLichPage = initDatLichPage;
