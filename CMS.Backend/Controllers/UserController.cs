/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 23/05/2026
Version    : 1
Mô tả      : Controller quản lý người dùng
---------------------------------------------------------
*/

using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        // ==========================================
        // Khai báo biến _context để thao tác Database
        // ==========================================
        private readonly ApplicationDbContext _context;

        // ==========================================
        // Constructor Injection
        // ==========================================
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // Action Index()
        // Chức năng:
        // Hiển thị danh sách thành viên
        // ==========================================
        public IActionResult Index()
        {
            // Lấy dữ liệu từ bảng Users
            var users = _context.Users.ToList();

            // Trả dữ liệu sang View
            return View(users);
        }
    }
}