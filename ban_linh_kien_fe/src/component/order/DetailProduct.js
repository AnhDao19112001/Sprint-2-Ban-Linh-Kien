import {useNavigate, useParams} from "react-router-dom";
// import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getIdProduct} from "../../service/product/ProductService";
import Swal from "sweetalert2";
import Header from "../home/Header";
import Footer from "../home/Footer";

function DetailProduct() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [appUserId, setAppUserId] = useState(null);
    const {idProduct} = useParams();

    const getProductDetail = async () => {
        try {
            const result = await getIdProduct(idProduct);
            setProduct(result.data);
            const res = result.data.imagePath.split("");
            setImages(res);
        } catch (error) {
            if (error.response && error.response.status === 406) {
                Swal.fire("Không tìm thấy sản phẩm cần tìm!", "", "warning");
                navigate(`/home`);
            }
        }
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
            <Header/>
            <div className="container my-5">
                {
                    <div className="row">
                        <div className="col-md-5">
                            <div className="images p-3">
                                <div className="text-center p-4">
                                    {images.length > 0 && images.map((el, index) => {
                                        return (
                                            <button type="button"
                                                    data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to={index}
                                                    className={index === activeIndex ? "active" : ""}
                                                    aria-current="true"
                                                    aria-label={`Slide ${index + 1}`}
                                                    style={{width: 70, height: 70}}>
                                                <img src={el} alt=""
                                                     id="main-image"
                                                     width={250}/>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="carousel-inner">
                                    {images.length > 0 &&
                                        images.map((el, index) => {
                                            return (
                                                <div
                                                    className={`carousel-item ${
                                                        index === activeIndex ? "active" : ""
                                                    }`}
                                                >
                                                    <img src={el} className="d-block w-100" alt="..."/>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                        </div>
                        <div className="col-md-7">
                            <div className="main-description px-2">
                                <div className="category text-bold">
                                    Loại sản phẩm: {product.nameType}
                                </div>
                                <div className="product-title text-bold my-3">
                                    Tên sản phẩm: {product.nameProduct}
                                </div>
                                <div className="price-area my-4">
                                    <p className="new-price text-bold mb-1">{currency(product.price)} vnđ/1 {product.nameProduct}</p>
                                    <p className="text-secondary mb-1">(Thuế bổ sung có thể được áp dụng khi thanh
                                        toán)</p>
                                </div>
                                <div className="buttons d-flex my-5">
                                    <div className="block">
                                        <button className="shadow btn custom-btn">Mua</button>
                                    </div>
                                    <div className="block quantity">
                                        <input type="number" className="form-control" id="cart_quantity"
                                               defaultValue={1}
                                               min={0} max={5} placeholder="Enter email" name="cart_quantity"/>
                                    </div>
                                </div>
                            </div>
                            <div className="product-details my-3">
                                <p className="details-title text-color mb-1">Chi tiết sản phẩm</p>
                                <p className="description">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Footer/>
        </>
    )
}

export default DetailProduct;