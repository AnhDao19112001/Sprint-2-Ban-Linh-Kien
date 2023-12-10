import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOrderDetails} from "../../service/cart/Orders";
import {getIdByUserName, infoAppUserByJwtToken} from "../../service/user/UserService";
import Header from "../home/Header";
import Footer from "../home/Footer";

function OrderDetail() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [customer, setCustomer] = useState({});
    const param = useParams();
    const fetchData = async () => {
        try {
            const user = await getIdByUserName(infoAppUserByJwtToken(localStorage.getItem('JWT')).sub);
            setCustomer(user.data);
        } catch (error) {
            console.error(error);
        }
    };
    const findOrderDetais = async () => {
        if (param.idOrder != null) {
            const data = await getOrderDetails(param.idOrder);
            console.log(data);
            setOrderDetails(data);
        } else {
            console.log("aaaaaaaaa")
        }
    };
    useEffect(() => {
        findOrderDetais();
    }, [param.idOrder]);

    useEffect(() => {
        fetchData();
    }, [])
    const currency = (money) => {
        return new Intl.NumberFormat("vi-VN").format(money);
    };

    return (
        <>
            <Header onInputChange={() => {
            }}/>
            <div id="hannah" className="container mt-5">
                <div className="container-fluid p-1 position-relative h-auto">
                    <div className=" h-auto">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <p className="col col-md-5 col-8 mb-3 text-center">
                                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! Vui lòng xem chi tiết
                                đơn hàng bên dưới nhé!
                            </p>
                        </div>
                    </div>
                    <h1
                        className="text-center mb-5 mx-auto "
                        style={{color: "black"}}>
                        THÔNG TIN ĐƠN HÀNG
                    </h1>

                    {orderDetails.length > 0 && (
                        <div className="container-fluid w-100" style={{marginLeft: 200}}>
                            <div className="row">
                                <div className=" col col-sm-12 col-md-12 col-lg-8 col-xl-8 p-0">
                                    <div className=" d-flex flex-column justify-content-center align-items-center">
                                        <table className="table table-hover">
                                            <thead className="text-secondary">
                                            <tr className="text-center fw-bold">
                                                <td>SẢN PHẨM</td>
                                                <td>Giá (VNĐ)</td>
                                                <td>Số lượng</td>
                                                <td>Tổng (VNĐ)</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orderDetails.length > 0 &&
                                                orderDetails.map((el, index) => {
                                                    return (
                                                        <tr key={`el_${index}`}>
                                                            <td>
                                                                <div
                                                                    className="d-flex flex-column flex-md-row align-items-center justify-content-start ">
                                                                    <img
                                                                        src={el.imageProduct}
                                                                        style={{
                                                                            width: "3.5rem",
                                                                            height: "4.0rem",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                    <div
                                                                        style={{cursor: "pointer"}}
                                                                        className="text-center align-middle mx-2"
                                                                    >
                                                                        <div>{el.nameProduct}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className=" text-center align-middle fw-bold">
                                                                {currency(el.price)}
                                                            </td>
                                                            <td className="align-middle">
                                                                <div
                                                                    className=" d-flex flex-md-row flex-column justify-content-center align-items-center">
                                                                    <input
                                                                        readOnly
                                                                        type="number"
                                                                        defaultValue={el.quantityInCart}
                                                                        style={{
                                                                            width: "50px",
                                                                            height: "35px",
                                                                        }}
                                                                        name="quantity"
                                                                        className="text-center input-quantity"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="align-middle text-center fw-bold">
                                                                {currency(
                                                                    el.price * el.quantityInCart
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        <div
                                            className="container-fluid d-flex flex-column align-items-start justify-content-center">
                                            <Link to="/home/list-order" className="btn btn-outline-dark mb-5">
                                                ← Trở về
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default OrderDetail;