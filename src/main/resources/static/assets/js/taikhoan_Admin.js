function loadTaiKhoanTable() {
    fetch("http://localhost:8080/api/users")
      .then(res => res.json())
      .then(dataAccount => {
        console.log("Dữ liệu lịch tiêm:", dataAccount);
  
        const tbody = document.getElementById("taiKhoanBody");
        if (!tbody) {
          console.error("Không tìm thấy tbody");
          return;
        }
  
        tbody.innerHTML = "";
  
        dataAccount.forEach(item => {
          const row = `
            <tr>
              <td>${item.id}</td>
              <td>${item.fullName}</td>
              <td>${item.email}</td>
              <td>${item.phone}</td>
              <td>
                <button onclick="xoaLichTiem(${item.id})">Xóa</button>
              </td>
            </tr>
          `;
          tbody.insertAdjacentHTML("beforeend", row);
        });
      })
      .catch(err => {
        console.error("Lỗi khi tải lịch tiêm:", err);
      });
  }
  function xoaLichTiem(id) {
    if (confirm("Bạn có chắc muốn xóa lịch tiêm này không?")) {
      fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE"
      })
      .then(res => {
        if (res.ok) {
          alert("Xóa thành công!");
          loadLichTiemTable(); // Load lại bảng
        } else {
          alert("Xóa thất bại.");
        }
      })
      .catch(err => {
        console.error("Lỗi khi xóa lịch tiêm:", err);
      });
    }
  }


  loadTaiKhoanTable();