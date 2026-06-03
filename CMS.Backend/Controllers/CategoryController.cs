/*
Họ và tên: Trần Văn Khánh
MSSV: 2123210003
Ngày tạo: 28/05/2026
version 5
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;

[Authorize]
public class CategoryController : Controller
{
    private readonly ApplicationDbContext _context;

    public CategoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var data = _context.Categories.ToList();
        return View(data);
    }

    [HttpGet]
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Create(Category model)
    {
        _context.Categories.Add(model);
        _context.SaveChanges();
        return RedirectToAction("Index");
    }

    public IActionResult Delete(int id)
    {
        var category = _context.Categories.Find(id);
        if (category != null)
        {
            _context.Categories.Remove(category);
            _context.SaveChanges();
        }
        return RedirectToAction("Index");
    }

    [HttpGet]
    public IActionResult Edit(int id)
    {
        var category = _context.Categories.Find(id);
        if (category == null) return NotFound();
        return View(category);
    }

    [HttpPost]
    public IActionResult Edit(Category model)
    {
        _context.Categories.Update(model);
        _context.SaveChanges();
        return RedirectToAction("Index");
    }
}