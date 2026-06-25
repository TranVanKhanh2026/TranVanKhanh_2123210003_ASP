import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate, Link

import productService from '../services/productService';
import categoryProductService from '../services/categoryProductService';
import blogService from '../services/blogService';

const BASE_URL = 'https://localhost:7078';

const resolveImage = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${BASE_URL}${url}`;
};

const BANNER_IMAGE_URL = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1920&auto=format&fit=crop';

// ===== CategoryTabs (giữ nguyên) =====
const CategoryTabs = ({ categories, activeId, onSelect }) => (
    <div className="d-flex flex-wrap mb-4" style={{ gap: '8px' }}>
        <button
            onClick={() => onSelect(null)}
            className={`btn btn-sm px-3 py-2 ${activeId === null ? 'bg-dark text-white' : 'btn-outline-secondary'}`}
            style={{
                borderRadius: '0', fontSize: '12.5px', letterSpacing: '0.5px',
                backgroundColor: activeId === null ? '#1E120C' : 'transparent',
                borderColor: '#8C5A3C',
                color: activeId === null ? '#FAF7F2' : '#2C1A11'
            }}
        >
            <i className="fa-solid fa-th-large mr-1"></i> Tất Cả
        </button>
        {categories.map((cat) => (
            <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`btn btn-sm px-3 py-2 ${activeId === cat.id ? 'bg-dark text-white' : 'btn-outline-secondary'}`}
                style={{
                    borderRadius: '0', fontSize: '12.5px', letterSpacing: '0.5px',
                    backgroundColor: activeId === cat.id ? '#1E120C' : 'transparent',
                    borderColor: '#8C5A3C',
                    color: activeId === cat.id ? '#FAF7F2' : '#2C1A11'
                }}
            >
                {cat.name}
            </button>
        ))}
    </div>
);

// ===== ProductCard (sửa nút Chi tiết) =====
const ProductCard = ({ item }) => {
    const navigate = useNavigate(); // Hook điều hướng
    const imageUrl = resolveImage(item.imageUrl);
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency', currency: 'VND'
    }).format(item.price || 0);
    const inStock = (item.stockQuantity ?? item.stock ?? 0) > 0;

    const handleViewDetail = () => {
        navigate(`/product/${item.id}`); // Chuyển đến trang chi tiết sản phẩm
    };

    return (
        <div className="col-6 col-md-3 mb-4">
            <div className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid #EAE3D5' }}>
                <div className="position-relative bg-light" style={{ paddingTop: '120%', overflow: 'hidden', backgroundColor: '#EAE3D5' }}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={item.name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                        <div className="d-flex align-items-center justify-content-center" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                            <i className="fa-solid fa-shirt" style={{ fontSize: '3rem', color: '#8C5A3C' }}></i>
                        </div>
                    )}
                    <span className={`badge position-absolute ${inStock ? 'bg-dark' : 'bg-secondary'}`} style={{ top: '12px', left: '12px', fontSize: '10px', padding: '4px 10px', borderRadius: '0', letterSpacing: '0.5px', backgroundColor: inStock ? '#1E120C' : '#BCAFA0' }}>
                        {inStock ? 'Bán chạy' : 'Hết hàng'}
                    </span>
                </div>
                <div className="card-body p-3">
                    <h6 className="card-title mb-1 font-weight-bold" style={{ fontSize: '14px', lineHeight: '1.4', color: '#2C1A11', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</h6>
                    <p className="font-weight-bold mb-0" style={{ fontSize: '14px', color: '#8C5A3C', marginTop: '6px' }}>{formattedPrice}</p>
                </div>
                <div className="card-footer bg-white border-top-0 pt-0 pb-3 px-3">
                    <div className="d-flex" style={{ gap: '6px' }}>
                        <button
                            className="btn btn-sm btn-outline-dark flex-fill"
                            style={{ fontSize: '12px', borderRadius: '0', fontWeight: '500', borderColor: '#C5A880' }}
                            onClick={handleViewDetail} // Gắn sự kiện
                        >
                            <i className="fa-regular fa-eye mr-1"></i> Chi tiết
                        </button>
                        <button className="btn btn-sm flex-fill" style={{ fontSize: '12px', borderRadius: '0', fontWeight: '500', backgroundColor: '#1E120C', color: '#EAE3D5', borderColor: '#1E120C' }} disabled={!inStock}><i className="fa-solid fa-cart-plus mr-1"></i> Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

const truncate = (text, limit = 200) => {
    if (!text) return '';
    const clean = stripHtml(text);
    return clean.length > limit ? clean.slice(0, limit) + '...' : clean;
};
// ===== PostCard (dùng Link) =====
const PostCard = ({ post }) => {
    console.log('POST DATA:', post);
    console.log('shortDescription:', post.shortDescription);
    console.log('content:', post.content);
    const imageUrl = resolveImage(post.imageUrl);
    const formattedDate = post.createdDate ? new Date(post.createdDate).toLocaleDateString('vi-VN') : '';
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid #EAE3D5' }}>
                <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#EAE3D5' }}>
                    {imageUrl ? (
                        <img src={imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.backgroundColor = '#dee2e6'; }} />
                    ) : (
                        <div className="d-flex align-items-center justify-content-center" style={{ width: '100%', height: '100%' }}><i className="fa-solid fa-image" style={{ fontSize: '3rem', color: '#8C5A3C' }}></i></div>
                    )}
                </div>
                <div className="card-body p-4">
                    {post.category?.name && (
                        <span className="badge mb-2" style={{ fontSize: '10px', letterSpacing: '1px', padding: '5px 12px', borderRadius: '0', backgroundColor: '#EAE3D5', color: '#2C1A11', border: '1px solid #C5A880' }}>{post.category.name}</span>
                    )}
                    <p className="text-muted mb-2" style={{ fontSize: '12px', color: '#8C7B6E' }}><i className="fa-regular fa-calendar mr-1"></i> {formattedDate}</p>
                    <h6 className="font-weight-bold mb-2" style={{ fontSize: '15px', lineHeight: '1.5', color: '#2C1A11', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        <Link to={`/post/${post.id}`} className="text-decoration-none" style={{ color: '#1E120C' }}>{post.title}</Link>
                    </h6>
                    <p className="text-muted mb-3" style={{ fontSize: '13px', lineHeight: '1.6', color: '#8C7B6E' }}>
                        {truncate(post.shortDescription || post.content)}
                    </p>
                    <Link to={`/post/${post.id}`} className="text-decoration-none font-weight-bold" style={{ fontSize: '13px', color: '#8C5A3C' }}>
                        Đọc bài viết <i className="fa-solid fa-arrow-right ml-1"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// ===== HomePage =====
const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        Promise.all([
            categoryProductService.getAllCategoryProducts(),
            productService.getAllProducts(),
            blogService.getAllPosts(),
        ])
            .then(([catsData, prodsData, postsData]) => {
                setCategories(catsData);
                setProducts(prodsData);
                setPosts(postsData);
            })
            .catch((err) => console.error('Lỗi tải dữ liệu trang chủ:', err))
            .finally(() => {
                setLoadingProducts(false);
                setLoadingPosts(false);
            });
    }, []);

    const filteredProducts = activeCategoryId
        ? (() => {
            const selectedCategory = categories.find(cat => cat.id === activeCategoryId);
            if (!selectedCategory) return products;
            return products.filter(p => p.categoryName === selectedCategory.name);
        })()
        : products;

    return (
        <div className="bg-white">
            {/* BANNER HERO (giữ nguyên) */}
            <section className="d-flex align-items-center justify-content-center position-relative"
                style={{
                    minHeight: '280px',
                    backgroundImage: `url(${BANNER_IMAGE_URL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(30, 18, 12, 0.6)'
                }}></div>
                <div className="container-fluid text-center py-5 position-relative" style={{ zIndex: 2 }}>
                    <h2 className="display-4 font-weight-bold mb-3" style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#FAF7F2',
                        letterSpacing: '2px',
                        textShadow: '0px 4px 10px rgba(0,0,0,0.3)'
                    }}>
                        Tinh Hoa Tri Thức <span style={{ color: '#C5A880' }}>Xiao</span>
                    </h2>
                    <p className="mb-0" style={{
                        fontSize: '18px',
                        color: '#EAE3D5',
                        letterSpacing: '0.5px',
                        textShadow: '0px 2px 5px rgba(0,0,0,0.2)'
                    }}>
                        Nơi nghệ thuật Specialty Coffee gặp gỡ thư viện sách khai phóng tâm thức.
                    </p>
                </div>
            </section>

            <div className="container-fluid">
                {/* DỊCH VỤ (giữ nguyên) */}
                <section className="py-5">
                    <div className="row text-center">
                        {[
                            { icon: 'fa-truck-fast', title: 'Giao hàng nhanh', desc: 'Miễn phí đơn hàng trên 500k' },
                            { icon: 'fa-rotate-left', title: 'Đổi trả dễ dàng', desc: 'Trong vòng 30 ngày nếu lỗi sản phẩm' },
                            { icon: 'fa-shield-halved', title: 'Thanh toán an toàn', desc: 'Bảo mật thông tin tuyệt đối' },
                            { icon: 'fa-headset', title: 'Hỗ trợ 24/7', desc: 'Hotline luôn sẵn sàng tư vấn' },
                        ].map((service, index) => (
                            <div className="col-md-3 col-6 mb-4" key={index}>
                                <div className="p-3 bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: '70px', height: '70px', border: '1px solid #EAE3D5' }}>
                                    <i className={`fa-solid ${service.icon}`} style={{ fontSize: '28px', color: '#8C5A3C' }}></i>
                                </div>
                                <h6 className="font-weight-bold" style={{ color: '#1E120C' }}>{service.title}</h6>
                                <p className="mb-0" style={{ fontSize: '12px', color: '#8C7B6E' }}>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SẢN PHẨM (sửa lỗi lọc) */}
                <section className="mb-5 px-3 px-md-0">
                    <div className="p-4 shadow-sm rounded" style={{ backgroundColor: '#FAF7F2', border: '1px solid #EAE3D5' }}>
                        {!loadingProducts && (
                            <CategoryTabs categories={categories} activeId={activeCategoryId} onSelect={setActiveCategoryId} />
                        )}
                        <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3" style={{ borderColor: '#C5A880' }}>
                            <div>
                                <h3 className="font-weight-bold mb-0" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#2C1A11', letterSpacing: '1px' }}>Sản Phẩm Nổi Bật</h3>
                                <p className="mb-0" style={{ fontSize: '13px', color: '#8C7B6E' }}>Những mẫu thiết kế được yêu thích nhất tháng này</p>
                            </div>
                            <span style={{ fontSize: '13px', color: '#8C7B6E', fontWeight: '500' }}>Tìm thấy <span className="font-weight-bold" style={{ color: '#8C5A3C' }}>{filteredProducts.length}</span> sản phẩm</span>
                        </div>
                        {loadingProducts ? (
                            <div className="text-center py-5"><div className="spinner-border" style={{ color: '#C5A880' }} role="status"></div><p className="mt-3" style={{ color: '#8C7B6E' }}>Đang tải sản phẩm...</p></div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="alert text-center border py-5" style={{ backgroundColor: '#FAF7F2', borderColor: '#EAE3D5' }}><i className="fa-regular fa-face-frown mb-3" style={{ fontSize: '24px', color: '#C5A880' }}></i><p className="mb-0" style={{ color: '#8C7B6E' }}>Không có sản phẩm nào trong danh mục này.</p></div>
                        ) : (
                            <div className="row g-2 g-md-3">{filteredProducts.map((item) => (<ProductCard key={item.id} item={item} />))}</div>
                        )}
                    </div>
                </section>

                {/* VỀ CHÚNG TÔI (giữ nguyên) */}
                <section className="mb-5 py-4">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="p-4 shadow-sm rounded text-center" style={{ height: '100%', backgroundColor: '#FAF7F2', border: '1px solid #C5A880' }}>
                                <i className="fa-solid fa-crown mb-3" style={{ fontSize: '40px', color: '#C5A880' }}></i>
                                <h3 className="font-weight-bold text-uppercase" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A11' }}>Về Thương Hiệu Xiao</h3>
                                <p className="mt-2" style={{ color: '#5A3A28', fontSize: '14px' }}>Xiao không chỉ là một cửa hàng, mà còn là nơi khơi nguồn cảm hứng sáng tạo. Chúng tôi tự hào mang đến những sản phẩm Specialty Coffee tinh hoa và tri thức của những cuốn sách hay.</p>
                                <a href="/about" className="btn btn-sm mt-2 px-4 shadow-sm" style={{ borderRadius: '0', backgroundColor: '#1E120C', color: '#EAE3D5' }}>Tìm hiểu thêm</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-4 shadow-sm rounded text-center" style={{ height: '100%', backgroundColor: '#EAE3D5', border: '1px solid #C5A880' }}>
                                <i className="fa-solid fa-users mb-3" style={{ fontSize: '40px', color: '#8C5A3C' }}></i>
                                <h4 className="font-weight-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A11' }}>Sứ mệnh của chúng tôi</h4>
                                <p className="mt-2" style={{ color: '#3A281E', fontSize: '14px' }}>Không gian đọc sách và thưởng thức cà phê lý tưởng dành cho các "Skill-Creators". Chúng tôi kiến tạo nên một nơi để bạn chậm lại và nuôi dưỡng tâm thức.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BLOG (sửa Link) */}
                <section className="mb-5 px-3 px-md-0">
                    <div className="text-center mb-4">
                        <h3 className="font-weight-bold text-uppercase mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#2C1A11', letterSpacing: '2px' }}>Tạp Chí Tri Thức</h3>
                        <p style={{ fontSize: '14px', color: '#8C7B6E' }}>Cập nhật những bài viết về phong cách sống và tinh hoa tri thức</p>
                        <div style={{ width: '50px', height: '2px', backgroundColor: '#C5A880', margin: '0 auto' }}></div>
                    </div>
                    {loadingPosts ? (
                        <div className="text-center py-5"><div className="spinner-border" style={{ color: '#C5A880' }} role="status"></div><p className="mt-3" style={{ color: '#8C7B6E' }}>Đang tải tin tức...</p></div>
                    ) : posts.length === 0 ? (
                        <div className="alert text-center border py-4" style={{ backgroundColor: '#FAF7F2', borderColor: '#EAE3D5' }}><p className="mb-0" style={{ color: '#8C7B6E' }}>Chưa có bài viết nào.</p></div>
                    ) : (
                        <div className="row g-3">{posts.slice(0, 3).map((post) => (<PostCard key={post.id} post={post} />))}</div>
                    )}
                    {posts.length > 3 && (
                        <div className="text-center mt-4">
                            <Link to="/blog" className="btn px-5 py-2 shadow-sm" style={{ borderRadius: '0', backgroundColor: '#1E120C', color: '#EAE3D5' }}>
                                Xem tất cả bài viết <i className="fa-solid fa-arrow-right ml-2"></i>
                            </Link>
                        </div>
                    )}
                </section>

                {/* NEWSLETTER (giữ nguyên) */}
                <section className="mb-5 p-4 rounded shadow-sm" style={{ backgroundColor: '#EAE3D5', border: '1px solid #C5A880' }}>
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <h5 className="font-weight-bold" style={{ color: '#2C1A11' }}>Đăng ký nhận tin khuyến mãi</h5>
                            <p className="mb-0" style={{ fontSize: '13px', color: '#5A3A28' }}>Nhận thông tin về sản phẩm mới và các chương trình giảm giá độc quyền.</p>
                        </div>
                        <div className="col-md-5 mt-3 mt-md-0">
                            <div className="input-group shadow-sm">
                                <input type="email" className="form-control" style={{ borderRadius: '0', border: '1px solid #C5A880', backgroundColor: '#FFFFFF' }} placeholder="Nhập địa chỉ Email của bạn" />
                                <div className="input-group-append">
                                    <button className="btn" style={{ borderRadius: '0', backgroundColor: '#1E120C', color: '#FAF7F2', fontWeight: '500' }}>Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;