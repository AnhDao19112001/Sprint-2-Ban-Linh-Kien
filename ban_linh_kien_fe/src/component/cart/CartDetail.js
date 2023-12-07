import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Header from "../home/Header";
import Footer from "../home/Footer";
import {Link} from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

function CartDetail() {
    return (
        <>
            <Header onInputChange={() => {}} />
            <section className="h-100" style={{backgroundColor: '#eee'}}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="d-flex justify-content-center align-items-center mb-4">
                                <h3 className="fw-normal mb-0 text-black">Giỏ hàng của bạn</h3>
                            </div>
                            <div className="card rounded-3 mb-4">
                                <div className="card-body p-4">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                src="https://pos.nvncdn.net/f2fe44-24897/ps/20190704_WLzCyFI3TzsPoNmnnBjHFowT.png"
                                                className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">Module Buck DC-DC 15A 200W</p>
                                            <p><span className="text-muted">Loại sản phẩm: </span>Module nguồn <span
                                                className="text-muted">Xuất sứ: </span>Chính hãng</p>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button className="btn btn-outline-dark px-2 mx-2">
                                                <FaMinus />
                                            </button>
                                            <input id="form1" min={0} name="quantity" defaultValue={1} type="number"
                                                   disabled
                                                   className="form-control form-control-sm text-center"/>
                                            <button className="btn btn-outline-dark px-2 ms-2">
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h5 className="mb-0">230.000 vnđ</h5>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card rounded-3 mb-4">
                                <div className="card-body p-4">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                src="https://pos.nvncdn.net/f2fe44-24897/ps/20200617_31s5ThSZVnXbCzLsGlwqa3mB.png"
                                                className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">Triết Áp Đơn B1M</p>
                                            <p><span className="text-muted">Loại sản phẩm: </span>Chiết áp đơn, đôi <span
                                                className="text-muted">Xuất sứ: </span>Chính hãng</p>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button className="btn btn-outline-dark px-2 mx-2">
                                                <FaMinus />
                                            </button>
                                            <input id="form1" min={0} name="quantity" defaultValue={2} type="number"
                                                   disabled
                                                   className="form-control form-control-sm text-center"/>
                                            <button className="btn btn-outline-dark px-2 ms-2">
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h5 className="mb-0">8.000 vnđ</h5>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card rounded-3 mb-4">
                                <div className="card-body p-4">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                src="https://www.linhkienchatluong.vn/Uploads/pic/prods/Ket-noi/6382797341126498318P.jpg"
                                                className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">Jack GX16-8P (đực+cái)</p>
                                            <p><span className="text-muted">Loại sản phẩm: </span>Jack kết nối <br/><span
                                                className="text-muted">Xuất sứ: </span>Chính hãng</p>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button className="btn btn-outline-dark px-2 mx-2">
                                                <FaMinus />
                                            </button>
                                            <input id="form1" min={0} name="quantity" defaultValue={10} type="number"
                                                   disabled
                                                   className="form-control form-control-sm text-center"/>
                                            <button className="btn btn-outline-dark px-2 ms-2">
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h5 className="mb-0">140.000 vnđ</h5>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <button type="button" className="btn btn-outline-warning btn-block btn-lg float-end">Thanh toán
                                    </button>
                                    <b className="float-end mx-5 mt-2 h4">Tổng tiền: 378.000 vnđ</b>
                                    <Link to="/home" className="btn btn-outline-primary btn-lg">Quay về shop</Link>
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
export default CartDetail;