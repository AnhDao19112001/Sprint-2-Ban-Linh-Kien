import {chatAction} from "./reducer";

const initState = {
    chatCustomer: -1
}
const actionChat = (chats = initState, action) => {
    switch (action.type) {
        case chatAction(0):
            return {
                ...chats,
                chatCustomer: action.payload
            };
        default:
            return chats;
    }

}
export default actionChat;