/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 23/05/2026
Version    : 2
Mô tả      : Controller quản lý bài viết
---------------------------------------------------------
*/

using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        // ==========================================
        // Khai báo biến _context để làm việc Database
        // ==========================================
        private readonly ApplicationDbContext _context;

        // ==========================================
        // Constructor Injection
        // Tự động nhận DbContext từ hệ thống
        // ==========================================
        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // Action Index()
        // Chức năng:
        // Hiển thị danh sách tất cả bài viết
        // ==========================================
        public IActionResult Index()
        {
            // Lấy toàn bộ dữ liệu từ bảng Posts
            var posts = _context.Posts.ToList();

            // Gửi dữ liệu sang View
            return View(posts);
        }

        // ==========================================
        // Action Details()
        // Chức năng:
        // Hiển thị chi tiết bài viết theo Id
        // ==========================================
        public IActionResult Details(int id)
        {
            // Tìm bài viết theo Id
            var post = _context.Posts.Find(id);

            // Nếu không tìm thấy dữ liệu
            if (post == null)
            {
                return NotFound();
            }

            // Trả dữ liệu sang View
            return View(post);
        }
    }
}