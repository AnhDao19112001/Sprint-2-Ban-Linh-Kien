import {ErrorMessage, Field, Form, Formik} from "formik";
import * as userService from "../../service/user/UserService";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from 'yup';

function Register() {
    const navigate = useNavigate();
    const registerAppUser = async (appUser, setError) => {
        const cloneAppUser = {
            ...appUser,
        }
        try {
            const result = await userService.registerUser(cloneAppUser);
            Swal.fire({
                icon: "success",
                title: "Quay về trang đăng nhập",
            })
            navigate("/login");
        } catch (err) {
            if (err.response.status === 406) {
                setError(err.response.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: err.response.data,
                })
            }
        }
    }

    const validateRegister = {
        userName: Yup.string()
            .required("Không để trống tài khoảng!")
            .test('check-userName', 'Không để trống tên tài khoảng!', (value) => value.trim().length !== 0)
            .min(3, "Tên đăng nhập phải lơớn hơn hoặc bằng 3 ký tự!")
            .max(50, "Tên đăng nhập phải ít hơn hoặc bằng 50 ký tự!"),
        password: Yup.string()
            .required("Không được để trống mật khẩu!")
            .test('check-userName', "Không để trống mật khẩu!", (value) => value.trim().length !== 0)
            .min(3, "Mật khẩu ít nhất 3 ký tự!")
            .max(50, "Mật khẩu phải ít hơn hoặc bằng 50 ký tự!"),
        confirmPassword: Yup.string()
            .required("Không được để trống mật khẩu!")
            .test('check-userName', "Không để trống mật khẩu", (value) => value.trim().length !== 0)
            .min(3, "Mật khẩu ít nhất 3 ký tự!")
            .max(50, "Mật khẩu ít hơn hoặc bằng 50 ký tự!")
            .oneOf([Yup.ref('password'), null], "Mật khẩu không trùng khớp!"),
        fullName: Yup.string()
            .required("Không để trống tên!"),
        email: Yup.string()
            .required("Không để trống email!"),
        phone: Yup.string()
            .required("Không để trống số điện thoại!"),
        address: Yup.string()
            .required("Không để trống địa chỉ!")
    }

    return (
        <>
            <Formik initialValues={{
                userName: "",
                password: "",
                confirmPassword: "",
            }}
                    validationSchema={Yup.object(validateRegister)}

                    onSubmit={(values, {setSubmitting, setErrors}) => {
                        setSubmitting(false);
                        registerAppUser(values, setErrors)
                    }}>
                <Form>
                    <section className="gradient-custom">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                    <div className="card bg-dark text-white"
                                        style={{borderRadius: "1rem"}}>
                                        <div className="card-body p-5 text-center">
                                            <div className="mt-md-4 pb-5">
                                                <h2 className="fw-bold mb-2 text-uppercase">Đăng ký</h2>
                                                <p className="text-white-50 mb-5">
                                                    Vui lòng nhập thông tin!
                                                </p>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="form-outline form-white mb-4 col-6">
                                                                <Field
                                                                    type="text"
                                                                    id="userName"
                                                                    name="userName"
                                                                    className="form-control form-control-lg"
                                                                />
                                                                <div style={{height: 20}}>
                                                                    <ErrorMessage name="userName" component="span"
                                                                                  className="text-danger"/>
                                                                </div>
                                                                <label className="form-label" htmlFor="userName">
                                                                    Tên đăng nhập <span className="text-danger">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="form-outline form-white mb-4 col-6">
                                                                <Field
                                                                    type="text"
                                                                    id="fullName"
                                                                    name="fullName"
                                                                    className="form-control form-control-lg"
                                                                />
                                                                <div style={{height: 20}}>
                                                                    <ErrorMessage name="fullName" component={"small"}
                                                                                  className="text-danger"/>
                                                                </div>
                                                                <label className="form-label" htmlFor="fullName">
                                                                    Tên đầy đủ <span className="text-danger">*</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="form-outline form-white mb-4 col-6">
                                                                <Field
                                                                    type="text"
                                                                    id="email"
                                                                    name="email"
                                                                    className="form-control form-control-lg"
                                                                />
                                                                <div style={{height: 20}}>
                                                                    <ErrorMessage name="email" component="span"
                                                                                  className="text-danger"/>
                                                                </div>
                                                                <label className="form-label" htmlFor="email">
                                                                    Email <span className="text-danger">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="form-outline form-white mb-4 col-6">
                                                                <Field
                                                                    type="text"
                                                                    id="phone"
                                                                    name="phone"
                                                                    className="form-control form-control-lg"
                                                                />
                                                                <div style={{height: 20}}>
                                                                    <ErrorMessage name="phone" component={"small"}
                                                                                  className="text-danger"/>
                                                                </div>
                                                                <label className="form-label" htmlFor="phone">
                                                                    Số điện thoại <span className="text-danger">*</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="form-outline form-white mb-4 col-6">
                                                                <Field
                                                                    type="password"
                                                                    id="typePasswordX"
                                                                    name="password"
                                                                    className="form-control form-control-lg"
                                                                />
                                                                <div style={{height: 20}}>
                                                                    <ErrorMessage name="password" component={"small"}
                                                                                  className="text-danger"/>
                                                                </div>
                                                                <label className="form-label" htmlFor="typePasswordX">
                                                                    Mật khẩu <span className="text-danger">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="form-outline form-white mb-4 col-6">
                                                                <Field
                                                                    name="confirmPassword"
                                                                    type="password"
                                                                    id="typePasswordX"
                                                                    className="form-control form-control-lg"
                                                                />
                                                                <div style={{height: 20}}>
                                                                    <ErrorMessage name="confirmPassword" component="small"
                                                                                  className="text-danger"/>
                                                                </div>
                                                                <label className="form-label" htmlFor="typePasswordX">
                                                                    Nhập lại mật khẩu <span className="text-danger">*</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-outline form-white mb-4">
                                                    <Field
                                                        type="text"
                                                        id="address"
                                                        name="address"
                                                        className="form-control form-control-lg"
                                                    />
                                                    <div style={{height: 20}}>
                                                        <ErrorMessage name="address" component={"small"}
                                                                      className="text-danger"/>
                                                    </div>
                                                    <label className="form-label" htmlFor="address">
                                                        Địa chỉ <span className="text-danger">*</span>
                                                    </label>
                                                </div>

                                                <button
                                                    className="btn btn-outline-light btn-lg px-5"
                                                    type="submit"
                                                >
                                                    Đăng ký
                                                </button>
                                            </div>
                                            <div>
                                                <p className="mb-0">
                                                    Bạn đã có tài khoảng?{" "}
                                                    <Link to={'/login'} className="text-white-50 fw-bold">
                                                        Đăng nhập
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

export default Register;