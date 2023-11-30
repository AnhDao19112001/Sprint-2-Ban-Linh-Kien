import axios from "axios";
import jwtDecode from "jwt-decode";

export const loginUser = async (appUser) => {
    const result = await axios.post(`http://localhost:8080/api/user/login-by-username`,appUser)
    return result;
}

export const loginFacebook = async (facebookMail) => {
    const result = await axios.post(`http://localhost:8080/api/user/login-by-facebook`,facebookMail);
    return result;
}

export const addJwtTokenToLocalStorage = (jwtToken) => {
    localStorage.setItem("JWT", jwtToken);
}

export const registerUser = async (appUser) => {
    const result = await axios.post(`http://localhost:8080/api/user/register-by-customer`,appUser);
    return result;
}

export const infoAppUserByJwtToken = () => {
    const jwtToken = localStorage.getItem("JWT");
    if (jwtToken) {
        const result = jwtDecode(jwtToken);
        return result;
    }
}

export const getIdByUserName = async (userName) => {
    const result = await axios.get(`http://localhost:8080/api/user/id-user/${userName}`);
    return result;
}

export const checkRollAppUser = (roleName) => {
    const jwtToken = localStorage.getItem("JWT");
    if (jwtToken){
        const roleList = jwtDecode(jwtToken).roleList;
        const checkRole = roleList.some((role) => role.authority === roleName);
        return checkRole;
    }
}

export const checkIdCustomers = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/user/${id}`);
        return result.data;
    } catch (error){
        console.log(error);
    }
}

export const updateCustomerById = async (appUser) => {
    await axios.patch(`http://localhost:8080/api/user/update/${appUser.id}`,appUser);
}