document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("phan_ung") || "[]");
    const tbody = document.getElementById("phanUngTable");
  
    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">Chưa có phản hồi nào.</td></tr>`;
      return;
    }
  
    data.forEach(entry => {
      const row = `
        <tr>
          <td>${entry.name}</td>
          <td>${entry.muiTiem}</td>
          <td>${entry.trieuChung}</td>
          <td>${entry.moTa}</td>
          <td>${entry.thoiGian}</td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  });
  