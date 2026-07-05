package ut.edu.project_java.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.ui.Model;

@Controller
public class AdminController {

    @GetMapping({"/admin"})
    public String adminPage() {
        return "admin"; 
    }

    @GetMapping("/loadAdminPage/{page}")
    public String loadAdminPage(@PathVariable String page, Model model) {
        return "adminPages/" + page ; 
    }

    @GetMapping("/adminPages/admin_lichtiem")
    public String adminLichTiemPage(){
        return "adminPages/admin_lichtiem";
    }

    @GetMapping("/adminPages/admin_taikhoan")
    public String adminTaiKhoanPage(){
        return "adminPages/admin_taikhoan";
    }
    @GetMapping("/adminPages/admin_support")
    public String adminSupportPage(){
        return "adminPages/admin_support";
    }

    @GetMapping("/adminPages/admin_progress")
    public String adminProgessPage(){
        return "adminPages/admin_progress";
    }
    @GetMapping("/adminPages/admin_feedback")
    public String adminFeedbackPage(){
        return "adminPages/admin_feedback";
    }
    @GetMapping("/adminPages/admin_phanUng")
    public String adminPhanUngPage(){
        return "adminPages/admin_phanUng";
    }

}
