import {Link, NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as userService from "../../service/user/UserService"
import Swal from "sweetalert2";
import * as typeProduct from "../../service/type/TypeProduct";
import {CiSearch} from "react-icons/ci";
import { MdOutlineManageHistory } from "react-icons/md";
import { BiLogOutCircle, BiUserCircle} from "react-icons/bi";
import "../../css/Home.css";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {getAllCarts} from "../order/reduce/cartAction";
import {useDispatch, useSelector} from "react-redux";
const Header = ({ inputSearch, onInputChange }) => {
    const navigate = useNavigate();
    const [JwtToken, setJwtToken] = useState(localStorage.getItem("JWT"));
    const [userName, setUserName] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [userId, setUserId] = useState("");
    const [nameType, setNameType] = useState([]);
    const roleAdmin = userService.checkRollAppUser("ROLE_ADMIN");
    const carts = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();

    const getUserName = async () => {
        const result = await userService.infoAppUserByJwtToken();
        setUserName(result);
    }

    const getTypeProduct = async () => {
        const result = await typeProduct.getAllType();
        setNameType(result);
    }

    useEffect(() => {
        getUserName();
    }, []);

    useEffect(() => {
        getAppUserId();
        getTypeProduct();
    }, [])

    const getAppUserId = async () => {
        const isLoggedIn = userService.infoAppUserByJwtToken();
        if (isLoggedIn) {
            const id = await userService.getIdByUserName(isLoggedIn.sub);
            setUserId(id.data);
            dispatch(getAllCarts(isLoggedIn.sub));
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("JWT");
        setJwtToken(undefined);
        setUserName(undefined);
        navigate("/home");
        Swal.fire({
            title: "Đăng xuất thành công!",
            icon: "success",
            timer: 2000,
        });
        navigate("/home");
    }

    const handleInputChange = (event) => {
        setNameProduct(event.target.value);
    }
    const handleProduct = (nameProduct) => {
        navigate(`/home/search/${nameProduct}`);
    }
    const handleSearch = (event) => {
        event.preventDefault();
        handleProduct(nameProduct);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <NavLink className="navbar-brand mt-2 mt-lg-0" to={`/home`}>
                            <img
                                src="/favicon.ico"
                                height={70}
                                width={100}
                                alt="AD RACING"
                                loading="lazy"
                            />
                        </NavLink>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item category">
                                <Link className="nav-link category-info" to={"/home"}>
                                    <b>Trang chủ</b>
                                </Link>
                            </li>
                            <li className="nav-item category">
                                <a className="nav-link category-info"
                                   style={{overflow: "hidden"}}
                                   href="src/component#">
                                    <b>Về chúng tôi</b>
                                </a>
                            </li>
                            <li>
                                <a className="category">
                                    <div
                                        className="nav-link category-info"
                                        style={{overflow: "hidden"}}>
                                        <b>Danh mục</b>
                                    </div>
                                    <div className="category-dropdown-list float-start" style={{width: "35rem"}}>
                                        <div className="row">
                                            {nameType?.map((type, index) => (
                                                <div className="col-3">
                                                    <Link
                                                        style={{width: "7rem", margin: "2%"}}
                                                        key={index}
                                                        to={`/home/list-product/${type.nameType}`}
                                                        className="category-dropdown-item"
                                                    >
                                                        <div className="dropdown-text">{type.nameType}</div>
                                                    </Link>
                                                </div>

                                            ))}
                                        </div>

                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="header-right col-lg-6 d-flex align-items-center justify-content-end">
                        <form className="header-search-form for-des" style={{paddingRight: "5px"}}>
                            <input
                                type="search"
                                id="form-input-home"
                                className="form-input m-0"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={inputSearch}
                                onChange={(event) => {
                                    handleInputChange(event);
                                    onInputChange(event);
                                }}
                            />
                            <button type="submit" onClick={(e) => handleSearch(e)}>
                                <CiSearch/>
                            </button>
                        </form>

                        {userName && (
                            <Link to={`/cart`} href="" className="header-btn header-cart">
                                <AiOutlineShoppingCart size="2em"/><span className="cart-number">{carts.length}</span>
                            </Link>
                        )}

                        <a href="#" className="user">
                            <img
                                src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                                alt="user-img"
                                className="user-img"
                            />
                            {!userName ? (
                                <Link to="/login">
                                    <span className="user-info">Đăng nhập</span>
                                </Link>
                            ) : (
                                <span className="user-info" style={{ overflow: "hidden" }}>
                      {userName.sub}
                    </span>
                            )}

                            <div className="user-dropdown-list">
                                {JwtToken ? (
                                    <>
                                        <Link
                                            to={`/user-info/${userId}`}
                                            className="user-dropdown-item"
                                        >
                                            <BiUserCircle className="me-3 ms-0" size={25} />
                                            <div className="dropdown-text">Thông tin</div>
                                        </Link>
                                        {/*{roleAdmin &&*/}
                                            <Link
                                                to={"/home/list-order"}
                                                className="user-dropdown-item"
                                            >
                                                {/*<BiCog className="me-3 ms-0" size={25} />*/}
                                                <MdOutlineManageHistory className="me-3 ms-0" size={25}/>
                                                <div className="dropdown-text">Lịch sử mua</div>
                                            </Link>
                                        {/*}*/}
                                        <Link className="user-dropdown-item">
                                            <BiLogOutCircle className="me-3 ms-0" size={25} />
                                            <div
                                                className="dropdown-text"
                                                onClick={() => {
                                                    handleLogout();
                                                }}
                                            >
                                                Đăng xuất
                                            </div>
                                        </Link>
                                    </>
                                ) : null}
                            </div>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;