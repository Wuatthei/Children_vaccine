function loadAdminPage(page) {
    console.log("[ADMIN] Loading page:", page);
  
    let url = page.startsWith("/adminPages/") ? page : "/adminPages/" + page;
  
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("admin-content").innerHTML = html;
  
        // ✅ Sau khi load xong, nếu là trang lịch tiêm thì gọi hàm render dữ liệu
        if (page.includes("admin_lichtiem") && typeof loadLichTiemTable === "function") {
          console.log("🟢 Gọi loadLichTiemTable()");
          loadLichTiemTable();
        }

        if (page.includes("admin_taikhoan") && typeof loadTaiKhoanTable === "function") {
          console.log("🟢 Gọi loadTaiKhoanTable()");
          loadTaiKhoanTable();
        }

        if (page.includes("admin_support") && typeof loadSupportRequests === "function") {
          loadSupportRequests(); // nếu bạn gọi sau khi load HTML
        }
        if (page.includes("admin_progress") && typeof window.renderAdmin === "function") {
          console.log("🟢 Gọi renderAdmin()");
          window.renderAdmin();
        }
        setTimeout(() => {
          initFeedbackEvents();
          renderFeedbackList();
        }, 0);
        setTimeout(() => {
          initReactionEvents();
          renderReactionList(); 
        }, 0);
      })
      .catch((error) => console.error("[ADMIN] Fetch error:", error));
  }
 
  
  document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");
    const submenuItems = document.querySelectorAll(".submenu-item");
    const content = document.getElementById("admin-content");
  
    const adminPages = {
      "Tất cả lịch đăng ký": "/adminPages/admin_lichtiem",
      "Danh sách tài khoản": "/adminPages/admin_taikhoan",
    //   "Thông tin khách hàng": "/adminPages/admin_khachhang.html",
    //   "Cập nhật hồ sơ trẻ em": "/adminPages/admin_capnhat_hoso.html",
       "Cập nhật quá trình tiêm chủng": "/adminPages/admin_progress",
       "Phản ứng sau tiêm": "/adminPages/admin_phanUng",
      "Support": "/adminPages/admin_support",
      "Feedback": "/adminPages/admin_feedback",
    //   "Lịch sử giao dịch": "/adminPages/admin_lichsugiaodich.html",
    //   "Phản hồi": "/adminPages/admin_phanhoi.html"
    };
  
    // Xử lý click trên menu cha (có submenu)
    document.querySelectorAll(".has-submenu > div").forEach((parentTrigger) => {
      parentTrigger.addEventListener("click", function (event) {
        event.stopPropagation();
  
        let parentItem = parentTrigger.parentElement;
        let submenu = parentItem.querySelector(".submenu");
  
        document.querySelectorAll(".menu-item").forEach((item) => {
          if (item !== parentItem) {
            item.classList.remove("active");
            let sub = item.querySelector(".submenu");
            if (sub) sub.style.display = "none";
          }
        });
  
        if (submenu.style.display === "block") {
          submenu.style.display = "none";
          parentItem.classList.remove("active");
        } else {
          submenu.style.display = "block";
          parentItem.classList.add("active");
        }
      });
    });
  
    // Xử lý click trên submenu-item
    submenuItems.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.stopPropagation();
  
        submenuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
  
        let parent = item.closest(".has-submenu");
        if (parent) {
          parent.classList.add("active");
          parent.querySelector(".submenu").style.display = "block";
        }
  
        const text = item.innerText.trim();
        if (adminPages[text]) {
          console.log("Calling loadAdminPage with:", adminPages[text]);
          loadAdminPage(adminPages[text]);
        } else {
          console.log("No admin page found for:", text);
        }
      });
    });
  
    // Xử lý click trên menu chính không có submenu
    menuItems.forEach((item) => {
      item.addEventListener("click", function () {
        document.querySelectorAll(".menu-item").forEach((i) => {
          if (i !== item) {
            i.classList.remove("active");
            let sub = i.querySelector(".submenu");
            if (sub) sub.style.display = "none";
          }
        });
  
        submenuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
  
        const text = item.innerText.trim();
        if (adminPages[text]) {
          console.log("Calling loadAdminPage with:", adminPages[text]);
          loadAdminPage(adminPages[text]);
        } else {
          console.log("No admin page found for:", text);
        }
      });
    });
  });