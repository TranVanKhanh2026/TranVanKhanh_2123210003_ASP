/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 28/05/2026
Version    : 3
Mô tả      : Controller quản lý bài viết
---------------------------------------------------------
*/

using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult Index(int? id)
        {
            // Khai báo query
            var query = _context.Posts
                                .Include(p => p.Category)
                                .OrderByDescending(p => p.CreatedDate)
                                .AsQueryable();

            // Nếu có id thì lọc theo danh mục
            if (id != null)
            {
                query = query.Where(p => p.CategoryId == id);
            }

            // Lấy dữ liệu
            var posts = query.ToList();

            // Trả dữ liệu ra View
            return View(posts);
        }

        // ==========================================
        // Action Details()
        // Chức năng:
        // Hiển thị chi tiết bài viết theo Id
        // ==========================================
        // GET: Post/Details/5
        public IActionResult Details(int id)
        {
            // Lấy bài viết kèm thông tin danh mục
            var post = _context.Posts
                               .Include(p => p.Category)
                               .FirstOrDefault(p => p.Id == id);

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