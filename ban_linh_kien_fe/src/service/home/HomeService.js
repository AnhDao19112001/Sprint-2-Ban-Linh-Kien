import axios from "axios";

const baseURL = `http://localhost:8080/api/home`;

export const findProductForHomePage = async (nameProduct, nameType) => {
    try {
        const result = await axios.get(`${baseURL}?nameProduct=${nameProduct}&nameType=${nameType}`);
        return result;
    } catch (error) {
        console.log(error); 
    }
}

export const searchProduct = async (page,limit,nameProduct,nameType,sort,sortBy) => {
    try {
        console.log(`${baseURL}/list-page?page=${page}&limit=${limit}&nameProduct=${nameProduct}&nameType=${nameType}&sort=${sort}&sortBy=${sortBy}`)
        const result = await axios.get(`${baseURL}/list-page?page=${page}&limit=${limit}&nameProduct=${nameProduct}&nameType=${nameType}&sort=${sort}&sortBy=${sortBy}`);
        return result;
    }catch (error){
        console.log(error);
    }
}

export const findFavoriteProductForHomePage = async () => {
    try {
        const result = await axios.get(`${baseURL}/favorite`);
        return result;
    }catch (error){
        console.log(error);
    }
}