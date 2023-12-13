import "../../css/Login.css"
import "bootstrap/dist/css/bootstrap.css"
import * as userService from "../../service/user/UserService"
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2"
import {LoginSocialFacebook} from "reactjs-social-login";
import {BsFacebook} from "react-icons/bs";
import {LuScanFace} from "react-icons/lu";
import { FaSquareGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import {useEffect, useState} from "react";
const Login = () => {
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const handleLoginFb = async (resolve) => {
        try {
            const result = await userService.loginFacebook({facebookMail: resolve.data.email});
            userService.addJwtTokenToLocalStorage(result.data.jwtToken);
            const tempURL = localStorage.getItem("tempURL");
            localStorage.removeItem("tempURL");
            if (tempURL) {
                navigate(tempURL);
            } else {
                navigate('/home');
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data,
            })
        }
    }


    const loginWithFacebook = async (resolve) => {
        console.log(resolve);
        Swal.fire({
            text: 'Chào ' + resolve.data.name + ', bạn có muốn đăng nhập thông qua facebook ' + resolve.data.email + " không?",
            showDenyButton: true,
            confirmButtonText: 'Xác nhận',
            denyButtonText: `Thoát`,
        }).then((result) => {
            if (result.isConfirmed) {
                handleLoginFb(resolve)
            } else if (result.isDenied) {

            }
        })
    }

    // const faceSignIn = async () => {
    //     try {
    //         const userData = await faceioInstance.authenticate({
    //             locale: "auto",
    //         })
    //         console.log(userData);
    //         const result = await userService.loginUser(userData);
    //         userService.addJwtTokenToLocalStorage(result.data.jwtToken)
    //         const tempURL = localStorage.getItem("tempURL");
    //         localStorage.removeItem("tempURL");
    //         if (tempURL) {
    //             navigate(tempURL);
    //         } else {
    //             navigate(`/home`);
    //         }
    //         console.log(userData)
    //         console.log('Unique Facial ID: ', userData.facialId)
    //         console.log('PayLoad: ', userData.payload)
    //     } catch (errorCode) {
    //         console.log(errorCode);
    //         Swal.fire("Lỗi xác thực","","error");
    //     }
    // }

    // const handleLogin = async (appUser) => {
    //     try {
    //         const result = await userService.loginUser(appUser);
    //         userService.addJwtTokenToLocalStorage(result.data.jwtToken)
    //         console.log(result);
    //         const tempURL = localStorage.getItem("tempURL");
    //         localStorage.removeItem("tempURL");
    //         if (tempURL) {
    //             navigate(tempURL);
    //         } else {
    //             navigate(`/home`);
    //         }
    //     } catch (err) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: err.response.data
    //         })
    //         console.log(err);
    //     }
    // }

    const handleLogin = async (appUser) => {
        if (!isLoggingIn) {
            try {
                setIsLoggingIn(true);

                const result = await userService.loginUser(appUser);
                userService.addJwtTokenToLocalStorage(result.data.jwtToken)
                console.log(result);
                const tempURL = localStorage.getItem("tempURL");
                localStorage.removeItem("tempURL");
                if (tempURL) {
                    navigate(tempURL);
                } else {
                    Swal.fire({
                        title: "Đăng nhập thành công",
                        icon: "success",
                        timer: 2000
                    })
                    navigate(`/home`);
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data
                })
                console.log(err);
            } finally {
                setIsLoggingIn(false);
            }
        }
    };
    useEffect(() => {
        const JwtToken = userService.infoAppUserByJwtToken();
        if (JwtToken) {
            navigate(`/home`);
        }
    }, []);

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
                                        <label className={"form-label"} htmlFor={"userName"}>Tên đăng nhập
                                            <span className={"text-danger"}>*</span></label>
                                        <div className="form-group">
                                            <Field type="text" className="form-control"
                                                   id={"userName"} name={"userName"}/>
                                        </div>
                                        <div className="form-group">
                                            <label className={"form-label"} htmlFor={"password"}>Mật khẩu
                                                <span className={"text-danger"}>*</span></label>
                                            <Field type="password" className="form-control"
                                                   name={"password"} id={"password"}/>
                                        </div>
                                        <div className="form-group">
                                            <button type={"submit"}
                                                    className="btn btn-primary btn-block">Đăng
                                                nhập
                                            </button>
                                            <div className={"row"}>
                                                <div className="col-3">
                                                    <LoginSocialFacebook
                                                        className="btn border-0"
                                                        appId="652683827079181"
                                                        onResolve={(resolve) => {
                                                            loginWithFacebook(resolve);
                                                            console.log(resolve);
                                                        }}
                                                        onReject="0d064982ef3aebe4cc4a1ac5f4115ad2">
                                                        <BsFacebook color="blue" size={30}/>
                                                    </LoginSocialFacebook>
                                                </div>
                                                <div className="col-3">
                                                    <Link className="btn"
                                                    to={`/face`}>
                                                    <LuScanFace size={30} />
                                                    </Link>
                                                </div>
                                                <div className="col-3">
                                                    <Link className="btn"
                                                          to="/face">
                                                        <FaSquareGithub size={30} />
                                                    </Link>
                                                </div>
                                                <div className="col-3">
                                                    <Link className="btn"
                                                          to="/face">
                                                        <FcGoogle  size={30} />
                                                    </Link>
                                                </div>
                                            </div>
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