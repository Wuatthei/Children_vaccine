package ut.edu.project_java.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.ui.Model;

@Controller
public class IndexController {

    @GetMapping({"/", "/index"}) 
    public String indexPage() {
        return "index"; 
    }

    @GetMapping({"/indexLogin"})
    public String indexAfterLoginPage() {
        return "indexAfterLogin"; 
    }

    @GetMapping("/loadPage/{page}")
    public String loadPage(@PathVariable String page, Model model) {
        return "pages/" + page ; 
    }

    @GetMapping("/pages/index_DatLich")
    public String homePage() {      
        return "pages/index_DatLich";
    }

    @GetMapping("/pages/indexSP")
    public String SupportPage() {
        
        return "pages/indexSP"; 
    }

    @GetMapping("/pages/index_ChamSocKhachHang")
    public String ChamSocKhachHangPage() {
        
        return "pages/index_ChamSocKhachHang"; 
    }

    @GetMapping("/pages/create_support")
    public String creatSupport(){
        return "pages/create_support";
    }

    @GetMapping("/pages/check_status")
    public String checkStatus(){
        return "pages/check_status";
    }

    @GetMapping("/pages/banggia")
    public String banggiaPage(){
        return "pages/banggia";
    }

    @GetMapping("/pages/goivaccinetreem")
    public String goivaccinetreemPage(){
        return "pages/goivaccinetreem";
    }

    @GetMapping("/pages/index_CapNhatHS")
    public String CapNhatHSPage() {
        
        return "pages/index_CapNhatHS"; 
    }

    @GetMapping("/pages/index_HistoryPay")
    public String HistoryPayPage() {
        
        return "pages/index_HistoryPay"; 
    }

    @GetMapping("/pages/home")
    public String home(){
        return "pages/home";
    }

    @GetMapping("/pages/indexTT")
    public String Tintuc(){
        return "pages/indexTT";
    }

    @GetMapping("/pages/index_GioiThieu")
    public String GioiThieuPage(){
        return "pages/index_GioiThieu";
    }

    @GetMapping("/pages/camnangtiemchung")
    public String camnangtiemchungPage(){
        return "pages/camnangtiemchung";
    }

    @GetMapping("/pages/Index_ThongTinKhachHang")
    public String ThongTinKhachHangPage(){
        return "pages/Index_ThongTinKhachHang";
    }

    @GetMapping("/pages/Index_QTTCUser")
    public String QTTCUserPage(){
        return "pages/Index_QTTCUser";
    }

    @GetMapping("/pages/user_progress")
    public String userProgessPage(){
        return "pages/user_progress";
    }

    @GetMapping("/pages/feedback")
    public String feedbackPage(){
        return "pages/feedback";
    }

    @GetMapping("/pages/user_phanUng")
    public String userPhanUngPage(){
        return "pages/user_phanUng";
    }
}