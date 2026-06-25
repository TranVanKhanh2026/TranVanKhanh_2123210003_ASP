using CMS.Data;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")] 
public class CategoriesProductsApiController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriesProductsApiController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var data = _context.CategoriesProducts.ToList();
        return Ok(data); // Trả về JSON cho React
    }
}