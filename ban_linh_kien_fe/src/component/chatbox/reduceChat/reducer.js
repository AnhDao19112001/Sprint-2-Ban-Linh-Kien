
export const chatAction = (index) => {
    let array = [
        "selectChatCustomer"
    ]
    return array[index];
}

export const getAllChat = (id) => {
    return{
        type: chatAction(0),
        payload: id
    }
}
