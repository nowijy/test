import "../scss/common/_footer.scss";

function Footer() {
    return(
        <footer className="footer">
            <div className="inner">
                <div className="links">
                    <a href="#" className="logo"></a>
                    <ul className="relation">
                        <li><a href="#">개인정보처리방침</a></li>
                        <li><a href="#">이메일 무단 수집 거부</a></li>
                    </ul>
                </div>
                <div className="info">
                    <ul className="address">
                        <li><span className="tit">주식회사</span> 넷마블힐러비</li>
                        <li><span className="tit">사업자등록번호</span> 475-81-02157</li>
                        <li><span className="tit">대표이사</span> 이응주</li>
                        <li><span className="tit">고객센터</span> 1660-1031</li>
                    </ul>
                    <ul className="address">
                        <li><span className="tit">주소</span> 서울시 구로구 디지털로26길 38, G-Tower</li>
                        <li><span className="tit">통신판매업신고번호</span> 제 2021-서울구로-1546 호</li>
                    </ul>
                    <p className="copy">Copyright ⓒ 2022 ID.IM Rights Reserved</p>
                    <ul className="sns">
                        <li className="ico_insta"><a href="#">인스타</a></li>
                        <li className="ico_youtube"><a href="#">유튜브</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;