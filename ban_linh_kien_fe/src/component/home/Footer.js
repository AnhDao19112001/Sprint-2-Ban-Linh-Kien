import {BsFacebook} from "react-icons/bs";
import {FaSquareGithub} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaTiktok } from "react-icons/fa";
function Footer() {
    return (
        <>
            <div className="my-5">
                <footer
                    className="text-white text-center text-lg-start"
                    style={{backgroundColor: "#23242a"}}>
                    <div className="container p-4">
                        <div className="row mt-4">
                            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4">Linh Kiện Điện Tử - Anh Đào</h5>
                                <p>
                                    Nơi chia sẽ kinh nghiệm, học tập và thỏa mãn đam mê chế đồ điện tử
                                </p>
                                <p>
                                    - Hỗ trợ đơn đặt hàng: 0931.997.293
                                    <br/>
                                    - Hỗ trợ kỹ thuật: 0931.997.293
                                    <br/>
                                    - Mua hàng tại cửa hàng: 0931.997.293
                                </p>
                                <div className="mt-4">
                                    <a type="button" className="btn btn-light btn-warning btn-lg">
                                    <BsFacebook color="blue" size={30}/>
                                    </a>
                                    <a type="button" className="btn btn-light btn-warning btn-lg ms-2">
                                    <FaSquareGithub size={30} />
                                    </a>
                                    <a type="button" className="btn btn-light btn-warning btn-lg ms-2">
                                        <FcGoogle size={30} />
                                    </a>
                                    <a type="button" className="btn btn-light btn-warning btn-lg ms-2">
                                        <FaTiktok  size={30} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4 pb-1">Tìm kiếm thứ gì đó?</h5>
                                <div className="form-outline form-white mb-4">
                                    <input
                                        type="text"
                                        id="formControlLg"
                                        className="form-control form-control-lg"
                                    />
                                    <label
                                        className="form-label"
                                        htmlFor="formControlLg"
                                        style={{marginLeft: 0}}
                                    >
                                        Tìm kiếm
                                    </label>
                                    <div className="form-notch">
                                        <div className="form-notch-leading" style={{width: 9}}/>
                                        <div
                                            className="form-notch-middle"
                                            style={{width: "48.8px"}}
                                        />
                                        <div className="form-notch-trailing"/>
                                    </div>
                                </div>
                                <ul className="fa-ul" style={{marginLeft: "1.65em"}}>
                                    <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-home"/>
                  </span>
                                        <span className="ms-2">280 Trần Hưng Đạo, Sơn Trà, Đà Nẵng</span>
                                    </li>
                                    <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-envelope"/>
                  </span>
                                        <span className="ms-2">phantaanhdao@gmail.com</span>
                                    </li>
                                    <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-phone"/>
                  </span>
                                        <span className="ms-2">0931.997.293</span>
                                    </li>
                                    <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-print"/>
                  </span>
                                        <span className="ms-2">0931.997.293</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-4">Giờ làm việc</h5>
                                <table className="table text-center text-white">
                                    <tbody className="font-weight-normal">
                                    <tr>
                                        <td>Thứ 2 - 5:</td>
                                        <td>8am - 9pm</td>
                                    </tr>
                                    <tr>
                                        <td>Thứ 6 - 7:</td>
                                        <td>8am - 1am</td>
                                    </tr>
                                    <tr>
                                        <td>Chủ nhật:</td>
                                        <td>9am - 10pm</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div
                        className="text-center p-3"
                        style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                    >
                        © 2023 Copyright:
                        <a className="text-white" href="https://www.facebook.com/profile.php?id=100093966319718">
                            LinhKienDT-AD
                        </a>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer;