import {useEffect, useState} from "react";
import {checkIdCustomers, getAllUserList} from "../../service/user/UserService";
import {useDispatch, useSelector} from "react-redux";
import {ChatDetail} from "./ChatDetail";
import "./chatBox.css"
import {getAllChat} from "./reduceChat/actionChat";

function ChatBox() {
    const [users, setUsers] = useState();
    const [userList, setUserList] = useState();
    const customerId = useSelector(state => state.chatReducer);
    console.log(customerId)
    const dispatch = useDispatch();
    const getUserChat = async () => {
        const result = await checkIdCustomers(customerId);
        console.log(result)
        setUsers(result);
    }
    const getCustomer = async () => {
        const result = await getAllUserList();
        const data = [...result];
        console.log(result)
        setUserList(data);
    }
    const setChatBox = () => {
        dispatch(getAllChat(customerId));
    }

    useEffect(() => {
        if (customerId !== -1){
            getUserChat();
        }
    }, [customerId]);

    useEffect(() => {
        getCustomer();
    }, [])

    return (
        <>
            <div className="chatbox">
                <div className="chatbox-info borderradius boxshadow-outset">
                    {users ?
                        <>
                            <div className="chatbox-info-name color5">
                                {users.fullName}
                            </div>
                            <div className="chatbox-info-avatar">
                                <div className="chatbox-info-avatar-item color5"
                                     style={{backgroundImage: `url("${users.image}")`}}/>
                            </div>
                            <div className="chatbox-info-info">
                                <p>📧 {users.image}</p>
                                <p>📲 {users.phone}</p>
                            </div>
                        </> : <div className="chatbox-info-empty"/>
                    }
                </div>
                <div className="chatlist">
                    <div className="chatlist-item color0 borderradius boxshadow-inset">
                        {userList && userList.map(e => {
                            return (
                                <div key={e.id}
                                     className={`chatlist-member ${customerId === e.id ?
                                         "chatlist-member-select" :
                                         "chatlist-member-unselect"}`}
                                     style={{
                                         backgroundImage: `url(${e.image})`
                                     }}
                                     title={e.fullName}
                                     onClick={() => {
                                         setChatBox(e.id)
                                     }
                                     }
                                >
                                    <span className="color1 borderradius">9</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="chatbox-detail">
                    {users && <ChatDetail id={customerId}/>}
                </div>
            </div>
        </>
    )
}

export default ChatBox;