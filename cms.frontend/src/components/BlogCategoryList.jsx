// src/components/BlogCategoryList.js
import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';

const BlogCategoryList = ({ activeCategoryId, onSelectCategory }) => {
    const [blogCategories, setBlogCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogCategories = async () => {
            try {
                setLoading(true);
                const data = await blogService.getBlogCategories();
                setBlogCategories(data);
            } catch (error) {
                console.error("Lỗi tải danh mục:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogCategories();
    }, []);

    const itemStyle = (isActive) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        cursor: 'pointer',
        borderRadius: '6px',
        marginBottom: '2px',
        fontSize: '0.9rem',
        fontWeight: isActive ? '600' : '400',
        color: isActive ? '#FAF7F2' : '#4A3728',
        backgroundColor: isActive ? '#1E120C' : 'transparent',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        transition: 'background-color 0.15s ease'
    });

    return (
        <div
            className="bg-white rounded"
            style={{ border: '1px solid #EDE8E0', overflow: 'hidden' }}
        >
            {/* Header */}
            <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #EDE8E0' }}>
                <h6
                    className="mb-0 text-uppercase"
                    style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        color: '#8B6A3E'
                    }}
                >
                    <i className="fa-solid fa-layer-group mr-2"></i> Chuyên mục
                </h6>
            </div>

            {/* Danh sách */}
            <div style={{ padding: '8px' }}>
                {loading ? (
                    <div className="text-center py-3">
                        <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
                    </div>
                ) : (
                    <>
                        <button
                            style={itemStyle(activeCategoryId === null)}
                            onClick={() => onSelectCategory(null)}
                            onMouseEnter={e => {
                                if (activeCategoryId !== null) e.currentTarget.style.backgroundColor = '#F5F0E8';
                            }}
                            onMouseLeave={e => {
                                if (activeCategoryId !== null) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <span>Tất cả bài viết</span>
                            {activeCategoryId === null && (
                                <i className="fa-solid fa-check" style={{ fontSize: '0.75rem' }}></i>
                            )}
                        </button>

                        {blogCategories.length === 0 ? (
                            <p className="text-center text-muted small py-2">Không có chuyên mục nào.</p>
                        ) : (
                            blogCategories.map((cate) => (
                                <button
                                    key={cate.id}
                                    style={itemStyle(activeCategoryId === cate.id)}
                                    onClick={() => onSelectCategory(cate.id)}
                                    onMouseEnter={e => {
                                        if (activeCategoryId !== cate.id) e.currentTarget.style.backgroundColor = '#F5F0E8';
                                    }}
                                    onMouseLeave={e => {
                                        if (activeCategoryId !== cate.id) e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <span>{cate.name}</span>
                                    {activeCategoryId === cate.id && (
                                        <i className="fa-solid fa-check" style={{ fontSize: '0.75rem' }}></i>
                                    )}
                                </button>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogCategoryList;