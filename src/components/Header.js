import "../scss/common/_header.scss";
import "../scss/common/_fix.scss";

const Header = (props) => {
    const headerActive = props.headerActive;
    return (
        <header className={`header ${headerActive}`}>
            <h1 className="logo"><a href="#">ID.IM</a></h1>
            <nav className="gnb_nav">
                <ul>
                    <li><a href="#">브랜드 소개</a></li>
                    <li><a href="#">이용방법</a></li>
                    <li><a href="#">R&D</a></li>
                    <li><a className="point" href="#">제품</a></li>
                    <li><a className="point" href="#">매거진</a></li>
                    <li><a className="point" href="#">공지</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;