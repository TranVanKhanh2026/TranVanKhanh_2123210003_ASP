// components/ProductList.js
import React, { useState, useEffect, useMemo } from 'react';
import productService from '../services/productService';

const BASE_URL = 'https://localhost:7078';

const resolveImage = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${BASE_URL}${url}`;
};

const ProductCard = ({ item }) => {
    const imageUrl = resolveImage(item.imageUrl);
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(item.price || 0);
    const inStock = (item.stockQuantity ?? item.stock ?? 0) > 0;

    return (
        <div className="col-6 col-md-4 col-lg-3 mb-4">
            <div
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid #EAE3D5' }}
            >
                <div
                    className="position-relative bg-light"
                    style={{ paddingTop: '120%', overflow: 'hidden', backgroundColor: '#EAE3D5' }}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={item.name}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        >
                            <i className="fa-solid fa-shirt" style={{ fontSize: '3rem', color: '#8C5A3C' }}></i>
                        </div>
                    )}
                    <span
                        className={`badge position-absolute ${inStock ? 'bg-dark' : 'bg-secondary'}`}
                        style={{
                            top: '12px', left: '12px', fontSize: '10px', padding: '4px 10px',
                            borderRadius: '0', letterSpacing: '0.5px',
                            backgroundColor: inStock ? '#1E120C' : '#BCAFA0',
                        }}
                    >
                        {inStock ? 'Bán chạy' : 'Hết hàng'}
                    </span>
                </div>
                <div className="card-body p-3">
                    <h6
                        className="card-title mb-1 font-weight-bold"
                        style={{
                            fontSize: '14px', lineHeight: '1.4', color: '#2C1A11',
                            display: '-webkit-box', WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}
                    >
                        {item.name}
                    </h6>
                    <p className="font-weight-bold mb-0" style={{ fontSize: '14px', color: '#8C5A3C', marginTop: '6px' }}>
                        {formattedPrice}
                    </p>
                </div>
                <div className="card-footer bg-white border-top-0 pt-0 pb-3 px-3">
                    <div className="d-flex" style={{ gap: '6px' }}>
                        <button
                            className="btn btn-sm btn-outline-dark flex-fill"
                            style={{ fontSize: '12px', borderRadius: '0', fontWeight: '500', borderColor: '#C5A880' }}
                        >
                            <i className="fa-regular fa-eye mr-1"></i> Chi tiết
                        </button>
                        <button
                            className="btn btn-sm flex-fill"
                            style={{
                                fontSize: '12px', borderRadius: '0', fontWeight: '500',
                                backgroundColor: '#1E120C', color: '#EAE3D5', borderColor: '#1E120C',
                            }}
                            disabled={!inStock}
                        >
                            <i className="fa-solid fa-cart-plus mr-1"></i> Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── ProductList ───────────────────────────────────────────────────────────────
const ProductList = ({
    categoryId,
    categories = [],
    searchQuery = '',
    priceMin = 0,
    priceMax = Infinity,
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi tải sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        let result = products;

        // 1. Lọc theo danh mục
        if (categoryId && categories.length > 0) {
            const selectedCategory = categories.find(cat => cat.id === categoryId);
            if (selectedCategory) {
                result = result.filter(p => p.categoryName === selectedCategory.name);
            }
        }

        // 2. Lọc theo từ khóa tìm kiếm (không phân biệt hoa/thường, bỏ dấu cũng OK)
        const query = searchQuery.trim().toLowerCase();
        if (query) {
            result = result.filter(p =>
                p.name?.toLowerCase().includes(query) ||
                p.categoryName?.toLowerCase().includes(query) ||
                p.description?.toLowerCase().includes(query)
            );
        }

        // 3. Lọc theo khoảng giá
        result = result.filter(p => {
            const price = p.price ?? 0;
            return price >= priceMin && price <= priceMax;
        });

        return result;
    }, [products, categoryId, categories, searchQuery, priceMin, priceMax]);

    if (loading) {
        return <div className="text-center my-4">Đang tải sản phẩm...</div>;
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="fa-solid fa-box-open mb-3" style={{ fontSize: '2.5rem', color: '#BCAFA0' }}></i>
                <p className="text-muted mb-0">Không tìm thấy sản phẩm phù hợp.</p>
                <p style={{ fontSize: '13px', color: '#BCAFA0' }}>Thử thay đổi từ khóa hoặc bộ lọc giá.</p>
            </div>
        );
    }

    return (
        <div className="row g-3">
            {filteredProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ProductList;