package ut.edu.project_java.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

import ut.edu.project_java.websocket.ChatHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final ChatHandler chatHandler;

    public WebSocketConfig(ChatHandler chatHandler) {
        this.chatHandler = chatHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        System.out.println("👉 registerWebSocketHandlers được gọi");
        registry.addHandler(chatHandler, "/ws/chat")
                .setAllowedOrigins("*"); // Cho phép mọi origin truy cập (dev)
    }
}