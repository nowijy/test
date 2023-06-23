// import { Link } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import '../scss/main/_main.scss';
import Header from "../components/Header";
import Footer from "../components/Footer";

import previewSolution from "../images/sample/main_solution_preview_02.jpg";
import previewUse1 from "../images/sample/main_use_preview_01.jpg";
import previewUse2 from "../images/sample/main_use_preview_02.jpg";
import previewUse3 from "../images/sample/main_use_preview_03.jpg";
import previewUse4 from "../images/sample/main_use_preview_04.jpg";
import previewUse5 from "../images/sample/main_use_preview_05.jpg";

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
    const [main, setMain] = useState([]);
    const [mainTotal, setMainTotal] = useState(0);
    const [mainToggle, setMainToggle] = useState(false);

    useEffect(() => {
        window.onbeforeunload = function() {
            window.scrollTo(0, 0);
        };
        if(window.scrollY !== 0) {
            window.scrollTo(0, 0);
        }
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            setLoading(false); // 로딩 완료
        }, 300)
        
        return () => {
            window.onbeforeunload = null;
        };
    })
    
    const [mainActive, setMainActive] = useState(0);
    const [pageActive, setPageActive] = useState(0);
    const [accumulate, setAccumulate] = useState(0);
    
    // const [serviceNum, setServiceNum] = useState(0);
    // const [isService, setIsService] = useState(null);
    // const [isFixed, setIsFixed] = useState(null);

    // addClass('.section', 'on');
    function addClass(selector, className) {
        const element = document.querySelector(selector);
        if(element) {
            element.classList.add(className);
        }
    }
    // removeClass('.section', 'on');
    function removeClass(selector, className) {
        const element = document.querySelector(selector);
        if(element) {
            element.classList.remove(className);
        }
    }

    // click 이벤트
    useEffect(() => {
        const btnTop = document.querySelector('.fix .btn_top');
        // btn_top click event
        function btnTopMove() {
            // 모두 0으로 reset
            const container = document.querySelector('#container');
            container.style.transform = `translateY(-${0}px)`;
            setAccumulate(0);
            setPageActive(0);

            for(var i = 0; document.querySelectorAll('.section').length > i; i++){
                document.querySelectorAll('.section')[i].classList.remove('current');
            }
            document.querySelectorAll('.section')[0].classList.add('current');
        }
        btnTop.addEventListener('click', btnTopMove);
        return() => {
            btnTop.removeEventListener('click', btnTopMove);
        }
    }, [])

    // pageActive 이벤트
    useEffect(() => {        
        const sections = Array.from(document.querySelectorAll('.section'));
        const currentSection = document.querySelector('.section.current') || document.querySelectorAll('.section')[0].classList.add('current'); 
        let currentIndex = sections.indexOf(currentSection);
        setPageActive(currentIndex);

        const on = 'on';
        if(pageActive === 0) {
            removeClass('#wrap', 'slide_on');
            addClass('.section .visual', on);
        } else if(pageActive === 1) {
            addClass('.section .solution', on);
        } else if(pageActive === 2) {
            addClass('.section .app_intro', on);
            addClass('.fix', 'second_on');
        } else if(pageActive === 3) {
            addClass('.section .service', on);
            addClass('.fix', 'third_on');
        } else if(pageActive === 4) {
            addClass('.section .magazine', on);
        } else if(pageActive === 5) {
            addClass('.section .app_download', on);
        } else if(pageActive === 6) {
            addClass('.section .news', on);
        } else if(pageActive === 7) {
            addClass('.section .footer', on);
        }
        addClass('#wrap', 'slide_on');
    }, [pageActive])

    // scroll, keyup 이벤트
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('.section'));
        const scrollDelay = 400; // 대기
        const scrollSpeed = 1000; // 속도
        let direction = null; // 이벤트 방향 체크
        
        // fixed 이벤트
        const fix = document.querySelector('.fix');
        const fixSplash = document.querySelector('.fix .splash');
        fix.className = 'fix';
        let isFixed = null; // fixed scroll 이벤트 체크
        const fixFn = ((event) => {
            if(!isFixed && event.target.closest('.fix')) { 
                const fixImgarea = document.querySelector('.fix .img_area');
                let offsetTop = fixImgarea.scrollTop;
                let offsetBottom = fixImgarea.scrollHeight - fixImgarea.scrollTop;
                if(offsetTop === 0  && direction === 'up'){
                    if(!isFixed) { // fixIs true not
                        return isFixed = true; // fixIs true로 변경, return 다음 이벤트 실행 X
                    }
                }
                if(offsetBottom - fixImgarea.clientHeight <= 10 && direction === 'down') {
                    if(!isFixed) { // fixIs true not
                        return isFixed = true; // fixIs true로 변경, return 다음 이벤트 실행 X
                    }
                }
            }
        })

        // service 이벤트
        let serviceNum = -1; // 기본값
        let isService = null; // service scroll 이벤트 체크
        const serviceFn = ((event) => {
             // service class가 current일 경우
            let serviceSection = document.querySelector('.section .service').closest('.section').className;
            if(!isService && document.querySelector('.section.current .service')) {
                const serviceList = document.querySelectorAll('.section .service .lst_data li');
                // on이 없을경우 ul class 삭제
                // if(isService === -1) {
                //     document.querySelector('.section .service .lst_data ul').className = '';
                // }
                // on이 있는경우 on 전체삭제
                // for(let i = 0; serviceList.length > i; i++) { 
                //     serviceList[i].classList.remove('on');
                // }

                if(direction === 'down') {
                    if(serviceNum === (serviceList.length - 1)) { // 3이면
                        serviceNum = serviceList.length - 1;
                    }
                } else if(direction === 'up') {
                    if(serviceNum === -1) {
                        serviceNum = -1;
                    }
                }

                
                // lst에 해당하는 요소가 있는지 확인후 addclass on // -1도 아니고 4도 아닌 경우
                // if(serviceList?.[serviceNum]) { 
                //     serviceList[serviceNum].classList.add('on');
                //     document.querySelector('.section .service .lst_data ul').className = 'bg' + (serviceNum + 1);
                // }
            }
        })
        
        const fullpageFn = _.debounce((event) => {
            // 이동 전 저장할 변수
            const thisEl = document.querySelector('.section.current');
            // 이동 후 위치의 대상 저장할 변수
            let targetEl = thisEl;
            
            // speed set
            const container = document.querySelector('#container');
            container.style.transition = `transform ${scrollSpeed}ms ease`; 
            let tempAccumulate = accumulate;

            if(!isFixed && event.target.closest('.fix')) { 
                return;
            }
            if(!isService && document.querySelector('.section.current .service')) {
                return;
            }

            // 다음 타깃 검증
            function validationNextTarget() { 
                if(thisEl.nextSibling) { // 다음 section이 있다면
                    targetEl = thisEl.nextSibling;
                    tempAccumulate += thisEl.scrollHeight;
                    // 최대 transform 가능한 거리보다 크다면
                    if(tempAccumulate > (container.scrollHeight - window.innerHeight)) { 
                        // gap만큼 삭제후 이동
                        const gap = tempAccumulate - (container.scrollHeight - window.innerHeight);
                        tempAccumulate -= gap;
                    }
                }
            }
            // 이전 타깃 검증
            function validationPrevTarget() {
                if(thisEl.previousSibling) { // 이전 section이 있다면
                    targetEl = thisEl.previousSibling;
                    tempAccumulate -= thisEl.scrollHeight;
                    // 최소 tranform 가능한 0보다 작다면 0으로 set
                    if(tempAccumulate < 0) {
                        tempAccumulate = 0;
                    }
                }
            }

            
            // is fixed 상태가 true이면서 fix가 아닐때만 통과됨, 다시 is fixed는 false로

            if(direction === 'down') {
                validationNextTarget();
            } else if(direction === 'up'){
                validationPrevTarget();
            }

            let beforeIndex = sections.indexOf(thisEl); // 이동 후 인덱스 = currentIndex, 이동 전 인덱스 = beforeIndex
            // fixSplash show
            if((beforeIndex === 0 && direction === 'down') || (beforeIndex === 4 && direction === 'up')) {
                fixSplash.style.display = 'block';
                setTimeout(() => {
                    fixSplash.style.opacity = 1;
                }, 300);
            }
            // fixSplash hide
            if((beforeIndex === 1 && direction === 'up') || (beforeIndex === 3 && direction === 'down')) {
                fixSplash.style.opacity = '';
                setTimeout(() => {
                    fixSplash.style.display = '';
                }, 300);
            }
            
            // 검증 후 결정 값으로 이동
            container.style.transform = `translateY(-${tempAccumulate}px)`;
            // .section = .current 전체 삭제, target .current 추가
            for(var i = 0; document.querySelectorAll('.section').length > i; i++){
                document.querySelectorAll('.section')[i].classList.remove('current');
            }
            targetEl.classList.add('current');
            setAccumulate(tempAccumulate);
        
        }, scrollDelay)
        
        function handleScrollandKeyup(event) {
            // 이벤트 방향 저장
            if(event.type === 'wheel'){
                if(event.deltaY > 0) { // scroll Down
                    direction = 'down';
                } else if(event.deltaY < 0) { // scroll Up
                    direction = 'up';
                }
            }
            // keyup event
            if(event.type === 'keyup'){
                if (event.isComposing || event.keyCode === 40) {
                    direction = 'down';
                }
                if (event.isComposing || event.keyCode === 38) {
                    direction = 'up';
                }
            }
            serviceFn(event);
            fixFn(event); // 대기시간 X = fix event
            fullpageFn(event); // 대기시간 O = 전체 페이지 event
        }
        

        // handleRezise
        const handleRezise = () =>  {
            // scrollHeight
            const container = document.querySelector('#container');
            let tempAccumulate = 0; // resize의 경우에는 누적값을 reset 후 다시 계산
            for(var i = 0; pageActive > i; i++){ 
                tempAccumulate += document.querySelectorAll('.section')[i].scrollHeight;
            }
            container.style.transform = `translateY(-${tempAccumulate}px)`;
            setAccumulate(tempAccumulate);
        };
        window.addEventListener('resize', handleRezise);
    
        // main last 아닐경우 event 발동X
        if(mainActive === mainTotal) {
            window.addEventListener('wheel', handleScrollandKeyup, { passive : true });
            window.addEventListener('keyup', handleScrollandKeyup);
        }
        return() => {
            window.removeEventListener('wheel', handleScrollandKeyup);
            window.removeEventListener('keyup', handleScrollandKeyup);
            window.addEventListener('resize', handleRezise);
        }
    }, [pageActive, mainActive, accumulate])

    // main last index check
    const swiperSlideChange = (() => {
        if(mainActive === mainTotal) {
            main.autoplay.stop();
            setMainToggle(true);
        }
    })

    // main swiper toggle
    const mainToggleOn = ((event) => {
        event.preventDefault();
        if(event.target.className === "btn_toggle") {
            main.autoplay.stop();
            setMainToggle(true);
        } else {
            main.autoplay.start();
            setMainToggle(false);
        }
    })

    return (
        <>
            {
                loading ? (
                    <>
                        <div className="loading">
                            <div>
                                <div className="box_wrap">
                                    <div className="box">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div className="box">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div className="box">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div className="box">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <span className="message">. . .</span>
                            </div>
                        </div>
                    </>
                ) : null
            }

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
                                    setMainActive(swiper.realIndex + 1);
                                }}
                                onSwiper={(swiper) => {
                                    setMain(swiper);
                                    setMainActive(swiper.realIndex + 1);
                                    setMainTotal(swiper.slides.length);
                                }}
                                onSlideChangeTransitionEnd={(swiper) => {
                                    swiperSlideChange(swiper);
                                }}
                                navigation={true} // modules
                                pagination={false} // modules, pagination={{clickable: true}} 
                                loop={false}
                                mousewheel={true}
                                modules={[ Navigation, Autoplay, Mousewheel ]}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                            >
                                {/* 슬라이드 생성된 경우 -> 렌더링 */}
                                <div className="fix_message"> {/* 고정 메시지 */}
                                    <div className="count">
                                        <span className="current">{mainActive}</span> {/* current */}
                                        <span className="total">{mainTotal}</span> {/* total */}
                                        <a href="#" className={mainToggle ? "btn_toggle btn_play" : "btn_toggle"} onClick={mainToggleOn}>stop</a> {/* stop */}
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
                <section className="section auto_height">
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
                
                <section className="section auto_height">
                    <Footer />
                </section>
            </div>
            {/* -- container end */}

            {/* fix start*/}
            <div className="fix">
                {/* splash */}
                <div className="splash">
                    <div className="splash_hd">
                        <p className="logo">ID.IM</p>
                        <p className="menu"></p>
                    </div>
                    <div className="img_area">
                        <div className="first_img"><img src={previewSolution} alt=""/></div>
                        <div className="second_img">
                            <ul>
                                <li><img src={previewUse1} alt=""/></li>
                                <li><img src={previewUse2} alt=""/></li>
                                <li><img src={previewUse3} alt=""/></li>
                                <li><img src={previewUse4} alt=""/></li>
                                <li><img src={previewUse5} alt=""/></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* sticky */}
                <div className="sticky">
                    {/* popup 요소 */}
                    <div className="pop_wrap">
                        <a href="#" className="btn_top">맨 위로 가기</a> 
                        <div className="pop_inner">
                            <i className="ico_logo">ID.IM</i>
                            <div className="message">
                                지금 ID.IM을 구독하면
                                <span>30만원 상당의 DNA 검사가 무료!</span>
                                <a href="#" className="ico_right">DNA 무료검사</a>
                            </div>
                            <a className="ico_close" href="#">닫기</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* fix end */}
        </>
    )
    /* -- home end */
}

export default Home;