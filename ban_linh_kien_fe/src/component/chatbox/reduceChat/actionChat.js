import {checkIdCustomers} from "../../../service/user/UserService";

export const getAllChat = (id) => async (dispatch) => {
    try {
        const result = await checkIdCustomers(id);
        dispatch({
            type: "GET_ALL_CHAT",
            payload: result,
        });
        console.log("aaaaaaaaaaaaaaaaa ",result)
    } catch (error) {
        console.log(error);
    }
}