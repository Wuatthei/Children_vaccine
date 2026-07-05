(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'slideOutDown',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // International carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        items: 1,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            },
            1200:{
                items:1
            }
        }
    });

    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 0, 'easeInOutExpo');
        return false;
    });


})(jQuery);

function loadPage(page) {
    console.log("Loading page:", page);
  
    // Kiểm tra nếu page đã có '/pages/', chỉ fetch(page) thôi
    let url = page.startsWith("/pages/") ? page : "/pages/" + page;
  
    fetch(url)
      .then((response) => response.text())
      .then((html) => (document.getElementById("content").innerHTML = html))
      .catch((error) => console.error("Fetch error:", error));
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");
    const content = document.getElementById("content");
  
    const pages = {
      "Trang chủ": "/pages/home",
      "Dịch vụ tiêm chủng": "/pages/index_GioiThieu",
      "Bảng giá": "/pages/banggia",
      "Cẩm nang tiêm chủng": "/pages/camnangtiemchung",
      "Gói vaccine": "/pages/goivaccinetreem", 
      "Tin tức": "/pages/indexTT",
      // "Tin tức": "<h1>Tin tức</h1><p>Các tin tức mới nhất về tiêm vaccine.</p>",
    //   "Đặt lịch": "/pages/index_DatLich",
    };
  
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

// Đăng nhập và Đăng ký
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loginData = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Kiểm tra dữ liệu nhận được từ API
        if (data.token) {
            localStorage.setItem("email", data.email);
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            alert('Đăng nhập thành công!');
            location.reload();
        } else {
            console.log("Không có token trong phản hồi:", data);  // Nếu không có token
        }
    })
    .catch(error => {
        var myModal = new bootstrap.Modal(document.getElementById('loginErrorModal'));
        myModal.show();
    });
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const registerData = {
        fullName: document.getElementById('registerFullName').value,
        email: document.getElementById('registerEmail').value,
        phone: document.getElementById('registerPhone').value,
        password: document.getElementById('registerPassword').value
    };

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Đăng ký thành công!');
            location.reload();
        }
    })
    .catch(error => {
        alert('Đăng ký thất bại!');
    });
});