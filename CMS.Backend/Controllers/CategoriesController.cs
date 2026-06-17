using CMS.Data;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var categories = _context.Categories
                .OrderBy(c => c.Id)
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .ToList();

            return Ok(categories);
        }
    }
}