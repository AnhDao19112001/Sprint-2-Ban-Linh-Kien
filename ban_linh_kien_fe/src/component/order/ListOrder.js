import {useEffect, useState} from "react";
import {getOrderDetails, listOrder} from "../../service/cart/Orders";
import Swal from "sweetalert2";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineRollback} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";

const ListOrder = () => {
    const [invoices, setInvoices] = useState([]);
    const [dateOrderTime, setDateOrderTime] = useState({
        startDateTime: "",
        endDateTime: ""
    });
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [optionSort, setOptionSort] = useState("");
    const loadAllInvoice = async (pageList, dateTime, sortBy) => {
        try {
            const tmpInvoice = await listOrder(pageList, dateTime, sortBy);
            console.log(tmpInvoice)
            setInvoices(tmpInvoice.data.content);
            setPage(tmpInvoice.data.pageable.pageNumber);
            setTotalPage(tmpInvoice.data.totalPages);
        } catch (error) {
            console.log(error);
            if (error.response.data.startDateTime) {
                Swal.fire({
                    icon: "error",
                    text: error.response.data.startDateTime,
                });
            }
            if (error.response.data.endDateTime) {
                Swal.fire({
                    icon: "error",
                    text: error.response.data.endDateTime,
                });
            }
        }
    }

    const handleSelectSort = (value) => {
        setOptionSort(value);
    }
    useEffect(() => {
        loadAllInvoice(page, dateOrderTime, optionSort);
    }, [page, dateOrderTime, optionSort])

    return (
        <>
            <Header onInputChange={() => {}}/>
            <div>
                <h1 className="title-employee text-center">Lịch sử bán hàng</h1>
            </div>

            <div className="mx-auto container ">

                <fieldset className="border border-dark rounded-3 p-3 h-100 shadow-sm "
                          style={{backgroundColor: '#f8f9fa'}}>
                    <legend className="float-none w-auto px-3">Thông tin hóa đơn</legend>
                    <Formik
                        initialValues={{
                            startDateTime: "",
                            endDateTime: ""
                        }}
                        validationSchema={Yup.object({
                            startDateTime: Yup.string().required("Vui long nhập ngày bắt đầu"),
                            endDateTime: Yup.string().required("Vui long nhập ngày bắt đầu")
                        })}
                        onSubmit={async (values) => {
                            console.log(values)
                            setPage(0);
                            setDateOrderTime((pre) => values);
                        }}
                    >
                        <Form>
                            <div className="row">
                                <div className="d-flex col-9">
                                    <label className="me-2 p-2">Từ ngày</label>
                                    <Field name="startDateTime" type={"date"} className={"form-control"}
                                           style={{width: "240px"}}/>
                                    <label className="mx-2 p-2">Đến ngày</label>
                                    <Field name="endDateTime" type={"date"} className={"form-control"}
                                           style={{width: "240px"}}/>
                                    <button type="submit" className="btn btn-outline-dark mx-2"><i
                                        className="fa-solid fa-magnifying-glass"/>Tìm kiếm
                                    </button>
                                </div>
                                <div className="d-flex col-3 ">
                                    <label className="me-2 p-2">Sắp xếp theo</label>
                                    <select onChange={(event) => handleSelectSort(event.target.value)}
                                            className={"form-select"} style={{width: "180px"}}>
                                        <option value={"nameCustomer"}>Tên khách hàng</option>
                                        <option value={"dateTimeAsc"}>Ngày lập tăng dần</option>
                                        <option value={"dateTimeDes"}>Ngày lập giảm dần</option>
                                        <option value={"orderDetailsPriceAsc"}>Tổng tiền tăng dần</option>
                                        <option value={"orderDetailsPriceDes"}>Tổng tiền giảm dần</option>
                                    </select>
                                </div>
                            </div>
                        </Form>
                    </Formik>

                </fieldset>

                <div className="pt-2">
                    <div>
                        <div className="table-container rounded-top ">
                            <table className="table table-hover ">
                                <thead>
                                <tr className="th-list">
                                    <th className="px-3 py-2" style={{width: "260px"}}>Tên khách hàng
                                    </th>
                                    <th className="px-3 py-2" style={{width: "130px"}}>Ngày lập
                                    </th>
                                    <th className="px-3 py-2" style={{width: "150px"}}>Tổng tiền (VNĐ)
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoices.length !== 0 ?
                                    invoices.map((invoice) => (
                                            <tr>
                                                <td className={`px-3 py-3 `}>
                                                    <Link to={`/order-detail/${invoice.id}`}>
                                                    {invoice.fullName}
                                                    </Link>
                                                </td>
                                                <td className={`px-3 py-3 `}>{invoice.orderDate}</td>
                                                <td className={`px-3 py-3 `}>{new Intl.NumberFormat("vi-VN").format(
                                                    invoice.orderDetailPrice)}</td>
                                            </tr>
                                        )
                                    ) : <tr>
                                        <td colSpan="8" style={{textAlign: "center"}}>Không có dữ liệu</td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                        <div
                            className={`justify-content-center d-flex rounded-bottom shadow ${
                                totalPage === 0 ? "d-none" : ""
                            }`}>
                            <button className={`btn btn-outline-dark ${
                                page === 0 ? "disabled" : ""
                            }`}
                                    style={{margin: "5px"}}
                                    onClick={() => {
                                        if (page < totalPage && page > 0) {
                                            setPage((prev) => prev - 1);
                                        }
                                    }}>
                                <AiOutlineDoubleLeft className=""/>
                            </button>
                            <div className="text-sm py-2 px-4"
                                 style={{
                                     background: "white",
                                     color: "black",
                                     margin: "5px",
                                     borderRadius: "5px"
                                 }}>
                                {page + 1}/{totalPage}
                            </div>
                            <button className={`btn btn-outline-dark ${
                                page === totalPage - 1 ? "disabled" : ""
                            }`}
                                    style={{margin: "5px"}}
                                    onClick={() => {
                                        if (page < totalPage) {
                                            setPage((prev) => prev + 1);
                                        }
                                    }}
                            >
                                <AiOutlineDoubleRight className="mx-1"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="button-list-employee justify-content-end d-flex">
                    <Link to="/home">
                        <button className="btn btn-outline-dark m-1">
                            <AiOutlineRollback/>
                            Trở về
                        </button>
                    </Link>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default ListOrder;