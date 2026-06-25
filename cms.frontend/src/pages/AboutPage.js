// src/pages/AboutPage.js
import React, { useState } from 'react';

const VALUES = [
    {
        icon: 'fa-solid fa-book-open',
        title: 'Tri thức là nền tảng',
        desc: 'Mỗi cuốn sách trên kệ đều được chọn lọc kỹ lưỡng — không phải vì bán chạy, mà vì thực sự đáng đọc.',
    },
    {
        icon: 'fa-solid fa-mug-saucer',
        title: 'Cà phê là nghi lễ',
        desc: 'Từ hạt specialty single-origin đến tay barista, mỗi ly là một quá trình — không phải sản phẩm hàng loạt.',
    },
    {
        icon: 'fa-solid fa-seedling',
        title: 'Không gian để chậm lại',
        desc: 'Xiao được thiết kế để bạn ngồi lâu hơn, đọc sâu hơn, và nghĩ rõ hơn — không có nhạc to, không có rush.',
    },
    {
        icon: 'fa-solid fa-people-group',
        title: 'Cộng đồng tư duy',
        desc: 'Các buổi đọc sách, workshop và talkshow định kỳ biến Xiao thành nơi con người gặp nhau vì ý tưởng.',
    },
];

const SPACES = [
    { label: 'Tầng 1 — Thư viện mở', desc: 'Kệ sách từ trần đến sàn, ánh sáng tự nhiên, không gian yên tĩnh tuyệt đối.', icon: 'fa-solid fa-layer-group' },
    { label: 'Tầng 2 — Quầy Brew Bar', desc: 'Không gian mở nhìn xuống đường, nơi barista pha chế theo từng order single-cup.', icon: 'fa-solid fa-flask' },
    { label: 'Phòng Workshop', desc: 'Sức chứa 20 người, đặt lịch trước, dành cho các buổi học, đọc sách nhóm và talkshow.', icon: 'fa-solid fa-chalkboard-user' },
    { label: 'Góc Đọc Riêng', desc: 'Bốn ô nhỏ cách âm với ghế nệm và đèn đọc sách riêng — đặt tối thiểu 2 giờ.', icon: 'fa-solid fa-door-closed' },
];

const TIMELINE = [
    { year: '2019', event: 'Ý tưởng Xiao ra đời trong một căn phòng nhỏ ở quận 3 — một kệ sách, một phin cà phê, và câu hỏi "tại sao hai thứ này chưa ở cùng một chỗ?"' },
    { year: '2020', event: 'Xiao khai trương tại địa điểm đầu tiên với 200 đầu sách và menu 6 loại cà phê specialty. Tuần đầu tiên hết sạch hạt rang.' },
    { year: '2022', event: 'Ra mắt chương trình Hội viên Tri Thức — độc giả mượn sách miễn phí, tham gia workshop và nhận ưu đãi hàng tháng.' },
    { year: '2024', event: 'Mở rộng thêm tầng 2 với Brew Bar chuyên biệt. Bắt đầu nhập khẩu trực tiếp hạt specialty từ Đà Lạt và Ethiopia.' },
    { year: '2026', event: 'Ra mắt Tạp chí Tri Thức trực tuyến và hệ thống đặt sách — thư viện Xiao đi ra ngoài bốn bức tường.' },
];

const CONTACT = [
    { icon: 'fa-solid fa-location-dot', label: 'Địa chỉ', value: '142 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM' },
    { icon: 'fa-solid fa-phone', label: 'Hotline', value: '090.XIAO.CAFE' },
    { icon: 'fa-solid fa-envelope', label: 'Email', value: 'contact@xiao.bookcafe' },
    { icon: 'fa-solid fa-clock', label: 'Giờ mở cửa', value: 'Thứ 2 – Chủ nhật: 07:30 – 22:00' },
];

// ── Divider component ─────────────────────────────────────────────────────────
const SectionDivider = ({ label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '0 0 40px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#EAE3D5' }} />
        <span style={{
            fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
            color: '#C5A880', fontFamily: "'Inter', sans-serif", fontWeight: '600', whiteSpace: 'nowrap',
        }}>
            {label}
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#EAE3D5' }} />
    </div>
);

// ── AboutPage ─────────────────────────────────────────────────────────────────
const AboutPage = () => {
    const [activeSpace, setActiveSpace] = useState(0);

    return (
        <div style={{ backgroundColor: '#FAF7F2', fontFamily: "'Inter', sans-serif" }}>

            {/* ── HERO BANNER ── */}
            <section style={{
                backgroundColor: '#1E120C',
                minHeight: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Decorative lines */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(197,168,128,0.05) 0px, rgba(197,168,128,0.05) 1px, transparent 1px, transparent 80px)',
                    pointerEvents: 'none',
                }} />
                <div className="container-fluid px-2 px-md-5 text-center position-relative">
                    <p style={{
                        fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase',
                        color: '#C5A880', marginBottom: '16px', fontWeight: '600',
                    }}>
                        Xiao — Library & Specialty Brew
                    </p>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        color: '#FAF7F2', fontWeight: '700',
                        lineHeight: '1.2', marginBottom: '20px',
                        letterSpacing: '1px',
                    }}>
                        Không Gian <span style={{ color: '#C5A880', fontStyle: 'italic' }}>Sáng Tạo</span>
                    </h1>
                    <p style={{
                        color: '#BCAFA0', fontSize: '15px', maxWidth: '520px',
                        margin: '0 auto', lineHeight: '1.8',
                    }}>
                        Nơi mỗi trang sách mở ra một cuộc trò chuyện,
                        và mỗi ly cà phê đủ lâu để ý tưởng thành hình.
                    </p>
                </div>
            </section>

            <div className="container-fluid px-2 px-md-5">

                {/* ── CÂU CHUYỆN THƯƠNG HIỆU ── */}
                <section style={{ padding: '72px 0 48px' }}>
                    <SectionDivider label="Câu chuyện" />
                    <div className="row align-items-center" style={{ gap: '0' }}>
                        {/* Timeline */}
                        <div className="col-md-7">
                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                                color: '#2C1A11', marginBottom: '40px', fontWeight: '700',
                            }}>
                                Từ một câu hỏi đơn giản<br />
                                <span style={{ color: '#8C5A3C' }}>đến một không gian sống</span>
                            </h2>
                            <div style={{ position: 'relative', paddingLeft: '28px' }}>
                                {/* Vertical line */}
                                <div style={{
                                    position: 'absolute', left: '6px', top: '8px', bottom: '8px',
                                    width: '2px', backgroundColor: '#EAE3D5',
                                }} />
                                {TIMELINE.map((item, i) => (
                                    <div key={i} style={{ position: 'relative', marginBottom: '32px' }}>
                                        {/* Dot */}
                                        <div style={{
                                            position: 'absolute', left: '-28px', top: '4px',
                                            width: '14px', height: '14px', borderRadius: '50%',
                                            backgroundColor: '#C5A880',
                                            border: '3px solid #FAF7F2',
                                            boxShadow: '0 0 0 2px #C5A880',
                                        }} />
                                        <span style={{
                                            display: 'inline-block',
                                            fontSize: '11px', fontWeight: '700',
                                            letterSpacing: '2px', color: '#C5A880',
                                            marginBottom: '6px',
                                        }}>
                                            {item.year}
                                        </span>
                                        <p style={{
                                            fontSize: '14px', color: '#5C4033',
                                            lineHeight: '1.7', margin: 0,
                                        }}>
                                            {item.event}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="col-md-5 mt-4 mt-md-0">
                            <div style={{
                                backgroundColor: '#1E120C', padding: '40px 32px',
                                marginLeft: '0px',
                            }}>
                                <p style={{
                                    fontSize: '11px', letterSpacing: '3px',
                                    textTransform: 'uppercase', color: '#C5A880',
                                    marginBottom: '32px', fontWeight: '600',
                                }}>
                                    Xiao trong con số
                                </p>
                                {[
                                    { num: '1.200+', label: 'Đầu sách trên kệ' },
                                    { num: '18', label: 'Loại cà phê specialty' },
                                    { num: '3.400+', label: 'Hội viên Tri Thức' },
                                    { num: '120+', label: 'Buổi workshop đã tổ chức' },
                                ].map((s, i) => (
                                    <div key={i} style={{
                                        borderBottom: i < 3 ? '1px solid rgba(197,168,128,0.2)' : 'none',
                                        paddingBottom: i < 3 ? '20px' : '0',
                                        marginBottom: i < 3 ? '20px' : '0',
                                    }}>
                                        <div style={{
                                            fontFamily: "'Playfair Display', serif",
                                            fontSize: '2rem', fontWeight: '700',
                                            color: '#FAF7F2', lineHeight: '1',
                                        }}>
                                            {s.num}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#BCAFA0', marginTop: '4px' }}>
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── GIÁ TRỊ & TRIẾT LÝ ── */}
                <section style={{ padding: '48px 0' }}>
                    <SectionDivider label="Triết lý" />
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                        color: '#2C1A11', marginBottom: '8px', fontWeight: '700',
                        textAlign: 'center',
                    }}>
                        Những điều chúng tôi tin
                    </h2>
                    <p style={{
                        textAlign: 'center', color: '#8C7B6E', fontSize: '14px',
                        marginBottom: '48px',
                    }}>
                        Bốn nguyên tắc định hình mọi quyết định tại Xiao — từ chọn hạt đến chọn sách.
                    </p>
                    <div className="row">
                        {VALUES.map((v, i) => (
                            <div key={i} className="col-md-6 col-lg-3 mb-4">
                                <div style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #EAE3D5',
                                    padding: '32px 24px',
                                    height: '100%',
                                    transition: 'border-color 0.2s, transform 0.2s',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = '#C5A880';
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = '#EAE3D5';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{
                                        width: '44px', height: '44px',
                                        backgroundColor: '#F5EDD8',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '20px',
                                    }}>
                                        <i className={v.icon} style={{ color: '#8C5A3C', fontSize: '1.1rem' }}></i>
                                    </div>
                                    <h6 style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: '15px', fontWeight: '700',
                                        color: '#2C1A11', marginBottom: '12px',
                                    }}>
                                        {v.title}
                                    </h6>
                                    <p style={{
                                        fontSize: '13.5px', color: '#7A6A5A',
                                        lineHeight: '1.7', margin: 0,
                                    }}>
                                        {v.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── KHÔNG GIAN & HÌNH ẢNH ── */}
                <section style={{ padding: '48px 0' }}>
                    <SectionDivider label="Không gian" />
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                        color: '#2C1A11', marginBottom: '8px', fontWeight: '700',
                        textAlign: 'center',
                    }}>
                        Bốn góc của Xiao
                    </h2>
                    <p style={{
                        textAlign: 'center', color: '#8C7B6E', fontSize: '14px',
                        marginBottom: '40px',
                    }}>
                        Mỗi khu vực được thiết kế cho một trạng thái khác nhau của tư duy.
                    </p>

                    {/* Tab buttons */}
                    <div style={{
                        display: 'flex', gap: '0',
                        borderBottom: '2px solid #EAE3D5',
                        marginBottom: '32px',
                        overflowX: 'auto',
                    }}>
                        {SPACES.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveSpace(i)}
                                style={{
                                    background: 'none', border: 'none',
                                    padding: '12px 20px',
                                    fontSize: '13px', fontWeight: activeSpace === i ? '700' : '400',
                                    color: activeSpace === i ? '#8C5A3C' : '#8C7B6E',
                                    borderBottom: activeSpace === i ? '2px solid #8C5A3C' : '2px solid transparent',
                                    marginBottom: '-2px',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.15s',
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                <i className={`${SPACES[i].icon} mr-2`} style={{ fontSize: '12px' }}></i>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="row align-items-center">
                        <div className="col-md-5 mb-4 mb-md-0">
                            {/* Placeholder hình ảnh */}
                            <div style={{
                                backgroundColor: '#1E120C',
                                height: '300px',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                gap: '12px',
                            }}>
                                <i className={SPACES[activeSpace].icon}
                                    style={{ fontSize: '3rem', color: '#C5A880' }}></i>
                                <span style={{
                                    fontSize: '11px', letterSpacing: '2px',
                                    color: '#BCAFA0', textTransform: 'uppercase',
                                }}>
                                    Hình ảnh thực tế
                                </span>
                            </div>
                        </div>
                        <div className="col-md-7 px-md-5">
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '1.5rem', color: '#2C1A11',
                                fontWeight: '700', marginBottom: '16px',
                            }}>
                                {SPACES[activeSpace].label}
                            </h3>
                            <p style={{
                                fontSize: '15px', color: '#5C4033',
                                lineHeight: '1.8', marginBottom: '24px',
                            }}>
                                {SPACES[activeSpace].desc}
                            </p>
                            <a
                            href="/shop"
                            style={{
                                display: 'inline-block',
                                backgroundColor: '#1E120C', color: '#EAE3D5',
                                padding: '10px 24px', fontSize: '12px',
                                letterSpacing: '1px', textTransform: 'uppercase',
                                textDecoration: 'none', fontWeight: '600',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8C5A3C'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1E120C'}
                            >
                            Đặt chỗ ngay →
                        </a>
                    </div>
            </div>
        </section>

                {/* ── ĐỊA CHỈ & LIÊN HỆ ── */ }
    <section style={{ padding: '48px 0 72px' }}>
        <SectionDivider label="Liên hệ" />
        <div className="row">
            <div className="col-md-5 mb-4 mb-md-0">
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    color: '#2C1A11', marginBottom: '8px', fontWeight: '700',
                }}>
                    Tìm chúng tôi
                </h2>
                <p style={{ color: '#8C7B6E', fontSize: '14px', marginBottom: '32px' }}>
                    Xiao nằm ngay trung tâm Quận 3 — bước vào là khác.
                </p>
                {CONTACT.map((c, i) => (
                    <div key={i} style={{
                        display: 'flex', gap: '16px', alignItems: 'flex-start',
                        marginBottom: '20px',
                    }}>
                        <div style={{
                            width: '36px', height: '36px', flexShrink: 0,
                            backgroundColor: '#F5EDD8',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <i className={c.icon} style={{ color: '#8C5A3C', fontSize: '13px' }}></i>
                        </div>
                        <div>
                            <div style={{
                                fontSize: '10px', letterSpacing: '2px',
                                textTransform: 'uppercase', color: '#C5A880',
                                fontWeight: '600', marginBottom: '3px',
                            }}>
                                {c.label}
                            </div>
                            <div style={{ fontSize: '14px', color: '#2C1A11' }}>
                                {c.value}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Social */}
                <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
                    {[
                        { icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
                        { icon: 'fa-brands fa-instagram', label: 'Instagram' },
                        { icon: 'fa-brands fa-tiktok', label: 'TikTok' },
                    ].map((s, i) => (
                        <a key={i} href="#" style={{
                            width: '38px', height: '38px',
                            border: '1px solid #C5A880',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#8C5A3C', textDecoration: 'none',
                            fontSize: '14px', transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#1E120C';
                                e.currentTarget.style.borderColor = '#1E120C';
                                e.currentTarget.style.color = '#C5A880';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.borderColor = '#C5A880';
                                e.currentTarget.style.color = '#8C5A3C';
                            }}
                        >
                            <i className={s.icon}></i>
                        </a>
                    ))}
                </div>
            </div>

            {/* Map placeholder */}
            <div className="col-md-7">
                <div style={{ height: '360px', overflow: 'hidden' }}>
                    <iframe
                        title="Xiao Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4600!2d106.6843!3d10.7763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d4b5b%3A0x1234567890abcdef!2sNguy%E1%BB%85n%20Th%E1%BB%8B%20Minh%20Khai%2C%20Qu%E1%BA%ADn%203%2C%20TP.HCM!5e0!3m2!1svi!2svn!4v1234567890"
                        width="100%"
                        height="360"
                        style={{ border: 0, filter: 'grayscale(20%) sepia(10%)' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    </section>

            </div >

    {/* ── CTA CUỐI TRANG ── */ }
    < section style = {{
    backgroundColor: '#1E120C',
        padding: '64px 0',
            textAlign: 'center',
            }}>
    <div className="container-fluid px-2 px-md-5">
        <p style={{
            fontSize: '11px', letterSpacing: '4px',
            textTransform: 'uppercase', color: '#C5A880',
            marginBottom: '16px', fontWeight: '600',
        }}>
            Hẹn gặp bạn tại Xiao
        </p>
        <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            color: '#FAF7F2', fontWeight: '700',
            marginBottom: '24px',
        }}>
            Một cuốn sách, một ly cà phê —<br />
            <span style={{ color: '#C5A880', fontStyle: 'italic' }}>bắt đầu từ hôm nay.</span>
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/shop" style={{
                backgroundColor: '#C5A880', color: '#1E120C',
                padding: '12px 32px', fontSize: '12px',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                textDecoration: 'none', fontWeight: '700',
            }}>
                Xem thực đơn
            </a>
            <a href="/blog" style={{
                border: '1px solid #C5A880', color: '#C5A880',
                padding: '12px 32px', fontSize: '12px',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                textDecoration: 'none', fontWeight: '600',
            }}>
                Đọc tạp chí
            </a>
        </div>
    </div>
            </section >
        </div >
    );
};

export default AboutPage;