import React, { useState, useEffect, useMemo } from 'react';
import blogService from '../services/blogService';

const BASE_URL = 'https://localhost:7078';

const resolveImage = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${BASE_URL}${url}`;
};

const PostList = ({ categoryId }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                setPosts(data);
            } catch (error) {
                console.error("Lỗi tải bài viết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    
    const filteredPosts = useMemo(() => {
        if (!categoryId) return posts;
        return posts.filter(post => post.categoryId === categoryId);
    }, [posts, categoryId]);

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-secondary" role="status"></div>
                <p className="mt-3 text-muted small">Đang tải bài viết...</p>
            </div>
        );
    }

    if (filteredPosts.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="fa-regular fa-newspaper text-muted" style={{ fontSize: '2.5rem', opacity: 0.3 }}></i>
                <p className="text-muted mt-3 mb-0">Chưa có bài viết nào trong chuyên mục này.</p>
            </div>
        );
    }

    return (
        <div>
            {filteredPosts.map((item) => {
                // ✅ FIX: resolve URL ảnh tương đối
                const imageUrl = resolveImage(item.imageUrl);

                return (
                    <div key={item.id} className="mb-4">
                        <a href={`/post/${item.id}`} className="text-decoration-none d-block" style={{ color: 'inherit' }}>
                            <div
                                className="d-flex bg-white rounded overflow-hidden"
                                style={{
                                    border: '1px solid #EDE8E0',
                                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(30,18,12,0.1)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* ✅ FIX: dùng imageUrl đã resolve */}
                                <div
                                    className="flex-shrink-0"
                                    style={{
                                        width: '160px', minHeight: '120px',
                                        backgroundColor: '#F5F0E8',
                                        overflow: 'hidden', position: 'relative',
                                    }}
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={item.title}
                                            style={{
                                                width: '100%', height: '100%',
                                                objectFit: 'cover',
                                                position: 'absolute', top: 0, left: 0,
                                            }}
                                        />
                                    ) : (
                                        <div
                                            className="d-flex align-items-center justify-content-center h-100"
                                            style={{ color: '#C5A880' }}
                                        >
                                            <i className="fa-regular fa-image" style={{ fontSize: '2rem' }}></i>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="p-3 d-flex flex-column justify-content-between"
                                    style={{ flex: 1, minWidth: 0 }}
                                >
                                    <div>
                                        {item.category && (
                                            <span
                                                className="d-inline-block mb-2"
                                                style={{
                                                    fontSize: '11px', fontWeight: '600',
                                                    color: '#8B6A3E', backgroundColor: '#F5EDD8',
                                                    padding: '2px 10px', borderRadius: '20px',
                                                    letterSpacing: '0.3px', textTransform: 'uppercase',
                                                }}
                                            >
                                                {item.category.name}
                                            </span>
                                        )}
                                        <h5
                                            className="mb-1"
                                            style={{
                                                fontSize: '1rem', fontWeight: '600',
                                                color: '#1E120C',
                                                fontFamily: "'Playfair Display', serif",
                                                lineHeight: '1.4', overflow: 'hidden',
                                                display: '-webkit-box', WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {item.title}
                                        </h5>
                                        <p
                                            className="mb-0"
                                            style={{
                                                fontSize: '0.85rem', color: '#7A6A5A',
                                                lineHeight: '1.5', overflow: 'hidden',
                                                display: '-webkit-box', WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {item.shortDescription || 'Nhấn để xem nội dung chi tiết bài viết...'}
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <span style={{ fontSize: '12px', color: '#A89880' }}>
                                            <i className="fa-regular fa-calendar-days mr-1"></i>
                                            {new Date(item.createdDate).toLocaleDateString('vi-VN', {
                                                day: '2-digit', month: '2-digit', year: 'numeric',
                                            })}
                                        </span>
                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#C5A880' }}>
                                            Đọc tiếp <i className="fa-solid fa-arrow-right ml-1" style={{ fontSize: '11px' }}></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default PostList;