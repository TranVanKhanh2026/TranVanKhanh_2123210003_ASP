/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 30/05/2026
Version    : 5
Mô tả      : Controller quản lý người dùng (đầy đủ CRUD)
---------------------------------------------------------
*/

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using System.Linq;
using Microsoft.AspNetCore.Authorization; // Cần thêm namespace này

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")] // Chỉ tài khoản có Role là Admin mới được phép vào
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==================== DANH SÁCH ====================
        public IActionResult Index()
        {
            var users = _context.Users.ToList();
            return View(users);
        }

        // ==================== THÊM MỚI (GET) ====================
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // ==================== THÊM MỚI (POST) ====================
        [HttpPost]
        public IActionResult Create(User model)
        {
            // Kiểm tra tên đăng nhập đã tồn tại chưa
            var checkExist = _context.Users.Any(u => u.Username == model.Username);
            if (checkExist)
            {
                ModelState.AddModelError("Username", "Tên đăng nhập này đã có người dùng!");
                return View(model);
            }

            if (ModelState.IsValid)
            {
                _context.Users.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(model);
        }

        // ==================== SỬA (GET) ====================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();
            return View(user);
        }

        // ==================== SỬA (POST) - Giữ mật khẩu cũ nếu không nhập mới ====================
        [HttpPost]
        public IActionResult Edit(User model, string NewPassword)
        {
            // Lấy thông tin cũ trong DB (không theo dõi)
            var existingUser = _context.Users.AsNoTracking().FirstOrDefault(u => u.Id == model.Id);
            if (existingUser == null) return NotFound();

            // Xử lý mật khẩu
            if (!string.IsNullOrEmpty(NewPassword))
            {
                model.PasswordHash = NewPassword;   // Lưu mật khẩu mới
            }
            else
            {
                model.PasswordHash = existingUser.PasswordHash; // Giữ mật khẩu cũ
            }

            // Cập nhật
            _context.Users.Update(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // ==================== XÓA (GET) ====================
        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}