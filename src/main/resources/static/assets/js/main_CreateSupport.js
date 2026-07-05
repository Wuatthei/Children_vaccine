function handleSupportSubmit() {
    const apiBaseUrl = `http://${window.location.hostname}:8080`;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const chude = document.getElementById("chude").value;
    const douutien = document.querySelector('input[name="douutien"]:checked')?.value || "";
    const tepdinhkem = document.getElementById("tepdinhkem").value.trim();
    const tieude = document.getElementById("tieude").value.trim();
    const chitiet = document.getElementById("chitiet").value.trim();
  
    // Kiểm tra các trường bắt buộc
    if (
      name === "" || email === "" || phone === "" || chude === "" ||
      douutien === "" || tieude === "" || chitiet === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }
  
    // Gửi dữ liệu đến server
      fetch(`${apiBaseUrl}/api/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          chude,
          douutien,
          tepdinhkem,
          tieude,
          chitiet
        }),
      })
      .then(async response => {
        if (response.ok) {
          const data = await response.json(); // Server trả về SupportRequest có ID
          alert("🎉 Gửi yêu cầu hỗ trợ thành công!\nMã yêu cầu của bạn là: " + data.id + "\nLưu lại mã này để tra cứu sau.");
          document.querySelector("form").reset();
        } else {
          const errorText = await response.text();
          console.error("Lỗi từ server:", errorText);
          alert("Gửi thất bại. Vui lòng thử lại.");
        }
      });
      
  }
  