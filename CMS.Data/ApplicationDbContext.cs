/*
---------------------------------------------------------
Họ và tên : Trần Văn Khánh
MSSV       : 2123210003
Ngày tạo   : 23/05/2026
Version    : 2
Mô tả      : Kết nối Database và khai báo các bảng dữ liệu
---------------------------------------------------------
*/

using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;

namespace CMS.Data
{
    // Lớp ApplicationDbContext dùng để kết nối SQL Server
    // và quản lý các bảng dữ liệu trong hệ thống
    public class ApplicationDbContext : DbContext
    {
        // Constructor nhận options từ Program.cs
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        // =========================
        // KHAI BÁO CÁC BẢNG DỮ LIỆU
        // =========================

        // Bảng danh mục bài viết
        public DbSet<Category> Categories { get; set; }

        // Bảng bài viết
        public DbSet<Post> Posts { get; set; }

        // Bảng người dùng
        public DbSet<User> Users { get; set; }

        // Bảng danh mục sản phẩm
        public DbSet<CategoryProduct> CategoriesProducts { get; set; }

        // Bảng sản phẩm
        public DbSet<Product> Products { get; set; }

        // Bảng khách hàng
        public DbSet<Customer> Customers { get; set; }

        // Bảng đơn hàng
        public DbSet<Order> Orders { get; set; }

        // Bảng chi tiết đơn hàng
        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}