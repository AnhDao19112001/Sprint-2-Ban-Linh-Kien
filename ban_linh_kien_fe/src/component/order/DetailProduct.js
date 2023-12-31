import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getIdProduct} from "../../service/product/ProductService";
import Swal from "sweetalert2";
import Header from "../home/Header";
import Footer from "../home/Footer";
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/UserService";
import {checkQuantity, createCartDetail} from "../../service/cart/CartDetail";
import {getAllCarts} from "./reduce/cartAction";
import {useDispatch} from "react-redux";

function DetailProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [appUserId, setAppUserId] = useState(null);
    const {idProduct} = useParams();
    const dispatch = useDispatch();

    const getProductDetail = async () => {
        try {
            const result = await getIdProduct(idProduct);
            setProduct(result.data);
            console.log(result.data);
            const res = result.data.imagePath.split(',');
            setImages(res);
        } catch (error) {
            if (error.response && error.response.status === 406) {
                Swal.fire("Không tìm thấy sản phẩm cần tìm!", "", "warning");
                navigate(`/home`);
            }
        }
    };

    const addToCarts = async (idProduct) => {
        const isLogged = infoAppUserByJwtToken();
        if (isLogged == null) {
            Swal.fire("Vui lòng đăng nhập!", "", "warning");
            localStorage.setItem("tempURL", window.location.pathname);
            navigate(`/login`);
        } else {
            const user = await getIdByUserName(isLogged.sub);
            setAppUserId(user.sub);
            const quantity = document.getElementById("quantity-value").value;
            if (parseInt(quantity) <= 0) {
                Swal.fire("Vui lòng thêm ít nhất 1 sản phẩm!", "", "warning")
            } else {
                try {
                    const result = await checkQuantity(
                        idProduct,
                        parseInt(quantity));
                    const res = await createCartDetail(quantity, isLogged.sub, idProduct);
                    Swal.fire("Thêm mới sản phẩm thành công!", "", "success");
                    dispatch(getAllCarts(user.sub));
                } catch {
                    Swal.fire("Sản phẩm vượt quá số lượng cho phép!", "", "warning");
                }
            }
        }
    }
    const createMarkup = () => {
        return {__html: product.description};
    };
    const currency = (money) => {
        return new Intl.NumberFormat("vi-VN").format(money);
    };

    useEffect(() => {
        getProductDetail();
    }, []);

    return (
        product &&
        <>

            <Header onInputChange={() => {
            }}/>
            <div className="container my-5">
                {product.idProduct && (
                    <div className="row">
                        <div className="col-md-5">
                            <div className="images carousel slide col col-md-6 col-auto"
                                 id="carouselExampleIndicators"
                                 // className="carousel slide col col-md-6 col-auto"
                                 data-bs-ride="true"
                                 style={{ height: "60%", width:"100%" }}>
                                <div className="carousel-indicators justify-content-start">
                                    {images.length > 0 &&
                                        images.map((el, index) => {
                                            return (
                                                <button
                                                    type="button"
                                                    data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to={index}
                                                    className={index === activeIndex ? "active" : ""}
                                                    aria-current="true"
                                                    aria-label={`Slide ${index + 1}`}
                                                    style={{ width: 60, height: 70 }}
                                                >
                                                    <img
                                                        src={el}
                                                        alt="..."
                                                        className="d-block w-100"
                                                        style={{ border: "1px lightskyblue solid" }}
                                                    />
                                                </button>
                                            );
                                        })}
                                </div>
                                <div className="carousel-inner text-center">
                                    {images.length > 0 &&
                                        images.map((el, index) => {
                                            return (
                                                <div
                                                    className={`carousel-item ${
                                                        index === activeIndex ? "active" : ""
                                                    }`}
                                                >
                                                    <img src={el} className="d-block" alt="..." style={{width:"350px",marginLeft:60}}/>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="main-description px-2">
                                <div className=" text-bold">
                                    <b>Loại sản phẩm:</b> {product.nameType}
                                </div>
                                <div className="product-title text-bold my-3">
                                    <b>Tên sản phẩm:</b> {product.nameProduct}
                                </div>
                                <div className="price-area my-4">
                                    <p className="new-price text-bold mb-1"><b>Giá:</b> {currency(product.price)} vnđ
                                    </p>
                                    <p className="text-secondary mb-1">(Thuế bổ sung có thể được áp dụng khi thanh
                                        toán)</p>
                                </div>
                                <div className="buttons d-flex my-5">
                                    <div className="block">
                                        <button className="shadow btn btn-outline-primary custom-btn"
                                                onClick={() => addToCarts(product.idProduct)}
                                        >Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                    <div className="block quantity ms-2">
                                        <input type="number" className="form-control quantity fw-bold "
                                               id="quantity-value"
                                               defaultValue={1}
                                            // readOnly={true}
                                               min={1} max={product.quantity} name="quantity"/>
                                    </div>
                                </div>
                            </div>
                            <div className="product-details my-3">
                                <p className="details-title text-color mb-1">
                                    <b>Chi tiết sản phẩm: </b></p>
                                <p className="description">
                                    <div dangerouslySetInnerHTML={createMarkup()}></div>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    )
}

export default DetailProduct;