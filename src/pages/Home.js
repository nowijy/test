// import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import '../scss/main/_main.scss';
import Header from "../components/Header";
import Footer from "../components/Footer";

import previewSolution from "../images/sample/main_solution_preview_02.jpg";
import previewUse1 from "../images/sample/main_use_preview_01.jpg";
import previewUse2 from "../images/sample/main_use_preview_02.jpg";
import previewUse3 from "../images/sample/main_use_preview_03.jpg";
import previewUse4 from "../images/sample/main_use_preview_04.jpg";
import previewUse5 from "../images/sample/main_use_preview_05.jpg";
import magazineImg1 from "../images/sample/main_magazine_01.jpg";
import magazineImg2 from "../images/sample/main_magazine_02.jpg";
import magazineImg3 from "../images/sample/main_magazine_03.jpg";
import magazineImg4 from "../images/sample/main_magazine_04.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation, Autoplay, Mousewheel } from "swiper";
// Import Swiper styles
import "swiper/css/bundle";
import _ from 'lodash';

// function Home() {
const Home = (props) => {
    /* home start -- */
    const [loading, setLoading] = useState(true);
   
    /* html 관리 */
    // [2] ID.IM앱 사용하기
    const appIntroMsg = [
        {
            id: 'step1',
            lst_tit: '앱 다운로드',
            lst_txt: ['구글 플레이, 애플 스토어에서', 'ID.IM을 검색 후 설치해 주세요.'],
        },
        {
            id: 'step2',
            lst_tit: '회원가입 & 구독',
            lst_txt: ['회원가입 후 나에게 필요한', 'ID.IM 제품을 구독합니다.'],    
        },
        {
            id: 'step3',
            lst_tit: 'DNA 검사 & 문진',
            lst_txt: ['타고난 나를 확인하기 위한', 'DNA검사와 현재의 나를 분석하기', '위한 문진을 진행해 주세요.'],    
        },
        {
            id: 'step4',
            lst_tit: '종합 솔루션 확인',
            lst_txt: ['DNA와 현재 상태를 종합적으로 분석해', '나에게 필요한 솔루션을 전달해 드려요.'],    
        },
        {
            id: 'step5',
            lst_tit: '맞춤 제품 사용',
            lst_txt: ['나만을 위해 준비된 한 달 사용분의', 'ID.IM 맞춤 제품을 꾸준히 사용합니다.'],    
        },
    ]
    // [3] 서비스
    const serviceMsg = [
        {
            lst_tit: 'skin',
            lst_txt: ['본연의 건강한 피부를 위한', '맞춤 스킨케어'],
            ico_more: '',
        },
        {
            lst_tit: 'hair',
            lst_txt: ['최적화된', '두피모발 솔루션'],
            ico_more: '',
        },
        {
            lst_tit: 'health',
            lst_txt: ['내게 꼭 필요한', '영양소만 간편하게'],
            ico_more: '',
        },
        {
            lst_tit: 'diet',
            lst_txt: ['건강한 핏라인도', '나답게 맞춤으로'],
            ico_more: '',
        },
    ]
    // [4] 매거진
    const magazineMsg = [
        {
            id: 'place',
            lst_info_dt: 'Hip Place',
            lst_info_dd: ['나에게 맞는 힙플레이스를', '소개해 드려요.'],
            img_area: magazineImg1,
        },
        {
            id: 'issue',
            lst_info_dt: 'Issue Item',
            lst_info_dd: ['유행하는 이슈 아이템,', '나에게 맞을지 알려드려요.'],
            img_area: magazineImg2,
        },
        {
            id: 'trend',
            lst_info_dt: 'Trend Now',
            lst_info_dd: ['지금 가장 유행하는 트렌드를 모아봐요.'],
            img_area: magazineImg3,
        },
        {
            id: 'dna',
            lst_info_dt: 'Digging DNA',
            lst_info_dd: ['DNA에 관한 궁금증을 해결해 드려요.'],
            img_area: magazineImg4,
        },
    ]
    
    /* Ref 관리 */
    const directionRef = useRef(null);

    /* State 관리 */
    const [accumulate, setAccumulate] = useState(0);
    /* active class */
    const [headerActive, setHeaderActive] = useState('');
    const [sectionActiveList, setSectionActiveList] = useState(Array.from({ length: 8 }, () => false));
    const [serviceActiveList, setServiceActiveList] = useState(Array.from({ length: 4 }, () => false));

    /* swiper 관리 */
    const [main, setMain] = useState([]);
    const [appIntro, setAppIntro] = useState([]);
    const [magazine, setMagazine] = useState([]);
    /* active class */
    const [mainTotal, setMainTotal] = useState(0);
    const [mainActive, setMainActive] = useState(0);
    const [mainToggle, setMainToggle] = useState(false);

     // 새로고침 시
     useEffect(() => {
        window.onbeforeunload = function() { // 페이지를 벗어나면서
            window.scrollTo(0, 0);
        };
        document.body.style.overflow = 'hidden'; 
        setLoading(false); // 로딩 완료
        return () => {
            window.onbeforeunload = null; // 이벤트 반환
        };
    })

    // reset event
    function btnTopMove() {
        // 이동거리 초기화
        const container = document.querySelector('#container');
        container.style.transform = `translateY(-${0}px)`;
        setAccumulate(0);

        // section class 전체 삭제
        let copy = [...sectionActiveList];
        for(var i = 0; copy.length > i; i++){
            copy[i] = false;
        }
        // 0번째 section class 추가
        copy[0] = true;
        setSectionActiveList(copy);
    }

    useEffect(() => {
        btnTopMove(); // 초기 1번 실행

        // btn_top click event
        const btnTop = document.querySelector('.fix .btn_top');
        btnTop.addEventListener('click', btnTopMove);
        return() => {
            btnTop.removeEventListener('click', btnTopMove);
        }
    }, [])
    
    // scroll, keyup 이벤트
    useEffect(() => {
        // header class 전달
        setHeaderActive( sectionActiveList[0] ? '' : 'slide_on' );

        const scrollDelay = 400; // 대기
        const scrollSpeed = 1000; // 속도
        const innerSectionActiveList = [...sectionActiveList];

        // **** fixSplashFn show&hide 이벤트 **** //
        const fixSplashFn = (() => {
            const fixImgarea = document.querySelector('.fix .img_area');
            const fixSplash = document.querySelector('.fix .splash');
            // active class check
            let copy = [...innerSectionActiveList];
            let currentIndex;
            for(let i = 0; copy.length > i; i++) { 
                if(copy[i]) {
                    currentIndex = i;
                    break;
                }
            }
            // fixSplash show
            if((innerSectionActiveList[1] && directionRef.current === 'down') || (innerSectionActiveList[3] && directionRef.current === 'up')) {
                fixSplash.style.display = 'block';
                setTimeout(() => {
                    fixSplash.style.opacity = 1;    
                }, 300);
            }
            // fixSplash hide
            if((innerSectionActiveList[0] && directionRef.current === 'up') || (innerSectionActiveList[4] && directionRef.current === 'down')) {
                fixSplash.style.opacity = '';
                setTimeout(() => {
                    fixSplash.style.display = '';
                }, 300);
            }
            // 예외
            if(currentIndex === 1 || currentIndex === 2 || currentIndex === 3) {
                fixImgarea.scrollTo({
                    top: 0,
                    left: 0,
                });
                fixImgarea.style.overflow = '';
                if(currentIndex === 2) {
                    fixImgarea.style.overflow = 'hidden';
                }
            } else {
                fixSplash.style.opacity = '';
                setTimeout(() => {
                    fixSplash.style.display = '';
                }, 300);
            }
        })
        fixSplashFn();

        /* --------------------------------------------------------------------------------------
            ***** 순서 1 - fixFn 이벤트: fix splash 내부 스크롤 관련 *****
        -------------------------------------------------------------------------------------- */
        // fullpageFn 이벤트 시간과 맞지 않아서 FixFn 분리하였음
        let isFixed = null; // fixed scroll 이벤트 체크
        const fixFn = ((event) => {
            // isFixed false이면서 이벤트 타겟이 fix 인경우
            if(!isFixed && event.target.closest('.fix')) { 
                const fixImgarea = document.querySelector('.fix .img_area');
                if(innerSectionActiveList[1]) {
                    let offsetTop = fixImgarea.scrollTop;
                    let offsetBottom = fixImgarea.scrollHeight - fixImgarea.scrollTop;
                    const condition1 = (offsetTop === 0 && directionRef.current === 'up');
                    const condition2 = (offsetBottom - fixImgarea.clientHeight <= 10 && directionRef.current === 'down');
                    if(condition1 || condition2){
                        return isFixed = true; // fixIs true로 변경, return 다음 이벤트 실행 X
                    }
                } else {
                    return;
                }
            }
        })
        
        const fixFn_delay = _.debounce((event) => {
            // isFixed false이면서 이벤트 타겟이 fix 인경우
            if(!isFixed && event.target.closest('.fix')) { 
                const activeIndex = appIntro.activeIndex;
                const slides = appIntro.slides;
                const slideTotal = slides.length - 1;
                
                if(innerSectionActiveList[2]) {
                    if(directionRef.current === 'down') {
                        if(activeIndex === slideTotal) {
                            return isFixed = true;
                        }
                        appIntro.slideNext(400);
                    }else if(directionRef.current === 'up') {
                        if(activeIndex === 0) {
                            return isFixed = true;
                        }
                        appIntro.slidePrev(400);
                    }
                } else {
                    return;
                }
            }
        }, scrollDelay)
        

        /* --------------------------------------------------------------------------------------
            ***** 순서 2 - serviceFn 이벤트: service 안에서 scroll 또는 keyup 이벤트 발생 *****
        -------------------------------------------------------------------------------------- */
        let isService = null; // service scroll 이벤트 체크
        const innerServiceActiveList = [...serviceActiveList]; 
        // isService true 상태로 fullpageFn 통과 후, 이벤트 다시 타면서 isService는 다시 null임 
        const serviceFn = _.debounce((event) => {
            if (!isService && innerSectionActiveList[3]) {
                // lst_data li 중에 on이 있는지 확인, 없으면 -1 반환 
                let copy = [...innerServiceActiveList];
                let currentIndex;
                for(let i = 0; copy.length > i; i++) { 
                    if(copy[i]) {
                        currentIndex = i;
                        break;
                    } else {
                        currentIndex = -1;
                    }
                }
                
                if(directionRef.current === 'down') {
                    if(currentIndex < (copy.length - 1)) { // 3보다 작은 경우에만
                        currentIndex += 1; // on class 다음으로 넘기기
                    } else if(currentIndex === (copy.length - 1)) { // 3과 같은 경우
                        return isService = true; // 다음 섹션으로 이동 허가
                    }
                } else if(directionRef.current === 'up') { // -1보다 큰 경우에만
                    if(currentIndex > -1) { // -1보다 큰경우
                        currentIndex -= 1;
                    } else if(currentIndex === -1) { // -1과 같은 경우
                        return isService = true; // 이전 섹션으로 이동 허가
                    }
                }
                
                // lst_data li에서 전체 on 삭제, 해당 li에만 on class 추가
                for(let i = 0; copy.length > i; i++) { 
                    copy[i] = false;
                }
                if (currentIndex !== -1) { // -1이 아닌 경우에만
                    copy[currentIndex] = true;
                }
                setServiceActiveList(copy);
            }
        }, scrollDelay)

        /* --------------------------------------------------------------------------------------
            ***** 순서 3 - fullpageFn 이벤트: 전체 페이지 scroll 또는 keyup 이벤트 발생 *****
        -------------------------------------------------------------------------------------- */
        const fullpageFn = _.debounce((event) => {
            const sections = Array.from(document.querySelectorAll('.section'));
            let copy = [...innerSectionActiveList];
            let thisEl; // 이동 전 section 저장할 변수
            let targetEl; // 이동 후 section 저장할 변수
            let currentIndex;
            for(let i = 0; copy.length > i; i++) { 
                if(copy[i]) {
                    currentIndex = i;
                    thisEl = sections[i];
                    break;
                }
            }
           
            // speed set
            const container = document.querySelector('#container');
            container.style.transition = `transform ${scrollSpeed}ms ease`; 
            let tempAccumulate = accumulate;

            // isfixed가 false이면서 이벤트 타겟이 fix인 경우 실행X
            if(!isFixed && event.target.closest('.fix')) {  
                return;
            }
            // isService가 false이면서 .service 부모 section이 current 경우 실행X
            if (!isService && innerSectionActiveList[3]) { 
                return;
            }
            
            // 이전 타깃 검증
            function validationPrevTarget() {
                if(copy[currentIndex - 1] !== undefined) { // 이전 section이 있다면
                    currentIndex -= 1; // currentIndex 업데이트
                    targetEl = sections[currentIndex]; // 이전 타겟 저장
                    tempAccumulate -= thisEl.scrollHeight; // 현재 타겟 높이만큼 - 이동
                    // 최소 tranform 가능한 0보다 작다면 0으로 set
                    if(tempAccumulate < 0) {
                        tempAccumulate = 0;
                    }
                } else{ // 이전 section 없으면 실행X
                    return;
                }
            }
            // 다음 타깃 검증
            function validationNextTarget() {
                if(copy[currentIndex + 1] !== undefined) { // 다음 section이 있다면
                    currentIndex += 1;
                    targetEl = sections[currentIndex]; // 다음 타겟 저장
                    tempAccumulate += targetEl.scrollHeight; // 다음 타겟 높이만큼 + 이동
                    // 최대 transform 전체높이보다 크다면
                    if(tempAccumulate > (container.scrollHeight - window.innerHeight)) {
                        // gap만큼 삭제후 이동
                        const gap = tempAccumulate - (container.scrollHeight - window.innerHeight);
                        tempAccumulate -= gap;
                    }
                } else{ // 다음 section 없으면 실행X
                    return;
                }
            }

           
            if(directionRef.current === 'down') {
                validationNextTarget();
            } else if(directionRef.current === 'up'){
                validationPrevTarget();
            }

            // 검증 후 결정 값으로 이동
            container.style.transform = `translateY(-${tempAccumulate}px)`;
            setAccumulate(tempAccumulate);

            // section class 전체 삭제
            for(var i = 0; copy.length > i; i++){
                copy[i] = false;
            }
            // n번째 section class 추가
            copy[currentIndex] = true;
            setSectionActiveList(copy);
        }, scrollDelay)
       
        
        let isAppIntro = null;
        let isMagazine = null;
        let appIntroTemp = null;
        let magazineTemp = null;
        /* mainActive === mainTotal 라는 전제하에 실행 */
        function handleScrollandKeyup(event) {
            // 이벤트 방향 저장
            if(event.type === 'wheel'){
                if(event.deltaY > 0) { // scroll Down
                    directionRef.current = 'down';
                } else if(event.deltaY < 0) { // scroll Up
                    directionRef.current = 'up';
                }
            }
            // keyup event
            if(event.type === 'keyup'){
                if (event.key === 'ArrowDown') {
                    directionRef.current = 'down';
                }
                if (event.key === 'ArrowUp') {
                    directionRef.current = 'up';
                }
            }

            /* temp useRef로 변경 필요 */
            if (innerSectionActiveList[2]) {
                const beforeIndex = appIntro.previousIndex;
                const activeIndex = appIntro.activeIndex;
                const slides = appIntro.slides;
                const slideTotal = slides.length - 1;
                
                const condition1 = (beforeIndex === undefined);
                const condition2 = ((appIntroTemp === null || appIntroTemp === 0) && activeIndex === 0 && directionRef.current === 'up');
                const condition3 = ((appIntroTemp === null || appIntroTemp === slideTotal) && activeIndex === slideTotal && directionRef.current === 'down');
                // swiper 이동한적이 없으면 전체 슬라이드 이벤트 바로 적용
                if(condition1 || condition2 || condition3) {
                    isAppIntro = true;
                }
                appIntroTemp = activeIndex;
                if(!isAppIntro) {
                    return;
                }
            } 
            if (innerSectionActiveList[4]) { 
                const beforeIndex = magazine.previousIndex;
                const activeIndex = magazine.activeIndex;
                const slides = magazine.slides;
                const slideTotal = slides.length - 2;
                
                const condition1 = (beforeIndex === undefined);
                const condition2 = ((magazineTemp === null || magazineTemp === 0) && activeIndex === 0 && directionRef.current === 'up');
                const condition3 = ((magazineTemp === null || magazineTemp === slideTotal) && activeIndex === slideTotal && directionRef.current === 'down');
                // swiper 이동한적이 없으면 전체 슬라이드 이벤트 바로 적용
                if(condition1 || condition2 || condition3) {
                    isMagazine = true;
                }
                magazineTemp = activeIndex;
                if(!isMagazine) {
                    return;
                }
            }

            fixFn(event); // 대기시간 X = fix event
            fixFn_delay(event);
            serviceFn(event); // 대기시간 O = service 페이지 event
            fullpageFn(event); // 대기시간 O = 전체 페이지 event
        }
        

        // handleRezise
        const handleRezise = () =>  {
            // scrollHeight
            const container = document.querySelector('#container');
            let tempAccumulate = 0; // resize의 경우에는 누적값을 reset 후 다시 계산
            /* for(var i = 0; pageActive > i; i++){ 
                tempAccumulate += document.querySelectorAll('.section')[i].scrollHeight;
            } */
            container.style.transform = `translateY(-${tempAccumulate}px)`;
            setAccumulate(tempAccumulate);
        };
        
        // main last 아닐경우 event 기능X
        if(mainActive === mainTotal) {
            window.addEventListener('wheel', handleScrollandKeyup, { passive : true });
            window.addEventListener('keyup', handleScrollandKeyup);
        }
        window.addEventListener('resize', handleRezise);
        
        return() => {
            window.removeEventListener('wheel', handleScrollandKeyup);
            window.removeEventListener('keyup', handleScrollandKeyup);
            window.removeEventListener('resize', handleRezise);
        }
    }, [sectionActiveList, accumulate, mainActive, serviceActiveList])

    // main last index check
    const mainSlideChange = (() => {
        if(mainActive === mainTotal) {
            main.autoplay.stop();
            setMainToggle(true);
        }
    })
    
    // main swiper toggle
    const mainToggleOn = ((event) => {
        event.preventDefault();
        if(event.target.className === "btn_toggle") {
            main.autoplay.stop(); // 기능 stop
            setMainToggle(true); // stop&play 버튼
        } else {
            main.autoplay.start(); // 기능 play
            setMainToggle(false); // stop&play 버튼
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

            <Header headerActive={headerActive} />
            {/* container start -- */}
            <div id="container" className="main">
                {/* [0] 첫화면 */}
                <section className={`section ${sectionActiveList[0] ? 'current' : ''}`}>
                    <div className={`visual ${sectionActiveList[0] ? 'on' : ''}`}>
                        {/* swiper start -- */}
                        <div className="swiper swiper-container">
                            <Swiper
                                className=""
                                spaceBetween={0}
                                slidesPerView="auto"
                                navigation={true} // modules
                                pagination={false} // modules, pagination={{clickable: true}} 
                                loop={false}
                                mousewheel={true}
                                modules={[ Navigation, Autoplay, Mousewheel ]}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                onSlideChange={(swiper) => {
                                    setMainActive(swiper.realIndex + 1);
                                }}
                                onSwiper={(swiper) => {
                                    setMain(swiper);
                                    setMainActive(swiper.realIndex + 1);
                                    setMainTotal(swiper.slides.length);
                                }}
                                onSlideChangeTransitionEnd={(swiper) => {
                                    mainSlideChange(swiper);
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
                        {/* -- swiper end */}
                    </div>
                </section>

                {/* [1] 1:1 피부 맞춤 솔루션 */}
                <section className={`section ${sectionActiveList[1] ? 'current' : ''}`}>
                    <div className={`solution ${sectionActiveList[1] ? 'on' : ''}`}>
                        <div className="right_area">
                            <p className="sec_tit">Better way to</p>
                            <p className="sec_tit logo">better me. <span>ID.IM</span></p>
                            <p className="sec_txt">더 나은 나를 위한 더 나은 방법 ID.IM을 시작해요.</p>
                            <p className="sec_link">브랜드 소개 바로가기 <a href="#" className="ico_more"></a></p>
                        </div>
                    </div>
                </section>

                {/* [2] ID.IM앱 사용하기 */}
                <section className={`section ${sectionActiveList[2] ? 'current' : ''}`}>
                    <div className={`app_intro ${sectionActiveList[2] ? 'on' : ''}`}>
                        <div className="left_area">
                            <p className="sec_tit">Step your</p>
                            <p className="sec_tit logo">Beauty up! <span>ID.IM</span></p>
                            <p className="sec_txt">스킨케어부터 헬스, 다이어트까지 <span>나에게 꼭 맞는 세심한 관리를 시작해보세요.</span></p>
                            <p className="sec_link">ID.IM 앱 사용하기 <a href="#" className="ico_more"></a></p>
                        </div>
                        
                        {/* swiper start -- */}
                        <div className="swiper swiper-container">
                            <Swiper
                                className=""
                                spaceBetween={40}
                                slidesPerView='auto'
                                slidesPerGroup={1}
                                slidesOffsetBefore={1300}
                                slidesOffsetAfter={180}
                                speed={400}
                                loop={false}
                                mousewheel={true}
                                autoplay={false}
                                modules={[Mousewheel]}
                                onSwiper={(swiper) => { 
                                    setAppIntro(swiper);
                                }}
                                onSlideChangeTransitionStart={(swiper) =>{
                                    setAppIntro(swiper);
                                    swiper.slides[swiper.previousIndex].classList.add('opacity_on');
                                }}
                            >
                                {appIntroMsg.map((item, idx) => (
                                    <SwiperSlide key={item.id} className={`slide slide${idx+1}`}>
                                        <p className="lst_tit">Step. {(idx+1) < 10 ? ('0' + (idx+1)) : (idx+1)} <span>{item.lst_tit}</span></p>
                                        <p className="lst_txt">
                                            {item.lst_txt[0]}
                                            {item.lst_txt[1] ? (<span>{item.lst_txt[1]}</span>) : ''}
                                            {item.lst_txt[2] ? (<span>{item.lst_txt[2]}</span>) : ''}
                                        </p>
                                    </SwiperSlide>    
                                ))}
                            </Swiper>
                        </div>
                        {/* -- swiper end */}
                    </div>
                </section>

                {/* [3] 서비스 */}
                <section className={`section ${sectionActiveList[3] ? 'current' : ''}`}>
                    <div className={`service ${sectionActiveList[3] ? 'on' : ''}`}>
                        <div className="lst_data">
                            <ul className={`${serviceActiveList[0] ? 'bg1' : serviceActiveList[1] ? 'bg2' : serviceActiveList[2] ? 'bg3' : serviceActiveList[3] ? 'bg4' : ''}`}>
                                {serviceMsg.map((item, idx) => (
                                    <li key={item.lst_tit} className={`${serviceActiveList[idx] ? 'on' : ''}`}>
                                        <p className="lst_tit">{(item.lst_tit).replace(/^[a-z]/, char => char.toUpperCase())}</p>
                                        <p className="lst_txt">
                                            {item.lst_txt[0]}
                                            {item.lst_txt[1] ? (<span>{item.lst_txt[1]}</span>) : ''}
                                        </p>
                                        <a href="#" className="ico_more"></a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* [4] 매거진 */}
                <section className={`section ${sectionActiveList[4] ? 'current' : ''}`}>
                    <div className={`magazine ${sectionActiveList[4] ? 'on' : ''}`}>
                        {/* swiper start -- */}
                        <div className="swiper swiper-container">
                            <Swiper
                                className=""
                                spaceBetween={0}
                                slidesPerView='auto'
                                slidesPerGroup={2}
                                slidesOffsetBefore={0}
                                slidesOffsetAfter={610}
                                speed={600}
                                loop={false}
                                mousewheel={true}
                                autoplay={false}
                                modules={[Mousewheel]}
                                onSwiper={(swiper) => {
                                    setMagazine(swiper);
                                }}
                                onSlideChangeTransitionStart={(swiper) => {
                                    setMagazine(swiper);
                                }}
                            >
                                <SwiperSlide className="slide slide1">
                                    <p className="sec_tit">최신 트렌드부터
                                        <span>라이프스타일 팁까지</span></p>
                                    <p className="sec_txt">ID.IM Magazine을 통해 스킨케어부터 헬스, 다이어트까지
                                        <span>나에게 꼭 맞는 세심한 관리를 시작해보세요.</span>
                                    </p>
                                    <div>
                                        <p className="sec_link">매거진 바로가기 <a href="#" className="ico_more"></a></p>
                                    </div>
                                </SwiperSlide>
                                {magazineMsg.map((item, idx) => (
                                    <SwiperSlide key={item.id} className={`slide slide${idx + 2}`}>
                                        <div className="img_area"><span><img src={item.img_area} alt=""/></span></div>
                                        <dl className="lst_info">
                                            <dt>{item.lst_info_dt}</dt>
                                            <dd>
                                                {item.lst_info_dd[0]}
                                                {item.lst_info_dd[1] ? (<span>{item.lst_info_dd[1]}</span>) : '' }
                                            </dd>
                                        </dl>
                                    </SwiperSlide>
                                ))}
                                <SwiperSlide className={`slide slide${magazineMsg.length+2}`}>
                                    <div className="slide_inner">
                                        <p className="sec_tit logo"><span>ID.IM</span> Magazine</p>
                                        <div>
                                            <p className="sec_link">매거진 바로가기 <a href="#" className="ico_more"></a></p>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                            </Swiper>
                        </div>
                        {/* -- swiper end */}
                    </div>
                </section>

                {/* [5] 앱다운로드 */}
                <section className={`section ${sectionActiveList[5] ? 'current' : ''}`}>
                    <div className={`app_download ${sectionActiveList[5] ? 'on' : ''}`}>
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

                {/* [6] 뉴스레터 */}
                <section className={`section auto_height ${sectionActiveList[6] ? 'current' : ''}`}>
                    <div className={`news ${sectionActiveList[6] ? 'on' : ''}`}>
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
                
                {/* [7] footer*/}
                <section className={`section auto_height ${sectionActiveList[7] ? 'current' : ''}`}>
                    <Footer />
                </section>
            </div>
            {/* -- container end */}

            {/* fix start*/}
            <div className={
                `fix ${sectionActiveList[1] ? 'first_on' : sectionActiveList[2] ? 'second_on' : sectionActiveList[3] ? 'third_on' : sectionActiveList[4] ? 'last_on' : ''}`
            }>
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