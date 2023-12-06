import "../../css/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
import * as homeService from "../../service/home/HomeService";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/navigation';
import {Autoplay, Navigation, Pagination} from 'swiper/modules'
import * as utils from "../../service/utils/Utils";
import arrow from "../../img/arrow.png"
import 'swiper/css';
import 'swiper/css/pagination';
// import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/UserService";
// import { getAllCarts } from "../order/reduce/cartAction";
// import Swal from "sweetalert2";
// import {createCartDetail} from "../../service/cart/CartDetail";
import Header from "./Header";
import Footer from "./Footer";

function Home() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [productList, setProductList] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [ProductListWithKind, setProductListWithKind] = useState([]);
    const [productForChildren, setProductForChildren] = useState([]);
    // const carts = useSelector((state) => state.cartReducer)

    // const addCartDetail = async (a) => {
    //     const result = infoAppUserByJwtToken();
    //     if (result != null) {
    //         const response = await createCartDetail(1,result.sub,a.idProduct);
    //         Swal.fire({
    //             title:"Thêm sản phẩm thành công!",
    //             icon:"success",
    //         })
    //         dispatch(getAllCarts(result.sub));
    //     } else {
    //         Swal.fire({
    //             title:"Vui lòng đăng nhập!!",
    //             icon: "warning",
    //         });
    //         navigate(`/login`)
    //     }
    // }

    const getProductList = async () => {
        const result = await homeService.findProductForHomePage("", "");
        setProductList(result.data);
    }
    const getProductListWithKind = async () => {
        const result = await homeService.findProductForHomePage("", "");
        setProductListWithKind(result.data);
    }
    const getProductForChildren = async () => {
        const result = await homeService.findProductForHomePage("", "")
        setProductForChildren(result.data);
    }
    useEffect(() => {
        getProductList();
        getProductForChildren();
        getProductListWithKind();
        getFavorite();
    }, []);
    const getFavorite = async () => {
        const result = await homeService.findFavoriteProductForHomePage();
        setFavoriteList(result.data);
    }

    return (<>
        <Header onInputChange={() => {}}/>
        <Swiper
            id="template-mo-zay-hero-carousel"
            className="mySwiper"
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
                delay: 3000, disableOnInteraction: false,
            }}
        >
            <SwiperSlide>
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img
                                className="img-fluid"
                                src="https://shop2banh.vn/images/thumbs/tags/phuoc-ohlins-490.jpg"
                                alt=""
                            />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left align-self-center">
                                <h1 className="h1 text-success">
                                    <b>AD</b> RACING
                                </h1>
                                <h3 className="h2">
                                    Hàng mới phù hợp với nhiều loại xe
                                </h3>
                                <p>AD RACING</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img
                                className="img-fluid"
                                src="https://d2x.vn/wp-content/uploads/2021/07/c5be4478-c02e-4a2e-837d-57acd43b5a67-scaled.jpeg"
                                alt=""
                            />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left">
                                <h1 className="h1">Nhiều hàng mới</h1>
                                <h3 className="h2">
                                    Mẫu mã hàng hóa mới nhập uy tín
                                </h3>
                                <p>
                                    Chúng tôi luôn cập nhật hàng hóa mới nhất và
                                    chất lượng
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="container">
                    <div className="row p-5">
                        <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img
                                className="img-fluid"
                                src="https://i.ytimg.com/vi/wM8EH0Ovpjc/maxresdefault.jpg"
                                alt=""
                            />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left">
                                <h1 className="h1">Uy tín</h1>
                                <h3 className="h2">Uy tín chất lượng</h3>
                                <p>
                                    Chúng tôi luôn luôn đảm bảo chất lượng sản
                                    phẩm, bảo hành nếu sản phẩm lỗi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>

        <section className="bg-light repeat-img pt-2 pb-2">
            <div className="sec-wp">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="sec-title text-center">
                            <p className="sec-sub-title mb-5 w-50">Sản phẩm mới nhất</p>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <button className="pre-btn" id="arrow-prev-1">
                        <img src={arrow} alt="arrow"/>
                    </button>
                    <button className="nxt-btn" id="arrow-nxt-1">
                        <img src={arrow} alt="arrow"/>
                    </button>
                    <div className="product-container">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={30}
                            cssMode={true}
                            navigation={{
                                nextEl: "#arrow-nxt-1", prevEl: "#arrow-prev-1",
                            }}
                            loop={true}
                            speed={500}
                            autoplay={{delay: 5000, disableOnInteraction: false}}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            {productList?.map((el, index) => {
                                const discountPercentage = utils.getDiscount(el.price);
                                const actualPrice = Math.ceil(el.price / ((100 - discountPercentage) / 100) / 1000) * 1000;
                                return (<SwiperSlide key={index}>
                                    <div className="product-card">
                                        <div className="product-image">
                          <span className="discount-tag">
                            {`${discountPercentage}% off`}
                          </span>
                                            <Link to={`/details/${el.idProduct}`}>
                                                <img
                                                    src={el.imageProduct}
                                                    className="product-thumb"
                                                    alt=""
                                                />
                                            </Link>
                                            <button
                                                className="card-btn"
                                                // onClick={() => addCartDetail(el)}
                                            >
                                                Mua
                                            </button>
                                        </div>
                                        <div className="product-info">
                                            <p className="product-short-description">
                                                {el.nameProduct}
                                            </p>
                                            <div className="d-flex justify-content-center">
                            <span className="price">
                              {parseFloat(el.price).toLocaleString("en-US", {
                                  minimumFractionDigits: 0, maximumFractionDigits: 0,
                              })}{" "}
                                VNĐ
                            </span>

                                            </div>
                                            <div>
                            <span className="actual-price">
                              {actualPrice.toLocaleString("en-US", {
                                  minimumFractionDigits: 0, maximumFractionDigits: 0,
                              })}
                                VNĐ
                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>);
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-light repeat-img pt-2 pb-2">
            <div className="sec-wp">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="sec-title text-center">
                            <p className="sec-sub-title mb-5 w-50">Sản phẩm bán chạy</p>
                        </div>
                    </div>
                </div>

                <div className="product">
                    <button className="pre-btn" id="arrow-prev-2">
                        <img src={arrow} alt="arrow"/>
                    </button>
                    <button className="nxt-btn" id="arrow-nxt-2">
                        <img src={arrow} alt="arrow"/>
                    </button>
                    <div className="product-container">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={30}
                            cssMode={true}
                            navigation={{nextEl: "#arrow-nxt-2", prevEl: "#arrow-prev-2"}}
                            loop={true}
                            speed={500}
                            autoplay={{delay: 5000, disableOnInteraction: false}}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            {favoriteList?.map((el, index) => {
                                const discountPercentage = utils.getDiscount(el.price);
                                const actualPrice = Math.ceil(el.price / ((100 - discountPercentage) / 100) / 1000) * 1000;
                                return (<SwiperSlide key={index}>
                                    <div className="product-card">
                                        <div className="product-image">
                                                     <span className="discount-tag">
                                                       {`${discountPercentage}% off`}
                                                        </span>
                                            <Link to={`/details/${el.idProduct}`}>
                                                <img
                                                    src={el.imageProduct}
                                                    className="product-thumb"
                                                    alt=""
                                                />
                                            </Link>
                                            <button
                                                className="card-btn"
                                                // onClick={() => addCartDetail(el)}
                                            > Mua </button>
                                        </div>
                                        <div className="product-info">
                                            <p className="product-short-description">
                                                {el.nameProduct}
                                            </p>
                                            <div className="d-flex justify-content-center">
                            <span className="price">
                              {parseFloat(el.price).toLocaleString("en-US", {
                                  minimumFractionDigits: 0, maximumFractionDigits: 0,
                              })}{" "}
                                VNĐ
                            </span>
                                            </div>
                                            <div>
                            <span className="actual-price">
                              {actualPrice.toLocaleString("en-US", {
                                  minimumFractionDigits: 0, maximumFractionDigits: 0,
                              })}
                                VNĐ
                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>);
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>

        <Footer/>
    </>)
}
export default Home;