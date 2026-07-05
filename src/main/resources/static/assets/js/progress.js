function initProgressPage() {
  console.log("progress.js đã chạy!");
  const emailUser2 = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (emailUser2 && token) {
    fetch(`/api/users/email/${emailUser2}`, {
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
              document.getElementById("username").textContent = appointment.hoTenNguoiTiem || "";
              localStorage.setItem("currentUserName", appointment.hoTenNguoiTiem);
            } else {
              console.log("Không tìm thấy cuộc hẹn.");
            }
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu cuộc hẹn:", error);
          });

        // Đổ dữ liệu người dùng vào form
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      });
  } else {
    console.log("Chưa có token hoặc email.");
  }
  const mockData = [
      { id: 1, userName: "Nguyễn Văn A", tenMui: "Mũi 1", ngay: "2024-05-01" },
      { id: 2, userName: "Nguyễn Văn A", tenMui: "Mũi 2", ngay: "2024-06-01" },
      { id: 3, userName: "Nguyễn Văn A", tenMui: "Mũi 3", ngay: "2024-07-01" },
      { id: 4, userName: "Nguyễn Văn A", tenMui: "Mũi 4", ngay: "2024-08-01" },
      { id: 5, userName: "Trần Thị B", tenMui: "Mũi 1", ngay: "2024-05-10" },
      { id: 6, userName: "Trần Thị B", tenMui: "Mũi 2", ngay: "2024-06-10" },
      { id: 7, userName: "Trần Thị B", tenMui: "Mũi 3", ngay: "2024-07-10" },
      { id: 8, userName: "Trần Thị B", tenMui: "Mũi 4", ngay: "2024-08-10" }
  

  ];

  // Gán tên người dùng cố định (hoặc sau này từ localStorage / token)
  const user = "Nguyễn Văn A";

  function renderUserProgress() {
    console.log("JS đã chạy!")
    const tbody = document.getElementById("userProgressTable");
    if (!tbody) {
      console.warn("❗Không tìm thấy bảng userProgressTable");
      return;
    }

    tbody.innerHTML = "";

    const filtered = mockData.filter(item => item.userName === user);

    filtered.forEach(item => {
      const daTiem = localStorage.getItem("tiem_" + item.id) === "true";
      const row = `
        <tr>
          <td>${item.tenMui}</td>
          <td>${item.ngay}</td>
          <td class="${daTiem ? 'done' : 'pending'}">
            ${daTiem ? '✅ Đã tiêm' : '⌛ Chưa tiêm'}
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Đưa hàm ra global để gọi sau khi trang được load động
  document.addEventListener("DOMContentLoaded", function () {
    renderUserProgress();
  });
  setInterval(renderUserProgress, 1000);
}
