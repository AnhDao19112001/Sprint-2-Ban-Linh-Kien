import {checkIdCustomers} from "../../../service/user/UserService";
export const getAllChat = (userName) => async (dispatch) =>{
    try {
        const result = await checkIdCustomers(userName);
        dispatch({
            type:"CHAT_ALL",
            payload: result.data
        });
    } catch (error){
        console.log(error);
    }
}
