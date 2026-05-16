/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 23/05/2026
Version    : 1
Mô tả      : Controller quản lý danh mục sản phẩm
---------------------------------------------------------
*/

using Microsoft.AspNetCore.Mvc;
using CMS.Data;

namespace CMS.Backend.Controllers
{
    public class CategoriesProductsController : Controller
    {
        // Khai báo DbContext
        private readonly ApplicationDbContext _context;

        // Constructor Injection
        public CategoriesProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hiển thị danh sách CategoriesProducts
        public IActionResult Index()
        {
            var categoriesProducts = _context.CategoriesProducts.ToList();

            return View(categoriesProducts);
        }
    }
}