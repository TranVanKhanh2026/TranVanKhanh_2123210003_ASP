using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using System.Linq;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        // LINQ: Lấy 3 bài viết mới nhất
        var latestPosts = _context.Posts
                                  .Include(p => p.Category) // Lấy kèm tên danh mục
                                  .OrderByDescending(p => p.CreatedDate) // Sắp xếp mới nhất
                                  .Take(3) // Lấy 3 bài viết
                                  .ToList();

         
        return View(latestPosts);
    }
}
