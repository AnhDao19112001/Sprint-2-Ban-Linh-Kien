import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Header from "../home/Header";
import Footer from "../home/Footer";
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import {FaMinus} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/UserService";
import {
    checkQuantity,
    deleteCartDetail,
    getListCartDetail,
    increase,
    reduceQuantity
} from "../../service/cart/CartDetail";
import Swal from "sweetalert2";
import {TiDelete} from "react-icons/ti";
import {Paypal} from "./Paypal";
import swal from "sweetalert2";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useSelector} from "react-redux";
import * as yup from "yup"

const currency = (number) => {
    const roundedNumber = Math.floor(number);
    const formattedNumber = roundedNumber.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
    });
    return formattedNumber;
};

function Cart() {
    const carts = useSelector((state) => state.cartReducer);
    const [checkout, setCheckout] = useState(false);
    const [cartDetail, setCartDetail] = useState([]);
    const [customer, setCustomer] = useState({});

    const fetchData = async () => {
        try {
            const use = await getIdByUserName(infoAppUserByJwtToken(localStorage.getItem('JWT')).sub)
            setCustomer(use.data);
            console.log(use.data)
        } catch (error) {
            console.log(error);
        }
    };

    const getCartDetail = async () => {
        const result = infoAppUserByJwtToken();
        if (result != null) {
            const res = await getListCartDetail(result.sub);
            setCartDetail(res.data);
        }
    }

    const total = cartDetail.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    const handleIncrease = async (idProduct, proQuantity) => {
        let quantity = document.getElementById("input-quantity" + idProduct);
        let quantityInStock = proQuantity;
        try {
            const result = await checkQuantity(idProduct, parseInt(quantity.value) + 1)
            if (quantity.value < 99) {
                quantity.value = parseInt(quantity.value) + 1;
            } else {
                quantity.value = 99;
            }
            const res = infoAppUserByJwtToken();
            await increase(res.sub, idProduct);
            getCartDetail();
        } catch (error) {
            Swal.fire("Sản phẩm vượt quá số lượng cho phép!", `Số lượng còn lại trong kho là ${quantityInStock}`, "warning");
        }
    };

    const handleReduce = async (c) => {
        let quantity = document.getElementById("input-quantity" + c.idProduct);
        try {
            if (quantity.value <= 1) {
                Swal.fire({
                    title: `Bạn có muốn xóa ${c.nameProduct} khỏi giỏ hàng?`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Huỷ",
                })
                    .then(async (confirm) => {
                        if (confirm.isConfirmed) {
                            const result = infoAppUserByJwtToken();
                            await deleteCartDetail(result.sub, c.idProduct);
                            Swal.fire({
                                title: `Xóa ${c.nameProduct} thành công!`,
                                icon: "success",
                            })
                            getCartDetail();
                        }
                    })
            }
            if (quantity.value > 1) {
                quantity.value = parseInt(quantity.value) - 1;
                const result = infoAppUserByJwtToken();
                await reduceQuantity(result.sub, c.idProduct);
                getCartDetail();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCart = async (c) => {
        try {
            Swal.fire({
                title: "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?",
                text: c.nameProduct,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Huỷ",
            })
                .then(async (confirm) => {
                    if (confirm.isConfirmed) {
                        const res = infoAppUserByJwtToken();
                        await deleteCartDetail(res.sub, c.idProduct)
                        Swal.fire("Xóa sản phẩm thành công!", "", "success");
                        getCartDetail();
                    }
                })
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getCartDetail();
    }, [cartDetail.length]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header onInputChange={() => {
            }}/>
            <section className="h-100" style={{backgroundColor: '#eee'}}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <h3 className="fw-normal mb-0 text-black">Giỏ hàng của bạn</h3>
                            </div>
                            {cartDetail.map((c) => (
                                <div className="card rounded-3 mb-4">
                                    <div className="card-body p-4">
                                        <div className="row d-flex justify-content-between align-items-center">
                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                <img
                                                    src={c.imagePath}
                                                    className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                <p className="lead fw-normal mb-2">{c.nameProduct}</p>
                                                <p><span className="text-muted">Đơn giá: </span>{c.price}
                                                </p>
                                            </div>
                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                <button
                                                    onClick={() => handleReduce(c)}
                                                    className="btn btn-outline-dark px-2 mx-2">
                                                    <FaMinus/>
                                                </button>
                                                <input id={`input-quantity${c.idProduct}`}
                                                       min={0} name="quantity" defaultValue={c.quantity} type="number"
                                                       disabled
                                                       className="form-control form-control-sm text-center"/>
                                                <button
                                                    onClick={() => handleIncrease(c.idProduct, c.quantity)}
                                                    className="btn btn-outline-dark px-2 ms-2">
                                                    <FaPlus/>
                                                </button>
                                            </div>
                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                <h5 className="mb-0">{c.price * c.quantity}</h5>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                <span onClick={() => deleteCart(c)}><TiDelete/></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="card row">
                                <div className="card-body">
                                    <Link to="/home" className="btn btn-outline-primary col-2">Quay về shop</Link>
                                    <b className="mt-2 h4 col-4" style={{margin: "0 0 0 37%"}}>Tổng
                                        tiền: {currency(total)}</b>
                                    <div className="float-end col-3">
                                        {cartDetail && cartDetail.length > 0 ? (
                                            checkout ? (
                                                <Paypal propData1={total} proData2={cartDetail}/>
                                            ) : (
                                                <button
                                                    onClick={() => setCheckout(true)}
                                                    type="button"
                                                    className={"btn btn-outline-primary float-end"}
                                                >
                                                    Thanh toán
                                                </button>
                                            )
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default Cart;