// src/pages/BlogPage.js
import React, { useState, useEffect } from 'react';
import BlogCategoryList from '../components/BlogCategoryList';
import PostList from '../components/PostList';
import blogService from '../services/blogService';

const BlogPage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        blogService.getBlogCategories()
            .then(data => setCategories(data))
            .catch(err => console.error('Lỗi tải danh mục blog:', err));
    }, []);

    return (
        <div className="bg-white">
            {/* Banner */}
            <section className="d-flex align-items-center justify-content-center position-relative" style={{ minHeight: '180px', backgroundColor: '#1E120C' }}>
                <div className="container-fluid text-center py-4 position-relative px-2 px-md-4">
                    <h2 className="display-5 font-weight-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#FAF7F2', letterSpacing: '2px' }}>
                        Tạp Chí <span style={{ color: '#C5A880' }}>Tri Thức</span>
                    </h2>
                    <p style={{ color: '#EAE3D5', fontSize: '16px' }}>Cập nhật những bài viết về phong cách sống và tinh hoa tri thức</p>
                </div>
            </section>

            <div className="container-fluid px-2 px-md-4 py-5">
                <div className="row">
                    {/* Cột trái: Chuyên mục */}
                    <div className="col-md-3 mb-4">
                        <BlogCategoryList
                            activeCategoryId={selectedCategoryId}
                            onSelectCategory={setSelectedCategoryId}
                        />
                    </div>

                    {/* Cột phải: Danh sách bài viết */}
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2" style={{ borderColor: '#C5A880' }}>
                            <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A11' }}>Bài viết mới nhất</h4>
                            <span style={{ fontSize: '13px', color: '#8C7B6E' }}>Hiển thị tất cả bài viết</span>
                        </div>
                        <PostList categoryId={selectedCategoryId} categories={categories} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;