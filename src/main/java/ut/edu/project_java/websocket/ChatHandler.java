package ut.edu.project_java.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Client kết nối: " + session.getRemoteAddress());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("Nhận tin nhắn: " + payload);
        try {
            Map<String, Object> msg = objectMapper.readValue(payload, Map.class);
            String type = (String) msg.get("type");
            String email = (String) msg.get("email");
            String role = (String) msg.get("role");

            if (type == null || email == null || role == null) {
                throw new IllegalArgumentException("Thiếu type, email hoặc role trong tin nhắn: " + payload);
            }

            if ("init".equals(type)) {
                userSessions.put(email, session);
                session.getAttributes().put("email", email);
                session.getAttributes().put("role", role);
                System.out.println("User registered: " + email + " (" + role + ")");
                broadcastUserList();
            } else if ("message".equals(type)) {
                String recipientEmail = (String) msg.get("recipientEmail");
                String content = (String) msg.get("content");

                if (content == null) {
                    throw new IllegalArgumentException("Thiếu content trong tin nhắn: " + payload);
                }

                System.out.println("Xử lý tin nhắn từ " + email + " đến " + (recipientEmail != null ? recipientEmail : "null"));

                Map<String, Object> messageToSend = new ConcurrentHashMap<>();
                messageToSend.put("type", "message");
                messageToSend.put("email", email);
                messageToSend.put("role", role);
                messageToSend.put("content", content);
                System.out.println("Trước khi put recipientEmail: " + messageToSend);
                // Gán recipientEmail mặc định là admin@gmail.com nếu null
                recipientEmail = (recipientEmail != null) ? recipientEmail : "admin@gmail.com";
                messageToSend.put("recipientEmail", recipientEmail);
                System.out.println("Sau khi put recipientEmail: " + messageToSend);

                String jsonMessage = objectMapper.writeValueAsString(messageToSend);
                System.out.println("JSON tạo thành: " + jsonMessage);

                if ("ADMIN".equals(role)) {
                    WebSocketSession userSession = userSessions.get(recipientEmail);
                    if (userSession != null && userSession.isOpen()) {
                        userSession.sendMessage(new TextMessage(jsonMessage));
                        System.out.println("Gửi tin nhắn đến user: " + recipientEmail);
                    } else {
                        System.out.println("Không tìm thấy hoặc session đóng: " + recipientEmail);
                    }
                    if (session.isOpen()) {
                        session.sendMessage(new TextMessage(jsonMessage));
                        System.out.println("Gửi tin nhắn đến admin: " + email);
                    }
                } else {
                    if (session.isOpen()) {
                        session.sendMessage(new TextMessage(jsonMessage));
                        System.out.println("Gửi tin nhắn trở lại cho user: " + email + ", Session open: " + session.isOpen());
                    } else {
                        System.out.println("Không gửi được: Session closed for " + email);
                    }
                    for (WebSocketSession s : userSessions.values()) {
                        if ("ADMIN".equals(s.getAttributes().get("role")) && s.isOpen()) {
                            s.sendMessage(new TextMessage(jsonMessage));
                            System.out.println("Gửi tin nhắn từ user đến admin: " + s.getAttributes().get("email"));
                        }
                    }
                }
            } else {
                System.out.println("Loại tin nhắn không hỗ trợ: " + type);
            }
        } catch (Exception e) {
            System.err.println("Lỗi xử lý tin nhắn: " + e.getMessage());
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            System.out.println("Stack trace: " + sw.toString());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String email = (String) session.getAttributes().get("email");
        if (email != null) {
            userSessions.remove(email);
            System.out.println("Client ngắt kết nối: " + email + ", Status: " + status);
            broadcastUserList();
        }
    }

    private void broadcastUserList() throws IOException {
        Map<String, Object> userListMsg = new ConcurrentHashMap<>();
        userListMsg.put("type", "userList");
        userListMsg.put("users", userSessions.keySet());

        String jsonMessage = objectMapper.writeValueAsString(userListMsg);
        System.out.println("Gửi danh sách user: " + jsonMessage);

        for (WebSocketSession session : userSessions.values()) {
            if ("ADMIN".equals(session.getAttributes().get("role")) && session.isOpen()) {
                session.sendMessage(new TextMessage(jsonMessage));
            }
        }
    }
}