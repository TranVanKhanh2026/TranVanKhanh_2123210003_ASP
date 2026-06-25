// components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import productService from '../services/productService';

const BASE_URL = 'https://localhost:7078';
const resolveImage = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${BASE_URL}${url}`;
};

const Header = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const searchRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const headerStyles = {
        topBar: { backgroundColor: '#1E120C', color: '#EAE3D5', fontSize: '12.5px', padding: '8px 0', borderBottom: '1px solid #8C5A3C' },
        middleBar: { backgroundColor: '#FAF7F2', borderBottom: '1px solid #EAE3D5' },
        brandTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: '700', letterSpacing: '4px', fontSize: '1.8rem', color: '#2C1A11' },
        brandSubtitle: { fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '3px', color: '#8C5A3C', textTransform: 'uppercase', display: 'block', marginTop: '-2px' },
        searchInput: { borderRadius: '0px', border: '1px solid #C5A880', backgroundColor: '#FFFFFF', fontSize: '13.5px', color: '#2C1A11', outline: 'none', boxShadow: 'none' },
        searchButton: { borderRadius: '0px', backgroundColor: '#8C5A3C', borderColor: '#8C5A3C', color: '#FFFFFF' },
        navBar: { backgroundColor: '#FAF7F2', borderBottom: '1px solid #EAE3D5' },
        navLink: { fontFamily: "'Inter', sans-serif", fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '500' }
    };

    const menuItems = [
        { label: 'Trang Chu', path: '/' },
        { label: 'Thuc Don va Thu Vien', path: '/shop' },
        { label: 'Tap Chi Tri Thuc', path: '/blog' },
        { label: 'Khong Gian Sang Tao', path: '/about' },
    ];

    // Load toàn bộ sản phẩm 1 lần duy nhất khi mount
    useEffect(() => {
        setIsLoadingProducts(true);
        productService.getAllProducts()
            .then(data => setAllProducts(data))
            .catch(err => console.error('Lỗi tải sản phẩm:', err))
            .finally(() => setIsLoadingProducts(false));
    }, []);

    // Lọc realtime theo searchText
    useEffect(() => {
        const query = searchText.trim().toLowerCase();
        if (!query) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }
        const filtered = allProducts
            .filter(p =>
                p.name?.toLowerCase().includes(query) ||
                p.categoryName?.toLowerCase().includes(query)
            )
            .slice(0, 6); // Tối đa 6 gợi ý
        setSearchResults(filtered);
        setShowDropdown(true);
    }, [searchText, allProducts]);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectProduct = (product) => {
        // Navigate đến trang chi tiết sản phẩm (tuỳ route của bạn)
        navigate(`/product/${product.id}`);
        setSearchText('');
        setShowDropdown(false);
    };

    const handleSearchSubmit = () => {
        const query = searchText.trim();
        if (!query) return;
        navigate(`/shop?q=${encodeURIComponent(query)}`);
        setSearchText('');
        setShowDropdown(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearchSubmit();
        if (e.key === 'Escape') setShowDropdown(false);
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0);

    return (
        <header>
            {/* Top bar */}
            <div style={headerStyles.topBar}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div>
                        <span className="mr-4">Hotline: 090.XIAO.CAFE</span>
                        <span>Email: contact@xiao.bookcafe</span>
                    </div>
                    <div>
                        <a href="/login" className="text-decoration-none mr-3" style={{ color: '#EAE3D5', fontSize: '12.5px' }}>Dang nhap</a>
                        <span style={{ color: '#8C5A3C' }}>|</span>
                        <a href="/register" className="text-decoration-none ml-3" style={{ color: '#EAE3D5', fontSize: '12.5px' }}>Dang ky hoi vien</a>
                    </div>
                </div>
            </div>

            {/* Middle bar */}
            <div style={headerStyles.middleBar}>
                <div className="container-fluid py-4 d-flex align-items-center justify-content-between">
                    {/* Logo */}
                    <div className="d-flex flex-column" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <span style={headerStyles.brandTitle}>Xiao</span>
                        <span style={headerStyles.brandSubtitle}>Library and Specialty Brew</span>
                    </div>

                    {/* Search với dropdown */}
                    <div ref={searchRef} className="position-relative" style={{ width: '45%' }}>
                        <div className="d-flex">
                            <div className="position-relative flex-fill">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tim kiem hat specialty, sach tinh hoa..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                                    style={headerStyles.searchInput}
                                />
                                {/* Nút xóa */}
                                {searchText && (
                                    <button
                                        onClick={() => { setSearchText(''); setShowDropdown(false); }}
                                        style={{
                                            position: 'absolute', right: '10px', top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none', border: 'none',
                                            color: '#BCAFA0', cursor: 'pointer',
                                            fontSize: '13px', padding: 0, zIndex: 2,
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}
                            </div>
                            <button
                                className="btn px-4"
                                style={headerStyles.searchButton}
                                onClick={handleSearchSubmit}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>

                        {/* ── Dropdown gợi ý ── */}
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 4px)',
                                left: 0,
                                right: 0,
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #EAE3D5',
                                borderTop: '2px solid #8C5A3C',
                                boxShadow: '0 8px 24px rgba(44,26,17,0.12)',
                                zIndex: 9999,
                                maxHeight: '420px',
                                overflowY: 'auto',
                            }}>
                                {searchResults.length === 0 ? (
                                    <div style={{ padding: '20px 16px', textAlign: 'center', color: '#BCAFA0', fontSize: '13px' }}>
                                        <i className="fa-solid fa-box-open mb-2" style={{ fontSize: '1.4rem', display: 'block' }}></i>
                                        Không tìm thấy sản phẩm nào
                                    </div>
                                ) : (
                                    <>
                                        <div style={{
                                            padding: '8px 14px',
                                            fontSize: '11px',
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            color: '#8C7B6E',
                                            borderBottom: '1px solid #EAE3D5',
                                            backgroundColor: '#FAF7F2',
                                        }}>
                                            Gợi ý sản phẩm ({searchResults.length})
                                        </div>

                                        {searchResults.map((product) => {
                                            const imageUrl = resolveImage(product.imageUrl);
                                            const inStock = (product.stockQuantity ?? product.stock ?? 0) > 0;
                                            return (
                                                <div
                                                    key={product.id}
                                                    onClick={() => handleSelectProduct(product)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        padding: '10px 14px',
                                                        cursor: 'pointer',
                                                        borderBottom: '1px solid #F5F0E8',
                                                        transition: 'background 0.15s',
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAF7F2'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                                                >
                                                    {/* Ảnh sản phẩm */}
                                                    <div style={{
                                                        width: '52px', height: '52px', flexShrink: 0,
                                                        backgroundColor: '#EAE3D5', overflow: 'hidden',
                                                    }}>
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={product.name}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <div style={{
                                                                width: '100%', height: '100%',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            }}>
                                                                <i className="fa-solid fa-shirt" style={{ color: '#C5A880', fontSize: '1.2rem' }}></i>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Thông tin */}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{
                                                            fontSize: '13.5px', fontWeight: '600',
                                                            color: '#2C1A11', lineHeight: '1.3',
                                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                        }}>
                                                            {product.name}
                                                        </div>
                                                        <div style={{ fontSize: '11.5px', color: '#8C7B6E', marginTop: '2px' }}>
                                                            {product.categoryName}
                                                        </div>
                                                    </div>

                                                    {/* Giá + tồn kho */}
                                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#8C5A3C' }}>
                                                            {formatPrice(product.price)}
                                                        </div>
                                                        <div style={{
                                                            fontSize: '10px', marginTop: '3px',
                                                            color: inStock ? '#6B8C6B' : '#BCAFA0',
                                                            fontWeight: '500',
                                                        }}>
                                                            {inStock ? '● Còn hàng' : '● Hết hàng'}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Footer: xem tất cả */}
                                        <div
                                            onClick={handleSearchSubmit}
                                            style={{
                                                padding: '10px 14px',
                                                textAlign: 'center',
                                                fontSize: '12.5px',
                                                color: '#8C5A3C',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                borderTop: '1px solid #EAE3D5',
                                                letterSpacing: '0.5px',
                                                backgroundColor: '#FAF7F2',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EAE3D5'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FAF7F2'}
                                        >
                                            Xem tất cả kết quả cho "{searchText}" →
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Cart */}
                    <a href="/cart" className="text-decoration-none position-relative" style={{ fontSize: '1.4rem' }}>
                        <i className="fa-solid fa-mug-saucer" style={{ color: '#8C5A3C' }}></i>
                        <span className="badge position-absolute" style={{ top: '-6px', right: '-8px', fontSize: '9px', backgroundColor: '#C5A880', color: '#1E120C', padding: '3px 6px' }}>0</span>
                    </a>
                </div>
            </div>

            {/* Nav */}
            <nav style={headerStyles.navBar}>
                <div className="container-fluid">
                    <ul className="nav" style={{ gap: '10px' }}>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li className="nav-item" key={item.path}>
                                <a
                                    href={item.path}
                                    className="nav-link px-3 py-3"
                                    style={{
                                        ...headerStyles.navLink,
                                        color: isActive ? '#8C5A3C' : '#2C1A11',
                                        borderBottom: isActive ? '2px solid #8C5A3C' : '2px solid transparent',
                                        fontWeight: isActive ? '700' : '500'
                                    }}
                                    onClick={(e) => { e.preventDefault(); navigate(item.path); }}
                                    >
                                    {item.label}
                                </a>
                                </li>
                    );
                        })}
                </ul>
            </div>
        </nav>
        </header >
    );
};

export default Header;