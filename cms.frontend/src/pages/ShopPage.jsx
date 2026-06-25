// pages/ShopPage.js
import React, { useState, useEffect } from 'react';
import CategoryProductList from '../components/CategoryProductList';
import ProductList from '../components/ProductList';
import categoryProductService from '../services/categoryProductService';

const PRICE_RANGES = [
    { label: 'Tất cả mức giá', min: 0, max: Infinity },
    { label: 'Dưới 100.000đ', min: 0, max: 100000 },
    { label: '100.000đ – 300.000đ', min: 100000, max: 300000 },
    { label: '300.000đ – 500.000đ', min: 300000, max: 500000 },
    { label: 'Trên 500.000đ', min: 500000, max: Infinity },
];

const ShopPage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);

    useEffect(() => {
        categoryProductService.getAllCategoryProducts()
            .then(data => setCategories(data))
            .catch(err => console.error('Lỗi tải danh mục:', err));
    }, []);

    const handleCategorySelect = (id) => {
        setSelectedCategoryId(id);
        setSearchQuery('');
        setPriceRange(PRICE_RANGES[0]);
    };

    const activeFilterCount = [
        searchQuery.trim() !== '',
        priceRange.label !== 'Tất cả mức giá',
    ].filter(Boolean).length;

    return (
        <div className="bg-white">
            {/* Banner */}
            <section
                className="d-flex align-items-center justify-content-center position-relative"
                style={{ minHeight: '180px', backgroundColor: '#1E120C' }}
            >
                <div className="container-fluid text-center py-4 position-relative px-2 px-md-4">
                    <h2
                        className="display-5 font-weight-bold"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', letterSpacing: '2px' }}
                    >
                        Thực Đơn & <span style={{ color: '#C5A880' }}>Thư Viện</span>
                    </h2>
                    <p style={{ color: '#EAE3D5', fontSize: '16px' }}>
                        Khám phá bộ sưu tập sách và cà phê đặc sắc
                    </p>

                    {/* Search bar trong banner */}
                    <div
                        className="mx-auto mt-3 d-flex align-items-center"
                        style={{
                            maxWidth: '480px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(197,168,128,0.6)',
                            borderRadius: '2px',
                            padding: '6px 12px',
                        }}
                    >
                        <i className="fa-solid fa-magnifying-glass" style={{ color: '#C5A880', marginRight: '8px' }}></i>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: '#FAF7F2',
                                fontSize: '14px',
                                flex: 1,
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#C5A880',
                                    cursor: 'pointer',
                                    padding: '0',
                                    lineHeight: 1,
                                }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Nội dung chính */}
            <div className="container-fluid px-2 px-md-4 py-5">
                <div className="row">
                    {/* Cột trái: Danh mục + Lọc giá */}
                    <div className="col-md-3 mb-4">
                        <CategoryProductList
                            activeCategoryId={selectedCategoryId}
                            onSelectCategory={handleCategorySelect}
                        />

                        {/* Bộ lọc giá */}
                        <div className="mt-4">
                            <h6
                                className="font-weight-bold mb-3 pb-2"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: '#2C1A11',
                                    borderBottom: '2px solid #C5A880',
                                    fontSize: '15px',
                                }}
                            >
                                Lọc theo giá
                            </h6>
                            <ul className="list-unstyled mb-0">
                                {PRICE_RANGES.map((range) => {
                                    const isActive = priceRange.label === range.label;
                                    return (
                                        <li key={range.label} className="mb-1">
                                            <button
                                                onClick={() => setPriceRange(range)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: '6px 0',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    color: isActive ? '#8C5A3C' : '#5C4033',
                                                    fontWeight: isActive ? '600' : '400',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        width: '14px',
                                                        height: '14px',
                                                        borderRadius: '50%',
                                                        border: `2px solid ${isActive ? '#8C5A3C' : '#BCAFA0'}`,
                                                        backgroundColor: isActive ? '#8C5A3C' : 'transparent',
                                                        flexShrink: 0,
                                                        display: 'inline-block',
                                                    }}
                                                />
                                                {range.label}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Cột phải: Danh sách sản phẩm */}
                    <div className="col-md-9">
                        <div
                            className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2"
                            style={{ borderColor: '#C5A880' }}
                        >
                            <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A11', marginBottom: 0 }}>
                                Sản phẩm
                            </h4>
                            <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={() => { setSearchQuery(''); setPriceRange(PRICE_RANGES[0]); }}
                                        style={{
                                            fontSize: '12px',
                                            color: '#8C5A3C',
                                            background: 'none',
                                            border: '1px solid #C5A880',
                                            borderRadius: '2px',
                                            padding: '3px 10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <i className="fa-solid fa-rotate-left mr-1"></i> Xóa bộ lọc
                                    </button>
                                )}
                                <span style={{ fontSize: '13px', color: '#8C7B6E' }}>
                                    {searchQuery
                                        ? `Kết quả cho "${searchQuery}"`
                                        : 'Hiển thị tất cả sản phẩm'}
                                </span>
                            </div>
                        </div>

                        <ProductList
                            categoryId={selectedCategoryId}
                            categories={categories}
                            searchQuery={searchQuery}
                            priceMin={priceRange.min}
                            priceMax={priceRange.max}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;