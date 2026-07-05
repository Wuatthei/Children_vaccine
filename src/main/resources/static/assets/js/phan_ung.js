console.log("✅ phan_ung.js đã được load!");

function initReactionEvents() {
  const form = document.getElementById("reactionForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitReaction();
    });
  }
}

function submitReaction() {
  const name = document.getElementById("name")?.value.trim();
  const muiTiem = document.getElementById("muiTiem")?.value.trim();
  const trieuChung = document.getElementById("trieuChung")?.value.trim();
  const moTa = document.getElementById("moTa")?.value.trim();

  if (!name || !muiTiem || !trieuChung) {
    alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
    return;
  }

  const data = {
    name,
    muiTiem,
    trieuChung,
    moTa,
    thoiGian: new Date().toLocaleString()
  };

  const allReactions = JSON.parse(localStorage.getItem("phan_ung") || "[]");
  allReactions.push(data);
  localStorage.setItem("phan_ung", JSON.stringify(allReactions));

  alert("✅ Phản hồi đã được ghi nhận!");
  document.getElementById("reactionForm").reset();
  renderReactionList(); // cập nhật danh sách nếu có
}

function renderReactionList() {
  const list = document.getElementById("phanUngTable");
  if (!list) {
    console.warn("⚠️ Không tìm thấy bảng hiển thị phản ứng!");
    return;
  }

  list.innerHTML = "";
  const allReactions = JSON.parse(localStorage.getItem("phan_ung") || "[]");

  if (allReactions.length === 0) {
    list.innerHTML = `<tr><td colspan="5">Chưa có phản ứng nào.</td></tr>`;
    return;
  }

  allReactions.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.muiTiem}</td>
      <td>${entry.trieuChung}</td>
      <td>${entry.moTa}</td>
      <td>${entry.thoiGian}</td>
    `;
    list.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initReactionEvents();   // nếu có form
  renderReactionList();   // nếu có bảng
});

window.addEventListener("storage", function (e) {
    if (e.key === "phan_ung") {
      console.log("📦 Dữ liệu phản ứng vừa được cập nhật!");
      renderReactionList(); // gọi lại hàm hiển thị
    }
  });
