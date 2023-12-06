import axios from "axios";

export const addToOrders = async (cartDetails, userName) => {
    const result = await axios.post(`http://localhost:8080/api/order/create?userName=${userName}`,cartDetails);
    return result;
}
export const listOrder = async (page, orderDto,sortBy) => {
    const result = await axios.get(`http://localhost:8080/api/order/list?page=${page}
    &sortBy=${sortBy}&startDateTime=${orderDto.startDateTime}&endDateTime=${orderDto.endDateTime}`);
    return result;
}
export const getOrderDetails = async (idOrder) => {
    const result = await axios.get(`http://localhost:8080/api/order/get-order-detail?idOrder=${idOrder}`);
    console.log(result.data);
    return result.data;
}