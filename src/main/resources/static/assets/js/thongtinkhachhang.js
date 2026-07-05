function initThongTinKhachHangPage() {
    const emailUser = localStorage.getItem("email");
    const token = localStorage.getItem("token");
  
    const form = document.querySelector("form");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
  
    if (!form || !editBtn || !saveBtn) {
      console.warn("Không tìm thấy form hoặc các nút. Đảm bảo DOM đã được load đúng.");
      return;
    }
  
    // Gắn sự kiện cho nút
    editBtn.addEventListener("click", editInfor);
    saveBtn.addEventListener("click", saveInfor);
  
    if (emailUser && token) {
      fetch(`/api/users/email/${emailUser}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Dữ liệu người dùng:", data);
  
          // Load dữ liệu cuộc hẹn
          fetch(`/api/appointments/search?phone=${encodeURIComponent(data.phone)}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((appointments) => {
              console.log("Dữ liệu cuộc hẹn:", appointments);
              if (appointments.length > 0) {
                const appointment = appointments[0];
                document.getElementById("fullname").value = appointment.hoTenNguoiTiem || "";
                document.getElementById("dob").value = appointment.ngaySinh || "";
                document.getElementById("gender").value = appointment.gioiTinh || "";
                document.getElementById("address").value = appointment.diaChi || "";
                document.getElementById("relation").value = appointment.moiQuanHe || "";
              } else {
                console.log("Không tìm thấy cuộc hẹn.");
              }
            })
            .catch((error) => {
              console.error("Lỗi khi lấy dữ liệu cuộc hẹn:", error);
            });
  
          // Đổ dữ liệu người dùng vào form
          document.getElementById("maKhachHang").value = data.id || "";
          document.getElementById("guardianName").value = data.fullName || "";
          document.getElementById("phone").value = data.phone || "";
          document.getElementById("email").value = data.email || "";
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        });
    } else {
      console.log("Chưa có token hoặc email.");
    }
  
    function editInfor() {
      console.log("Edit button clicked");
  
      const inputs = form.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        if (input.tagName === "SELECT" || input.tagName === "TEXTAREA") {
          input.removeAttribute("disabled");
        } else {
          input.removeAttribute("readonly");
        }
      });
  
      editBtn.classList.add("d-none");
      saveBtn.classList.remove("d-none");
    }
  
    function saveInfor() {
      const token = localStorage.getItem("token");
      const emailUser = localStorage.getItem("email");
      const maKhachHang = document.getElementById("maKhachHang").value;
      const phone = document.getElementById("phone").value;
  
      fetch(`/api/appointments/search?phone=${encodeURIComponent(phone)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((appointments) => {
          if (appointments.length === 0) {
            alert("Không tìm thấy cuộc hẹn để cập nhật.");
            return;
          }
  
          const appointment = appointments[0];
  
          const updatedAppointment = {
            id: appointment.id,
            hoTenNguoiTiem: document.getElementById("fullname").value,
            ngaySinh: document.getElementById("dob").value,
            maKhachHang: maKhachHang,
            gioiTinh: document.getElementById("gender").value,
            diaChi: document.getElementById("address").value,
            hoTenNguoiLienHe: document.getElementById("guardianName").value,
            moiQuanHe: document.getElementById("relation").value,
            soDienThoai: phone,
            loaiVaccine: appointment.loaiVaccine,
            trungTam: appointment.trungTam,
            ngayTiem: appointment.ngayTiem,
            email: emailUser,
          };
  
          console.log("Dữ liệu gửi PUT:", updatedAppointment);
  
          return fetch(`/api/appointments/search-by-email?email=${encodeURIComponent(emailUser)}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedAppointment),
          });
        })
        .then((response) => {
          if (!response || !response.ok) {
            throw new Error("Lỗi khi gửi PUT cập nhật");
          }
          return response.json();
        })
        .then((data) => {
          alert("Cập nhật thông tin thành công!");
  
          const inputs = form.querySelectorAll("input, select, textarea");
          inputs.forEach((input) => {
            if (input.tagName === "SELECT" || input.tagName === "TEXTAREA") {
              input.setAttribute("disabled", true);
            } else {
              input.setAttribute("readonly", true);
            }
          });
  
          editBtn.classList.remove("d-none");
          saveBtn.classList.add("d-none");
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật thông tin:", error);
          alert("Có lỗi xảy ra khi cập nhật thông tin.");
        });
    }
  }
  
  // Gắn vào window để gọi được từ HTML
  window.initThongTinKhachHangPage = initThongTinKhachHangPage;
  