// import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import '../scss/main/_main.scss';
import Header from "../components/Header";
import Footer from "../components/Footer";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation, Autoplay, Mousewheel } from "swiper";
// Import Swiper styles
import "swiper/css/bundle";

import _ from 'lodash';

function Home() {
    /* home start -- */
    const [loading, setLoading] = useState(true);
    const [mainSwiper, setMainSwiper] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalIndex, setTotalIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {        
        document.body.className = "body_scroll";
        setLoading(false);
    }, [])
    
    // start
    window.onload = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    const swiperToggle = ((event) => {
        if(event.target.className === "btn_toggle") {
            mainSwiper.autoplay.stop();
            setIsActive(true);
        } else {
            mainSwiper.autoplay.start();
            setIsActive(false);
        }
    })
    
    // _.debounce
    const scrollSpeed = 300;
    const scrollEvt = _.debounce((event) => {
        const ts = event.target.closest('section'); 
        const container = document.querySelector('#container');
        
        if(event.deltaY > 0) { // scroll Down
            // console.log('down');
            const ts_down = ts.offsetTop + ts.offsetHeight;
            if(ts.nextSibling) {
                ts.classList.remove('current');
                ts.nextSibling.classList.add('current');
                container.style.transform = `translateY(-${ts_down}px)`;
            }
        } else if(event.deltaY < 0) { // scroll Up
            // console.log('up');
            return ts.previousSibling ? ts.previousSibling.classList.add('current') : false;
        }
    }, scrollSpeed)

    window.addEventListener('wheel', scrollEvt);

    // main slide scrollDown
    // const lastSlideChange = (() => {
        /* if(activeIndex === totalIndex) {
            setIsActive(true);
            mainSwiper.autoplay.stop();
            const visualHeight = `-${document.querySelector('.body_scroll .main .visual').offsetHeight}px`;
            document.querySelector('.body_scroll .main').style.transform = `translate(0, ${visualHeight})`;
        } */
    // })
    
    
    return (
        <>
            {
                loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>  
                        <Header />
                        {/* container start -- */}
                        <div id="container" className="main">
                            {/* 첫화면 */}
                            <section className="section current">
                                <div className="visual">
                                    <div className="swiper swiper-container">
                                        <Swiper
                                            className=""
                                            spaceBetween={0}
                                            slidesPerView="auto"
                                            onSlideChange={(swiper) => {
                                                setActiveIndex(swiper.realIndex + 1);
                                            }}
                                            onSwiper={(swiper) => {
                                                setMainSwiper(swiper);
                                                setActiveIndex(swiper.realIndex + 1);
                                                setTotalIndex(swiper.slides.length);
                                            }}

                                            
                                            navigation={true} // modules
                                            pagination={false} // modules, pagination={{clickable: true}} 
                                            loop={true}
                                            // mousewheel={true}
                                            modules={[ Navigation, Autoplay ]}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                        >
                                            {/* 슬라이드 생성된 경우 -> 렌더링 */}
                                            <div className="fix_message"> {/* 고정 메시지 */}
                                                <div className="count">
                                                    <span className="current">{activeIndex}</span> {/* current */}
                                                    <span className="total">{totalIndex}</span> {/* total */}
                                                    <a href="#" className={isActive ? "btn_toggle btn_play" : "btn_toggle"} onClick={swiperToggle}>stop</a> {/* stop */}
                                                </div>
                                                <p className="msg">당신을 위한</p>
                                                <p className="msg">맞춤 솔루션 <span className="logo">ID.IM</span></p>
                                                <button type="button" className="btn_primary btn_more">ID.IM 시작하기</button>
                                            </div>

                                            <div className="swiper-wrapper">
                                                <SwiperSlide className="slide slide1"></SwiperSlide>
                                                <SwiperSlide className="slide slide2"></SwiperSlide>
                                                <SwiperSlide className="slide slide3"></SwiperSlide>
                                                <SwiperSlide className="slide slide4"></SwiperSlide>
                                            </div>
                                        </Swiper>

                                        <div className="scroll_down">
                                            <p className="txt">SCROLL<span className="bar"></span></p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 1:1 피부 맞춤 솔루션 */}
                            <section className="section">
                                <div className="solution">
                                    <div className="right_area">
                                        <p className="sec_tit">Better way to</p>
                                        <p className="sec_tit logo">better me. <span>ID.IM</span></p>
                                        <p className="sec_txt">더 나은 나를 위한 더 나은 방법 ID.IM을 시작해요.</p>
                                        <p className="sec_link">브랜드 소개 바로가기 <a href="#" className="ico_more"></a></p>
                                    </div>
                                </div>
                            </section>

                            {/* ID.IM앱 사용하기 */}
                            <section className="section">
                                <div className="app_intro">
                                    <div className="left_area">
                                        <p className="sec_tit">Step your</p>
                                        <p className="sec_tit logo">Beauty up! <span>ID.IM</span></p>
                                        <p className="sec_txt">스킨케어부터 헬스, 다이어트까지 <span>나에게 꼭 맞는 세심한 관리를 시작해보세요.</span></p>
                                        <p className="sec_link">ID.IM 앱 사용하기 <a href="#" className="ico_more"></a></p>
                                    </div>
                                    
                                    {/* swiper start -- */}
                                    <div className="swiper swiper-container">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide slide1">
                                                <p className="lst_tit">Step. 01 <span>앱 다운로드</span></p>
                                                <p className="lst_txt">
                                                    구글 플레이, 애플 스토어에서 
                                                    <span>ID.IM을 검색 후 설치해 주세요.</span>
                                                </p>
                                            </div>

                                            <div className="swiper-slide slide2">
                                                <p className="lst_tit">Step. 02 <span>회원가입 & 구독</span></p>
                                                <p className="lst_txt">회원가입 후 나에게 필요한
                                                    <span>ID.IM 제품을 구독합니다.</span>
                                                </p>
                                            </div>

                                            <div className="swiper-slide slide3">
                                                <p className="lst_tit">Step. 03 <span>DNA 검사 & 문진</span></p>
                                                <p className="lst_txt">타고난 나를 확인하기 위한
                                                    <span>DNA검사와 현재의 나를 분석하기</span>
                                                    <span>위한 문진을 진행해 주세요.</span>
                                                </p>
                                            </div>

                                            <div className="swiper-slide slide4">
                                                <p className="lst_tit">Step. 04 <span>종합 솔루션 확인</span></p>
                                                <p className="lst_txt">DNA와 현재 상태를 종합적으로 분석해
                                                    <span>나에게 필요한 솔루션을 전달해 드려요.</span>
                                                </p>
                                            </div>
                                            
                                            <div className="swiper-slide slide5">
                                                <p className="lst_tit">Step. 05 <span>맞춤 제품 사용</span></p>
                                                <p className="lst_txt">나만을 위해 준비된 한 달 사용분의 
                                                    <span>ID.IM 맞춤 제품을 꾸준히 사용합니다.</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* -- swiper end */}
                                </div>
                            </section>

                            {/* 서비스 */}
                            <section className="section">
                                <div className="service">
                                    <div className="lst_data">
                                        <ul>
                                            <li>
                                                <p className="lst_tit">Skin</p>
                                                <p className="lst_txt">본연의 건강한 피부를 위한 <span>맞춤 스킨케어</span></p>
                                                <a href="#" className="ico_more"></a>
                                            </li>
                                            <li>
                                                <p className="lst_tit">Hair</p>
                                                <p className="lst_txt">최적화된 <span>두피모발 솔루션</span></p>
                                                <a href="#" className="ico_more"></a>
                                            </li>
                                            <li>
                                                <p className="lst_tit">Health</p>
                                                <p className="lst_txt">내게 꼭 필요한 <span>영양소만 간편하게</span></p>
                                                <a href="#" className="ico_more"></a>
                                            </li>
                                            <li>
                                                <p className="lst_tit">Diet</p>
                                                <p className="lst_txt">건강한 핏라인도 <span>나답게 맞춤으로</span></p>
                                                <a href="#" className="ico_more"></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 매거진 */}
                            <section className="section"> 
                                <div className="magazine">
                                    {/* swiper start -- */}
                                    <div className="swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide slide1">
                                                <p className="sec_tit">최신 트렌드부터
                                                    <span>라이프스타일 팁까지</span></p>
                                                <p className="sec_txt">ID.IM Magazine을 통해 스킨케어부터 헬스, 다이어트까지
                                                    <span>나에게 꼭 맞는 세심한 관리를 시작해보세요.</span>
                                                </p>
                                                <div>
                                                    <p className="sec_link">매거진 바로가기 <a href="#" className="ico_more"></a></p>
                                                </div>
                                            </div>

                                            <div className="swiper-slide slide2">
                                                <div className="img_area"><span><img src="" alt=""/></span></div>
                                                <dl className="lst_info">
                                                    <dt>Hip Place</dt>
                                                    <dd>나에게 맞는 힙플레이스를
                                                        <span>소개해 드려요.</span>    
                                                    </dd>
                                                </dl>
                                            </div>

                                            <div className="swiper-slide slide3">
                                                <div className="img_area"><span><img src="" alt=""/></span></div>
                                                <dl className="lst_info">
                                                    <dt>Issue Item</dt>
                                                    <dd>유행하는 이슈 아이템,
                                                        <span>나에게 맞을지 알려드려요.</span>
                                                    </dd>
                                                </dl>
                                            </div>

                                            <div className="swiper-slide slide4">
                                                <div className="img_area"><span><img src="" alt=""/></span></div>
                                                <dl className="lst_info">
                                                    <dt>Trend Now</dt>
                                                    <dd>지금 가장 유행하는 트렌드를 모아봐요.</dd>
                                                </dl>
                                            </div>
                                            
                                            <div className="swiper-slide slide5">
                                                <div className="img_area"><span><img src="" alt=""/></span></div>
                                                <dl className="lst_info">
                                                    <dt>Digging DNA</dt>
                                                    <dd>DNA에 관한 궁금증을 해결해 드려요.</dd>
                                                </dl>
                                            </div>

                                            <div className="swiper-slide slide6">
                                                <div className="slide_inner">
                                                    <p className="sec_tit logo"><span>ID.IM</span> Magazine</p>
                                                    <div>
                                                        <p className="sec_link">매거진 바로가기 <a href="#" className="ico_more"></a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* -- swiper end */}
                                </div>
                            </section>

                            {/* 앱다운로드 */}
                            <section className="section">
                                <div className="app_download">
                                    <div className="right_area">
                                        <p className="sec_tit logo">나의 첫 맞춤 케어, <span>ID.IM</span></p>
                                        <p className="sec_txt">지금 ID.IM 구독하고 DNA 검사를 무료로 받아보세요!</p>
                                        <div className="box_link">
                                            <p className="qrcode"><img src="" alt="QR코드"/></p>
                                            <ul>
                                                <li><a href="#" className="ico_appstore">App Store</a></li>
                                                <li><a href="#" className="ico_googleplay">Google Play</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 뉴스레터 */}
                            <section className="section">
                                <div className="news">
                                    <p className="sec_tit logo"><span>ID.IM</span> NEWS LETTER</p>
                                    <p className="sec_txt">뉴스레터 구독하고, ID.IM의 새로운 소식을 만나보세요.</p>

                                    <fieldset className="email_form">
                                        <form action="">
                                            <input type="text" className="form_control" placeholder="Email Address"/>
                                            <button type="button" className="btn_send">이메일 전송</button>
                                        </form>

                                        <label className="input_check">
                                            <input type="checkbox"/>
                                            <span className="label_text">[필수] 개인정보 수집 및 이용 동의</span>
                                        </label>
                                        <label className="input_check">
                                            <input type="checkbox"/>
                                            <span className="label_text">[필수] ID.IM 정보 수신 동의</span>
                                        </label>
                                    </fieldset>
                                </div>
                            </section>
                        </div>
                        <Footer />
                        {/* -- container end */}
                    </>
                ) 
            }
        </>
    )
    /* -- home end */
}

export default Home;