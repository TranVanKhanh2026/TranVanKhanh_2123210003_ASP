/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 06/06/2026
Version    : 1
Mô tả      : API xử lý đặt hàng
---------------------------------------------------------
*/
using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST /api/Orders
        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderRequest request)
        {
            // BƯỚC 1: Tạo đơn hàng mới vào bảng Order
            var newOrder = new Order
            {
                CustomerId = request.CustomerId,
                OrderDate = DateTime.Now,
                Status = 0, // 0 = Chờ duyệt
                Notes = request.Notes
            };
            _context.Orders.Add(newOrder);
            _context.SaveChanges(); // Lưu để có newOrder.Id

            // BƯỚC 2: Vòng lặp thêm từng sản phẩm vào bảng OrderDetail
            foreach (var item in request.Items)
            {
                // Lấy giá sản phẩm thực tế từ Database (không tin giá từ Frontend)
                var product = _context.Products.Find(item.ProductId);
                if (product == null) continue;

                var orderDetail = new OrderDetail
                {
                    OrderId = newOrder.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price // Lấy giá thật từ DB
                };
                _context.OrderDetails.Add(orderDetail);

                // BƯỚC 3: Trừ số lượng tồn kho
                product.StockQuantity -= item.Quantity;
                _context.Products.Update(product);
            }

            _context.SaveChanges(); // Lưu tất cả OrderDetail + cập nhật kho

            return Ok(new
            {
                message = "Đặt hàng thành công!",
                orderId = newOrder.Id
            });
        }

        // GET /api/Orders/customer/{customerId}
        [HttpGet("customer/{customerId}")]
        public IActionResult GetByCustomer(int customerId)
        {
            var orders = _context.Orders
                .Where(o => o.CustomerId == customerId)
                .OrderByDescending(o => o.Id)
                .Select(o => new {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    StatusText = o.Status == 0 ? "Chờ duyệt"
                               : o.Status == 1 ? "Đang giao"
                               : "Đã xong",
                    Items = _context.OrderDetails
                        .Where(od => od.OrderId == o.Id)
                        .Select(od => new {
                            od.ProductId,
                            ProductName = _context.Products
                                .Where(p => p.Id == od.ProductId)
                                .Select(p => p.Name)
                                .FirstOrDefault(),
                            od.Quantity,
                            od.UnitPrice,
                            TotalPrice = od.Quantity * od.UnitPrice
                        })
                        .ToList()
                })
                .ToList();

            return Ok(orders);
        }
    }

    // Class nhận dữ liệu đặt hàng từ Frontend
    public class OrderRequest
    {
        public int CustomerId { get; set; }
        public string Notes { get; set; }
        public List<OrderItemRequest> Items { get; set; }
    }

    // Class đại diện cho từng sản phẩm trong giỏ hàng
    public class OrderItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}