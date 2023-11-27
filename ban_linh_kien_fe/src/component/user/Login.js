import "../../css/LoginCSS.css"
import "bootstrap/dist/css/bootstrap.css"
import * as userService from "../../service/user/UserService"
import { Field, Form, Formik } from "formik";
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
                <Form>
                    <section className="vh-100 gradient-custom">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                    <div
                                        className="card bg-dark text-white"
                                        style={{borderRadius: "1rem"}}
                                    >
                                        <div className="card-body p-5 text-center">
                                            <div className=" mt-md-4 pb-5">
                                                <h2 className="fw-bold mb-2 text-uppercase">Đăng nhập</h2>
                                                <p className="text-white-50 mb-5">
                                                    Vui lòng nhập tên đăng nhập và mật khẩu!
                                                </p>
                                                <div className="form-outline form-white mb-4">
                                                    <Field
                                                        type="text"
                                                        id="userName"
                                                        name={"userName"}
                                                        className="form-control form-control-lg"
                                                    />
                                                    <div style={{height: "15px"}}></div>
                                                    <label className="form-label" htmlFor="userName">
                                                        Tên đăng nhập <span className="text-danger">*</span>
                                                    </label>
                                                </div>
                                                <div className="form-outline form-white mb-4">
                                                    <Field
                                                        type="password"
                                                        id="password"
                                                        name={"pass"}
                                                        className="form-control form-control-lg"
                                                    />
                                                    <div style={{height: "15px"}}></div>
                                                    <label className="form-label" htmlFor="password">
                                                        Mật khẩu <span className="text-danger">*</span>
                                                    </label>
                                                </div>
                                                <p className="small mb-5 pb-lg-2">
                                                    <a className="text-white-50" href="src/component#!">
                                                        Bạn quên mật khẩu?
                                                    </a>
                                                </p>
                                                <button
                                                    className="btn btn-outline-light btn-lg px-5"
                                                    type="submit"
                                                >
                                                    Đăng nhập
                                                </button>
                                            </div>
                                            <div>
                                                <p className="mb-0">
                                                    Bạn chưa có tài khoảng?{" "}
                                                    <Link to={'/register'} className="text-white-50 fw-bold">
                                                        Đăng ký
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Form>
            </Formik>
        </>
    )
}

export default Login;