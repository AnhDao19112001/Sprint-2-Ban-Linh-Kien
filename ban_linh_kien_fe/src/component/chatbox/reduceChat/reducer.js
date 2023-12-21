const initState = [];

const chatReducer = (chat = initState,action) => {
    const {type, payload} = action;

    switch (type){
        case "GET_ALL_CHAT":
            console.log("ccccccc ",payload);
            return payload;
        default:
            console.log("ddddddd ",chat)
            return chat;
    }
};
export default chatReducer;