/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 06/06/2026
Version    : 1
Mô tả      : API xác thực khách hàng (Đăng ký / Đăng nhập)
---------------------------------------------------------
*/
using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST /api/Auth/CustomerRegister
        [HttpPost("CustomerRegister")]
        public IActionResult CustomerRegister([FromBody] Customer model)
        {
            // Kiểm tra email đã tồn tại chưa
            var existed = _context.Customers
                .FirstOrDefault(c => c.Email == model.Email);

            if (existed != null)
            {
                return BadRequest(new { message = "Email này đã được đăng ký!" });
            }

            // Tạo khách hàng mới (lưu mật khẩu thô - plain text)
            var newCustomer = new Customer
            {
                FullName = model.FullName,
                Email = model.Email,
                Password = model.Password,
                Phone = model.Phone,
                Address = model.Address
            };

            _context.Customers.Add(newCustomer);
            _context.SaveChanges();

            return Ok(new { message = "Đăng ký thành công!", customerId = newCustomer.Id });
        }

        // POST /api/Auth/CustomerLogin
        [HttpPost("CustomerLogin")]
        public IActionResult CustomerLogin([FromBody] LoginRequest request)
        {
            // Tìm khách hàng theo Email và Password
            var customer = _context.Customers
                .FirstOrDefault(c => c.Email == request.Email
                                  && c.Password == request.Password);

            if (customer == null)
            {
                return BadRequest(new { message = "Email hoặc mật khẩu không đúng!" });
            }

            // Trả về thông tin khách hàng cho Frontend lưu lại
            return Ok(new
            {
                message = "Đăng nhập thành công!",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address
            });
        }
    }

    // Class nhận dữ liệu đăng nhập từ Frontend
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}