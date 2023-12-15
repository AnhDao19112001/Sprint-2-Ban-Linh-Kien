const initState = [];

export const chatReducer = (chats=initState,action) => {
    const {type, payload} = action;

    switch (type){
        case "CHAT_ALL":
            return payload;
        default:
            return chats;
    }
}