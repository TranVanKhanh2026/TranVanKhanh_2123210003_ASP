import React from 'react';

const Footer = () => {
    const footerStyles = {
        container: {
            backgroundColor: '#1E120C', // Nâu tối Espresso nguyên bản
            color: '#DFD8CE',           // Chữ màu kem nhạt
            borderTop: '3px solid #C5A880', // Viền mạ vàng mờ
            fontFamily: "'Inter', sans-serif"
        },
        brandTitle: {
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: '700',
            letterSpacing: '4px',
            fontSize: '1.6rem',
            color: '#FAF7F2'
        },
        brandSubtitle: {
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#C5A880',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: '-2px',
            marginBottom: '15px'
        },
        sectionHeading: {
            fontFamily: "'Playfair Display', Georgia, serif",
            color: '#FAF7F2',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '1.5px',
            borderBottom: '1px solid #8C5A3C',
            paddingBottom: '8px',
            marginBottom: '18px'
        },
        link: {
            color: '#DFD8CE',
            fontSize: '13px',
            transition: 'all 0.3s',
            textDecoration: 'none'
        },
        icon: {
            color: '#C5A880',
            fontSize: '10px'
        }
    };

    return (
        <footer style={footerStyles.container} className="mt-5 pt-5 pb-4">
            <div className="container-fluid">
                <div className="row">
                    {/* CỘT 1: THƯƠNG HIỆU & KHÁI NIỆM TRÍ TUỆ */}
                    <div className="col-md-4 mb-4">
                        <div className="d-flex flex-column">
                            <span style={footerStyles.brandTitle}>Xiao</span>
                            <span style={footerStyles.brandSubtitle}>Library & Specialty Brew Studio</span>
                        </div>
                        <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#BCAFA0' }}>
                            Không gian nuôi dưỡng tư duy sáng tạo cho những "Skill-Creators". Sự kết hợp hài hòa giữa nghệ thuật chiết xuất Specialty Coffee hàng đầu và thư viện sách tinh hoa khai phóng tâm thức.
                        </p>
                    </div>

                    {/* CỘT 2: CHÍNH SÁCH ĐỘC GIẢ & HỘI VIÊN */}
                    <div className="col-md-4 mb-4">
                        <h6 className="text-uppercase" style={footerStyles.sectionHeading}>
                            Nội Quy & Tiện Ích
                        </h6>
                        <ul className="list-unstyled">
                            {[
                                'Chính sách hội viên Xiao Club',
                                'Nội quy phòng đọc yên tĩnh',
                                'Đặt phòng Studio & Họp nhóm',
                                'Điều khoản sử dụng Không Gian Số',
                            ].map((item) => (
                                <li key={item} className="mb-2">
                                    <a
                                        href="/"
                                        style={footerStyles.link}
                                        onMouseEnter={(e) => e.target.style.color = '#C5A880'}
                                        onMouseLeave={(e) => e.target.style.color = '#DFD8CE'}
                                    >
                                        <i className="fa-solid fa-feather mr-2" style={footerStyles.icon}></i>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CỘT 3: THÔNG TIN LIÊN LẠC CỦA THƯ VIỆN */}
                    <div className="col-md-4 mb-4">
                        <h6 className="text-uppercase" style={footerStyles.sectionHeading}>
                            Liên Hệ Với Xiao
                        </h6>
                        <ul className="list-unstyled" style={{ color: '#BCAFA0', fontSize: '13px' }}>
                            <li className="mb-3 d-flex align-items-start">
                                <i className="fa-solid fa-map-location-dot mr-3 mt-1" style={{ color: '#C5A880', fontSize: '14px' }}></i>
                                <span>Trụ sở chính: 18A Phố Tri Thức, Phường Cổ Điển, Quận Sáng Tạo Số, TP. Hồ Chí Minh</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <i className="fa-solid fa-phone-volume mr-3" style={{ color: '#C5A880', fontSize: '14px' }}></i>
                                <span>Hotline: 090.XIAO.CAF</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <i className="fa-solid fa-envelope-open-text mr-3" style={{ color: '#C5A880', fontSize: '14px' }}></i>
                                <span>Hòm thư điện tử: contact@xiao.bookcafe</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BẢN QUYỀN VÀ TRUYỀN THÔNG XÃ HỘI */}
                <div className="border-top pt-4 mt-3 text-center" style={{ borderColor: '#3A281E !important' }}>
                    <div className="d-flex justify-content-center mb-3" style={{ gap: '20px' }}>
                        <a href="#" className="text-decoration-none" style={{ color: '#C5A880', fontSize: '15px' }}><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="text-decoration-none" style={{ color: '#C5A880', fontSize: '15px' }}><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="text-decoration-none" style={{ color: '#C5A880', fontSize: '15px' }}><i className="fa-solid fa-paper-plane"></i></a>
                    </div>
                    <p className="mb-0" style={{ fontSize: '12px', color: '#8C7B6E', letterSpacing: '0.5px' }}>
                        © 2026 <span style={{ color: '#C5A880', fontWeight: '500' }}>Xiao Book Cafe</span>. Bảo lưu mọi quyền tự học và kiến tạo nội dung độc bản.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;