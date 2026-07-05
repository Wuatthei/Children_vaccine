function loadLichTiemTable() {
  const apiBaseUrl = `http://${window.location.hostname}:8080`;
  fetch(`${apiBaseUrl}/api/appointments`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Dữ liệu lịch tiêm:", data);

      const tbody = document.getElementById("lichTiemBody");
      if (!tbody) {
        console.error("Không tìm thấy tbody");
        return;
      }

      tbody.innerHTML = "";

      data.forEach((item) => {
        const row = `
            <tr>
              <td>${item.id}</td>
              <td>${item.hoTenNguoiTiem}</td>
              <td>${item.ngaySinh}</td>
              <td>${item.gioiTinh}</td>
              <td>${item.diaChi}</td>
              <td>${item.hoTenNguoiLienHe}</td>
              <td>${item.moiQuanHe}</td>
              <td>${item.soDienThoai}</td>
              <td>${item.loaiVaccine}</td>
              <td>${item.ngayTiem}</td>
              <td>
                <button onclick="suaLichTiem(${item.id})">Sửa</button>
                
              </td>
            </tr>
          `;
        tbody.insertAdjacentHTML("beforeend", row);
      });
    })
    .catch((err) => {
      console.error("Lỗi khi tải lịch tiêm:", err);
    });
}

function suaLichTiem(id) {
  window.location.href = `adminPages/admin_sualichtiem?id=${id}`;
}

loadLichTiemTable();
setInterval(loadLichTiemTable, 100000);
