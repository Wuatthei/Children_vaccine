package ut.edu.project_java.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaymentController {
    @GetMapping("/pages/index_ThanhToan")
    public String indexPage() {
        return "pages/index_ThanhToan"; 
    }
}
