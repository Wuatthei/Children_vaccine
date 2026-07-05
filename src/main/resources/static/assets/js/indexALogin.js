
function loadPage(page) {
  console.log("Loading page:", page);

  // Kiểm tra nếu page đã có '/pages/', chỉ fetch(page) thôi
  let url = page.startsWith("/pages/") ? page : "/pages/" + page;

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      if (page === "/pages/Index_ThongTinKhachHang") {
        loadScript("../assets/js/thongtinkhachhang.js", () => {
          window.initThongTinKhachHangPage?.();
        });
      }
    
      if (page === "/pages/index_DatLich") {
        loadScript("../assets/js/main_DatLich.js", () => {
          window.initDatLichPage?.();
        });
      }

      if (page === "/pages/user_progress") {
        loadScript("../assets/js/progress.js", () => {
          window.initProgressPage?.();
        });
      }

      if (typeof window.renderUserProgress === 'function') {
        renderUserProgress();
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
    .catch((error) => console.error("Fetch error:", error));
}

let currentPageScript = null; // Lưu lại script đang dùng
function loadScript(scriptUrl, callback) {
  const script = document.createElement("script");
  script.src = scriptUrl;
  script.defer = true;
  script.onload = () => {
    if (typeof callback === "function") callback();
  };
  document.body.appendChild(script);
}



document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const submenuItems = document.querySelectorAll(".submenu-item");
  const navItems = document.querySelectorAll(".navbar-nav .nav-item");
  const content = document.getElementById("content");

  const pages = {
    "Dịch vụ tiêm chủng": "/pages/index_GioiThieu",
    "Cẩm nang tiêm chủng": "/pages/camnangtiemchung",
    "Gói vaccine": "/pages/goivaccinetreem",
    "Tin tức": "/pages/indexTT",
    "Bảng giá": "/pages/banggia",
    Support: "/pages/indexSP",
    "Đặt lịch": "/pages/index_DatLich",
    "Chăm sóc khách hàng": "/pages/index_ChamSocKhachHang",

    "Thông tin khách hàng": "/pages/Index_ThongTinKhachHang",

    "Cập nhật hồ sơ trẻ em": "/pages/index_CapNhatHS",
    "Cập nhật quá trình tiêm chủng": "/pages/user_progress",
    "Phản ứng sau tiêm": "/pages/user_phanUng",
    //   "<h1>Thông báo</h1><p>Các thông báo mới nhất về tiêm vaccine.</p>",
    "Lịch sử giao dịch": "/pages/index_HistoryPay",
    "Feedback": "/pages/feedback",
    // "Phản hồi":
    //   "<h1>Phản hồi</h1><p>Đóng góp ý kiến và phản hồi về hệ thống.</p>",
  };

  // Xử lý click trên menu cha (có submenu)
  document.querySelectorAll(".has-submenu > div").forEach((parentTrigger) => {
    parentTrigger.addEventListener("click", function (event) {
      event.stopPropagation();

      let parentItem = parentTrigger.parentElement;
      let submenu = parentItem.querySelector(".submenu");

      // Đóng tất cả các menu khác
      document.querySelectorAll(".menu-item").forEach((item) => {
        if (item !== parentItem) {
          item.classList.remove("active");
          let sub = item.querySelector(".submenu");
          if (sub) sub.style.display = "none";
        }
      });

      // Toggle trạng thái của menu được bấm
      if (submenu.style.display === "block") {
        submenu.style.display = "none";
        parentItem.classList.remove("active");
      } else {
        submenu.style.display = "block";
        parentItem.classList.add("active");
      }
    });
  });

  // Xử lý click trên submenu-item (submenu con)
  submenuItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.stopPropagation();

      // Xóa active của tất cả submenu-items
      submenuItems.forEach((i) => i.classList.remove("active"));

      // Active submenu-item được chọn
      item.classList.add("active");

      // Giữ menu cha active
      let parent = item.closest(".has-submenu");
      if (parent) {
        parent.classList.add("active");
        parent.querySelector(".submenu").style.display = "block";
      }

      // Hiển thị nội dung tương ứng
      const text = item.innerText.trim();
      if (pages[text]) {
        console.log("Calling loadPage with:", pages[text]);
        loadPage(pages[text]);
      } else {
        console.log("No page found for:", text);
      }
    });
  });

  // Xử lý click trên menu chính (không có submenu)
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Đóng tất cả menu khác
      document.querySelectorAll(".menu-item").forEach((i) => {
        if (i !== item) {
          i.classList.remove("active");
          let sub = i.querySelector(".submenu");
          if (sub) sub.style.display = "none";
        }
      });

      // Xóa trạng thái active của submenu-items
      submenuItems.forEach((i) => i.classList.remove("active"));

      // Thêm active vào menu được chọn
      item.classList.add("active");

      // Hiển thị nội dung tương ứng
      const text = item.innerText.trim();
      if (pages[text]) {
        console.log("Calling loadPage with:", pages[text]);
        loadPage(pages[text]);
      } else {
        console.log("No page found for:", text);
      }
    });
  });

  // Xử lý click trên navbar (nếu có)
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Xóa trạng thái active của tất cả nav-items
      navItems.forEach((i) => i.classList.remove("active"));

      // Thêm active vào nav-item được chọn
      item.classList.add("active");

      // Hiển thị nội dung tương ứng
      const text = item.innerText.trim();
      if (pages[text]) {
        console.log("Calling loadPage with:", pages[text]);
        loadPage(pages[text]);
      } else {
        console.log("No page found for:", text);
      }
    });
  });
});
