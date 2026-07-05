let socket = null;
let selectedUserEmail = null; // For admin to track selected user
let adminChatHistory = {}; // Lưu tin nhắn từ admin gửi đến user
let userChatHistory = {}; // Lưu tin nhắn từ user gửi đến admin hoặc chính họ

function toggleChatBox() {
  const chatBox = document.getElementById("chatBox");
  const isVisible = chatBox.style.display === "block";
  chatBox.style.display = isVisible ? "none" : "block";

  if (!isVisible && !socket) {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const email = user.email || "unknown";
    const role = user.role || "GUEST";
    console.log("Khởi tạo WebSocket với email:", email, "role:", role);

    socket = new WebSocket("ws://" + window.location.hostname + ":8080/ws/chat");

    socket.onopen = () => {
      console.log("✅ WebSocket connected.");
      socket.send(JSON.stringify({ type: "init", email, role }));
    };

    socket.onmessage = (event) => {
      const chatMessages = document.getElementById("chatMessages");
      if (!chatMessages) {
        console.error("Không tìm thấy chatMessages element!");
        return;
      }
      const data = JSON.parse(event.data);
      console.log("Nhận tin nhắn:", data);

      if (data.type === "userList" && role === "ADMIN") {
        const userSelect = document.getElementById("userSelect");
        if (userSelect) {
          userSelect.innerHTML = '<option value="">Chọn một người dùng</option>';
          data.users.forEach((userEmail) => {
            const option = document.createElement("option");
            option.value = userEmail;
            option.textContent = userEmail;
            userSelect.appendChild(option);
          });
        }
      } else if (data.type === "message") {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const currentEmail = currentUser.email || "unknown";
        const isAdmin = currentUser.role === "ADMIN";
        console.log("Kiểm tra hiển thị:", {
          isAdmin,
          currentEmail,
          selectedUserEmail,
          dataEmail: data.email,
          dataRecipient: data.recipientEmail
        });

        // Thêm timestamp để theo dõi thời gian
        const messageWithTimestamp = { ...data, timestamp: Date.now() };

        // Lưu tin nhắn vào lịch sử phù hợp
        if (data.role === "ADMIN" && data.recipientEmail) {
          if (!adminChatHistory[data.recipientEmail]) {
            adminChatHistory[data.recipientEmail] = [];
          }
          adminChatHistory[data.recipientEmail].push(messageWithTimestamp);
        } else {
          if (!userChatHistory[data.email]) {
            userChatHistory[data.email] = [];
          }
          userChatHistory[data.email].push(messageWithTimestamp);
        }

        if (
          (isAdmin && (data.email === selectedUserEmail || data.recipientEmail === selectedUserEmail)) ||
          (!isAdmin && (data.email === currentEmail || !data.recipientEmail || data.recipientEmail === currentEmail))
        ) {
          const msg = document.createElement("div");
          msg.textContent = data.content;
          msg.className = `message ${data.email === currentEmail ? "admin" : "user"}`;
          chatMessages.appendChild(msg);
          console.log("Đã thêm tin nhắn vào DOM:", msg.textContent);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
          console.log("Tin nhắn không hiển thị, không khớp điều kiện.");
        }
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected.");
      socket = null;
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      console.error("Error details:", err.message, err.stack);
    };

    if (role === "ADMIN") {
      const userSelectDiv = document.getElementById("userSelectDiv");
      if (userSelectDiv) {
        userSelectDiv.style.display = "block";
      }
    }
  }
}

function sendChat() {
  console.log("Sending chat message...");
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const role = user.role || "GUEST";

  if (!message || !socket || socket.readyState !== WebSocket.OPEN) {
    console.log("Không gửi được: Tin nhắn rỗng hoặc WebSocket không mở");
    return;
  }

  if (role === "ADMIN" && !selectedUserEmail) {
    alert("Vui lòng chọn một người dùng để gửi tin nhắn!");
    return;
  }

  const email = user.email || "unknown";

  const fullMsg = {
    type: "message",
    email,
    role,
    content: message,
    recipientEmail: role === "ADMIN" ? selectedUserEmail : null
  };

  console.log("Gửi tin nhắn:", fullMsg);
  socket.send(JSON.stringify(fullMsg));
  input.value = "";
}

function selectUser() {
  const userSelect = document.getElementById("userSelect");
  selectedUserEmail = userSelect.value;
  const chatMessages = document.getElementById("chatMessages");
  // Hiển thị lại lịch sử tin nhắn của user được chọn
  chatMessages.innerHTML = "";
  if (selectedUserEmail) {
    // Kết hợp và sắp xếp tin nhắn từ userChatHistory và adminChatHistory
    let allMessages = [];
    if (userChatHistory[selectedUserEmail]) {
      allMessages = allMessages.concat(userChatHistory[selectedUserEmail]);
    }
    if (adminChatHistory[selectedUserEmail]) {
      allMessages = allMessages.concat(adminChatHistory[selectedUserEmail]);
    }
    // Sắp xếp theo timestamp
    allMessages.sort((a, b) => a.timestamp - b.timestamp);

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const currentEmail = currentUser.email || "unknown";
    allMessages.forEach((msg) => {
      const msgDiv = document.createElement("div");
      msgDiv.textContent = msg.content;
      msgDiv.className = `message ${msg.email === currentEmail ? "admin" : "user"}`;
      chatMessages.appendChild(msgDiv);
    });
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
  console.log("Selected user:", selectedUserEmail);
}