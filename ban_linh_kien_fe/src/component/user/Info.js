import {useEffect, useState} from "react";
import {
    checkIdCustomers,
    getIdByUserName,
    infoAppUserByJwtToken,
    updateCustomerById
} from "../../service/user/UserService";
import "../../css/Info.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Header from "../home/Header";
import Footer from "../home/Footer";
function Info() {
    const [customer, setCustomer] = useState(null);
    const param = useParams();
    const navigate = useNavigate();

    const loadCustomerDetail = async (id) => {
        try {
            const result = await checkIdCustomers(id);
            if ( result == null){
                Swal.fire("Không tìm thấy người dùng!","","error");
                navigate(-1);
            }
            setCustomer(result);
        } catch (error){
            if (error.status === 406){
                Swal.fire("Khách hàng không tồn tại!","","error");
                navigate(-1);
            }
        }
    }

    const handleSubmit = async (value, setError) => {
        try {
            const result = await updateCustomerById(value);
            Swal.fire({
                title:"Cập nhật khách hàng " +value.fullName+ " thành công!",
                icon:"success",
                timer:"3000",
            });
            navigate(-1)
        } catch (error){
            if (error.response.data){
                setError(error.response.data);
            }
            if (error.status === 406){
                setError(error.response.data);
            }
        }
    }

    useEffect(() => {
        loadCustomerDetail(param.id);
    },[param.id]);

    const fetchData = async () => {
        try {
            const user = await getIdByUserName(infoAppUserByJwtToken(localStorage.getItem('JWT')).sub);
            setCustomer(user.data);
            console.log(user.data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (!customer){
        return null;
    }

    return (
        customer && (
            <>
                <Header/>
                <div className="container">
                    <Formik initialValues={{
                        ...customer,
                    }}
                            validationSchema={Yup.object({
                                fullName: Yup.string()
                                    .required("Không bỏ trống tên!")
                                    .min(3,"Tên không ngắn hơn 3 ký tự!")
                                    .max(50,"Tên kgoong dài hơn 50 ký tự!"),
                                address: Yup.string()
                                    .required("Không bỏ trống địa chỉ!")
                                    .min(10,"Địa chỉ quá ngắn!")
                                    .max(1000, "Địa chỉ quá dài!"),
                                phone: Yup.string()
                                    .required("Không bỏ trống số điện thoại!")
                                    .matches(/^(0[3|5|7|8|9])([0-9]{8})\b$/,"Nhập sai định dạng số điện thoại!")
                                    .min(10,"Số điện thoại không nhỏ hơn 10 số!")
                                    .max(11,"Số đện thoại không hơn 11 số!"),
                                email:Yup.string()
                                    .required("Không bỏ trống email!")
                                    .matches(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
                                        ,"Nhập sai định dạng email!")
                                    .max(40,"Email tối đa 40 ký tự!")
                            })}
                            onSubmit={(values,{setError}) => handleSubmit(values,setError)}>
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                                <h2 className="h3 mb-4 mt-2 page-title">Thông tin cá nhân</h2>
                                <div className="my-4">
                                    <Form>
                                        <div className="row mt-5 align-items-center">
                                            <div className="col-md-3 text-center mb-5">
                                                <div className="avatar avatar-xl">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                         alt="..."
                                                         className="avatar-img rounded-circle"/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="row align-items-center">
                                                    <div className="col-md-7">
                                                        <h4 className="mb-1">{customer.fullName}</h4>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-md-7">
                                                        <p className="text-muted-1">
                                                            Cảm ơn vì đã dành niềm tin vào thương hiệu của chúng tôi.
                                                            Thành
                                                            công mà chúng tôi đạt được phụ thuộc vào sự tin tưởng của
                                                            những
                                                            vị khách hàng như bạn.

                                                        </p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="small mb-0 text-muted-1">Tên đăng
                                                            nhập: {customer.userName}</p>
                                                        <p className="small mb-0 text-muted-1">Email: {customer.email}</p>
                                                        <p className="small mb-0 text-muted-1">Số điện
                                                            thoại: {customer.phone}</p>
                                                        <p className="small mb-0 text-muted-1">Địa
                                                            chỉ: {customer.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4"/>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="firstname">Họ và tên</label>
                                                <Field type="text" id="firstname" className="form-control"
                                                       name="fullName"/>
                                                <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                    <ErrorMessage
                                                        className=" text-danger"
                                                        name="fullName"
                                                        component="small"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputEmail4">Email</label>
                                            <Field type="email" className="form-control" id="inputEmail4"
                                                   name="email"/>
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                <ErrorMessage
                                                    className=" text-danger"
                                                    name="email"
                                                    component="small"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputAddress5">Địa chỉ</label>
                                            <Field type="text" className="form-control" id="inputAddress5"
                                                   name="address"/>
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                <ErrorMessage
                                                    className=" text-danger"
                                                    name="address"
                                                    component="small"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputAddress5">Số điện thoại</label>
                                            <Field type="number" className="form-control" id="inputAddress5"
                                                   name="phone"/>
                                            <div style={{height: "0.6rem", marginBottom: "0.6rem"}}>
                                                <ErrorMessage
                                                    className=" text-danger"
                                                    name="phone"
                                                    component="small"
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Lưu</button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Formik>
                </div>
                <Footer/>
            </>
        )
    )
}

export default Info;