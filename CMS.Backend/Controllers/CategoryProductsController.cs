/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 06/06/2026
Version    : 1
Mô tả      : API danh mục sản phẩm
---------------------------------------------------------
*/
using Microsoft.AspNetCore.Mvc;
using CMS.Data;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET /api/CategoriesProducts
        [HttpGet]
        public IActionResult GetAll()
        {
            var categories = _context.CategoriesProducts
                .OrderBy(c => c.Id)
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .ToList();

            return Ok(categories);
        }
    }
}