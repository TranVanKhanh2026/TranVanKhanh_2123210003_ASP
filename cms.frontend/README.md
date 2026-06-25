# Xiao Coffee & Book

Website quản lý và bán sản phẩm dành cho quán cafe sách Xiao, được xây dựng theo mô hình 3 tầng gồm CMS.Data, CMS.Backend và cms.frontend.

---

# Công nghệ sử dụng

## Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* Authentication & Authorization
* Swagger API

## Frontend

* ReactJS
* Axios
* React Router
* TailwindCSS / Bootstrap

---

# Cấu trúc Solution

```text
CMS.Data/
│
├── Entities
├── DbContext
├── Repository
└── Migrations

CMS.Backend/
│
├── Controllers
├── Services
├── Authentication
├── API
└── MVC Admin

cms.frontend/
│
├── public
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── layouts
│   └── routes
└── package.json
```

---

# Yêu cầu môi trường

* Visual Studio 2022
* .NET SDK
* SQL Server
* NodeJS
* Git

---

# Clone Source Code

```bash
git clone <repository-url>
```

Sau khi clone thành công, mở file Solution (.sln) bằng Visual Studio 2022.

---

# Hướng dẫn chạy Backend

## Bước 1

Mở file Solution (.sln) bằng Visual Studio 2022.

## Bước 2

Kiểm tra chuỗi kết nối trong file:

```json
appsettings.json
```

Ví dụ:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=XiaoCoffeeBook;Trusted_Connection=True;TrustServerCertificate=True"
}
```

## Bước 3

Thực hiện Migration (nếu cơ sở dữ liệu chưa được tạo):

```powershell
Update-Database
```

## Bước 4

Nhấn phím F5 để chạy dự án.

Backend sẽ khởi động và Swagger sẽ được mở trên trình duyệt.

---

# Hướng dẫn chạy Frontend

Mở Terminal tại thư mục:

```text
cms.frontend
```

## Cài đặt thư viện

```bash
npm install
```

## Cấu hình môi trường

Tạo file:

```text
.env
```

Ví dụ:

```env
REACT_APP_API_URL=https://localhost:7078/api
```

## Chạy ứng dụng

```bash
npm start
```

Frontend sẽ chạy tại:

```text
http://localhost:3000
```

---

# Các chức năng chính

## Quản trị hệ thống

* Quản lý Category
* Quản lý CategoryProduct
* Quản lý Product
* Quản lý Post
* Quản lý User
* Quản lý Customer
* Quản lý Order
* Quản lý OrderDetail

## Khách hàng

* Xem danh sách sản phẩm
* Xem chi tiết sản phẩm
* Xem bài viết
* Tìm kiếm sản phẩm
* Lọc sản phẩm theo giá
* Thêm sản phẩm vào giỏ hàng
* Cập nhật số lượng trong giỏ hàng
* Thanh toán đơn hàng
* Đăng ký tài khoản
* Đăng nhập
* Quên mật khẩu

---

# Bảo mật

* Sử dụng Authentication và Authorization.
* Khu vực quản trị được bảo vệ bằng [Authorize].
* Quản lý người dùng được phân quyền bằng [Authorize(Roles = "Admin")].
* Mật khẩu được mã hóa trước khi lưu vào cơ sở dữ liệu.
* Cấu hình CORS cho phép ReactJS truy cập Web API.

---

# API Documentation

Sau khi chạy Backend, Swagger API có thể truy cập tại:

```text
https://localhost:7078/swagger
```

---

# Database

Hệ thống sử dụng SQL Server và Entity Framework Core.

Các thực thể chính:

* Category
* CategoryProduct
* Product
* Post
* User
* Customer
* Order
* OrderDetail

---

# Thành viên thực hiện

* Họ và tên: Trần Văn Khánh
* MSSV: 2123210003
* Lớp: CCQ2311A
* Dự án: Xiao Coffee & Book


