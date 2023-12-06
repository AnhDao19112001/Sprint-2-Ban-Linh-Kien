import axios from "axios";

export const getAllType = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/type/list`);
        return result.data;
    }catch (error){
        console.log(error);
    }
}