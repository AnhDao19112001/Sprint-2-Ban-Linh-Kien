import {Link} from "react-router-dom";
import {CiSearch} from "react-icons/ci";
import "bootstrap/dist/css/bootstrap.css";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {IoPersonCircleOutline} from "react-icons/io5";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" alt="" to='/home'>
                        <img
                            src="/favicon.ico"
                            height={70}
                            width={130}
                            alt="AD RACING"
                            loading="lazy"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mob-navbar"
                        aria-label="Toggle"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="mob-navbar">
                        <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
                            <li className="nav-item ms-5">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="nav-item ms-5">
                                <a className="nav-link" href="#">
                                    Liên hệ
                                </a>
                            </li>
                            <li className="nav-item dropdown ms-5">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Danh mục
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Web designing
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Web Development
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            SEO Analysis
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Explore More
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item ms-5">
                                <a className="nav-link" href="#">
                                    Về chúng tôi
                                </a>
                            </li>
                        </ul>
                        <div className="header-right col-lg-6 d-flex align-items-center justify-content-end">
                            <form className="header-search-form for-des">
                                <input
                                    type="search"
                                    id="form-input-home"
                                    className="form-input m-0"
                                    placeholder="Tìm kiếm..."
                                />
                                <button type="submit">
                                    <CiSearch/>
                                </button>
                            </form>
                            <Link to={`/cart`} href="" className="header-btn header-cart ms-2">
                                <AiOutlineShoppingCart color={"#ffffff"} size="2em"/>
                            </Link>
                            <div className={"ms-2"}>
                                <IoPersonCircleOutline color={"#ffffff"} size={30}/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;