import "../../css/Login.css"
import "bootstrap/dist/css/bootstrap.css"
import * as userService from "../../service/user/UserService"
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2"

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (appUser) => {
        try {
            const result = await userService.loginUser(appUser);
            userService.addJwtTokenToLocalStorage(result.data.jwtToken)
            const tempURL = localStorage.getItem("tempURL");
            localStorage.removeItem("tempURL");
            if (tempURL) {
                navigate(tempURL);
            } else {
                navigate(`/home`);
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: err.response.data
            })
            console.log(err);
        }
    }

    return (
        <>
            <Formik initialValues={{
                userName: "",
                password: ""
            }}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(false);
                        let cloneValue = {
                            ...values,
                        }
                        handleLogin(cloneValue);
                    }}
            >
                <section className="body">
                    <div className="container">
                        <div className="login-box">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="logo">
                                        <span className="logo-font">LinhKienDT</span>AD
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <br/>
                                    <h3 className="header-title">Đăng nhập</h3>
                                    <Form className="login-form">
                                        <label className={"form-label"} htmlFor={"username"}>Tên đăng nhập
                                            <span className={"text-danger"}>*</span></label>
                                        <div className="form-group">
                                            <Field type="text" className="form-control"
                                                   id={"username"} name={"userName"}/>
                                        </div>
                                        <div className="form-group">
                                            <label className={"form-label"} htmlFor={"pass"}>Mật khẩu
                                                <span className={"text-danger"}>*</span></label>
                                            <Field type="password" className="form-control"
                                                   name={"password"} id={"pass"}/>
                                        </div>
                                        <div className="form-group">
                                            <button type={"submit"} className="btn btn-primary btn-block">Đăng nhập
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <div className="text-center">Bạn chưa có tài khoản? <Link to={"/register"}>Đăng
                                                ký
                                                ngay </Link></div>
                                        </div>
                                    </Form>
                                </div>
                                <div className="col-sm-6 hide-on-mobile">
                                    <div id="demo" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className="slider-feature-card">
                                                    <img
                                                        src="/title_1.jpg"
                                                        alt=""/>
                                                    <h3 className="slider-title">Thiết kế bo mạch</h3>
                                                    <p className="slider-description">Kinh nghiệm thiết kế mạch, hàn
                                                        linh kiện của dân chuyên nghiệp.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                        </a>
                                        <a className="carousel-control-next" href="#demo" data-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Formik>
        </>
    )
}

export default Login;