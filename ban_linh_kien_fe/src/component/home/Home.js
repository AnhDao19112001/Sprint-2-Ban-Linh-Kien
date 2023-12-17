import "../../css/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as homeService from "../../service/home/HomeService";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/navigation';
import {Autoplay, Navigation, Pagination} from 'swiper/modules'
import * as utils from "../../service/utils/Utils";
import arrow from "../../img/arrow.png"
import 'swiper/css';
import 'swiper/css/pagination';
import Header from "./Header";
import Footer from "./Footer";
import Swal from "sweetalert2";
import {infoAppUserByJwtToken} from "../../service/user/UserService";
import {getAllCarts} from "../order/reduce/cartAction";
import {useDispatch, useSelector} from "react-redux";
import {createCartDetail} from "../../service/cart/CartDetail";
import ChatIcon from "../img/ChatIcon";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

function Home() {
    const [productList, setProductList] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.cartReducer)
    const getProductList = async () => {
        const result = await homeService.findProductForHomePage("", "");
        setProductList(result.data);
    }

    const addCartDetail = async (a) => {
        const result = infoAppUserByJwtToken();
        if (result != null) {
            const response = await createCartDetail(1, result.sub, a.idProduct);
            // Swal.fire({
            //     title: "Thêm sản phẩm thành công!",
            //     icon: "success",
            // })
            toast("Thêm mới sản phẩm thành công!");
            dispatch(getAllCarts(result.sub));
        } else {
            Swal.fire({
                title: "Vui lòng đăng nhập!!",
                icon: "warning",
            });
            navigate(`/login`)
        }
    }

    useEffect(() => {
        getProductList();
        getFavorite();
    }, []);
    const getFavorite = async () => {
        const result = await homeService.findFavoriteProductForHomePage();
        setFavoriteList(result.data);
    }

    return (<>
        <Header onInputChange={() => {
        }}/>
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
                                style={{width: 588, height: 441}}
                                src="data:image/jpeg;base64,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"
                                alt=""
                            />
                        </div>
                        <div className="col-lg-6 mb-0 d-flex align-items-center">
                            <div className="text-align-left align-self-center">
                                <h1 className="h1 text-primary">
                                    <b>LinhKienDT</b> AD
                                </h1>
                                <h3 className="h2">
                                    Nhóm các linh kiện dạng combo thích hợp cho vệc thí nghiệm
                                </h3>
                                <p>Nơi chia sẽ kinh nghiệm, học tập và thỏa mãn đam mê chế đồ điện tử</p>
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
                                style={{width: 588, height: 441}}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODKeqmDYVfinYyc-lAP7Ey4kyihGa1V30ImVmKsL4cj6Ypi47t6QjgYGFDxTgM5yMFuI&usqp=CAU"
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
                                style={{width: 588, height: 441}}
                                src="data:image/jpeg;base64,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"
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
                            className="mySwiper">
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
                                            <button className="card-btn"
                                                    onClick={() => addCartDetail(el)}>
                                                Thêm vào giỏ hàng
                                            </button>
                                        </div>
                                        <div className="product-info">
                                            <p className="product-short-description text-center">
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
                                            <div className="text-center">
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
                                                onClick={() => addCartDetail(el)}
                                            > Thêm vào giỏ hàng
                                            </button>
                                        </div>
                                        <div className="product-info">
                                            <p className="product-short-description text-center">
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
                                            <div className="text-center">
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
        <ToastContainer/>
        <Footer/>
        <ChatIcon/>
    </>)
}

export default Home;