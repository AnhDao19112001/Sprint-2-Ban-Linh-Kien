import "./chatbox.css"
import {useEffect, useRef, useState} from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
    database,
    getDownloadURL,
    onValue,
    push,
    refImage,
    refText,
    storage,
    uploadBytes
} from "../../firebase";
import {getDate, IdByNow} from "../../service/formatData";
import {infoAppUserByJwtToken} from "../../service/user/UserService";
export default function PersonalChat() {
    const [showChat, setShowChat] = useState(false);
    const [typing, setTyping] = useState(false);
    const [inputMess, setInputMess] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [content, setContent] = useState([]);
    const inputImgRef = useRef();
    const buttonArea = useRef();
    const display = useRef();
    const accountId = infoAppUserByJwtToken();
    const pushMessRealTime = async (type, text) => {
        if (text !== "") {
            const path = "mess/mess-" + accountId;
            const pathNoti = "noti/mess-" + accountId;
            const idMessage = IdByNow();

            await push(refText(database, path), {
                id: idMessage,
                adminSend: false,
                content: text,
                type: type,
                release: new Date() + ""
            })
            scrollToBottom();
        }
    }
    const hiddenButton = (e) => {
        let str = e.target.value;
        setInputMess(str);
        if (str === "") {
            setTyping(false);
        } else {
            setTyping(true);
        }
    }
    const enterButton = (key) => {
        if (key === "Enter") {
            handleSendMessage();
        }
    }
    const handleSendMessage = () => {
        pushMessRealTime("text", inputMess);
        setShowEmoji(false);
        setInputMess("");
        setTyping(false);
    }
    const handlePickEmoji = (emoji) => {
        setInputMess(inputMess + emoji.native);
        setTyping(true);
    }
    const handleImageUpload = async (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            try {
                let file = files[i];
                let storageRef = refImage(storage, `images-chatbox/` + file.name);
                let snapshot = await uploadBytes(storageRef, file);
                let downloadURL = await getDownloadURL(snapshot.ref);
                await pushMessRealTime("img", downloadURL);
            } catch (e) {
                console.log(e);
            }
        }
    };
    const getDatabase = async () => {
        await onValue(refText(database, `mess/mess-${accountId}`),  (data) => {
            let message = [];
            data.forEach(e => {
                message.unshift(e.val());
            });
            setContent(message);
        });
    }

    const scrollToBottom = () => {
        if (display.current) {
            display.current.scrollTop = display.current.scrollHeight;
        }
    };

    useEffect(() => {
        getDatabase();
    },[])

    if (!accountId) {return null}
    return (
        <div className="personalChat boxshadow-outset">
            {showChat ?
                <div className="personalChatUnhidden color3">
                    <div className="cursorPoint personalChatUnhidden-title"
                         onClick={() => {setShowChat(false)}}
                    >
                        🗨️ Chăm sóc khách hàng
                    </div>
                    <div className="personalChatUnhidden-detail color0">
                        {content &&
                            content.map(e => {
                                return (
                                    <div key={e.id} className={`chat ${!e.adminSend ? "chatme" : "chatyou"}`}>
                                        {
                                            e.type === "text" &&
                                            <p className={`chattext borderradius ${!e.adminSend ? "color3" : "color2"}`}
                                               title={getDate(e.release)}
                                            >
                                                {e.content}
                                            </p>
                                        }
                                        {
                                            e.type === "img" &&
                                            <img className={`chatpicture borderradius`} src={e.content}
                                                 title={getDate(e.release)}
                                            />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div ref={buttonArea} className={`personalChatUnhidden-button 
                    ${typing ? "personalChatUnhidden-button-type"
                        : "personalChatUnhidden-button-nottype"}`}>
                        <div
                            className="chatbox-detail-button-emoji color5"
                            title="Thêm emoji"
                            onClick={() => {setShowEmoji(!showEmoji)}}
                        />
                        {!typing &&
                            <div className="chatbox-detail-button-img color5"
                                 title="Thêm ảnh"
                                 onClick={() => {inputImgRef.current.click()}}
                            />}
                        <input
                            onChange={hiddenButton}
                            className="chatbox-detail-button-input"
                            placeholder="Aa"
                            title="Nhập tin nhắn"
                            onKeyDown={(e) => {enterButton(e.key)}}
                            value={inputMess}
                        />
                        <div className="chatbox-detail-button-send color0" title="Gửi tin nhắn"

                        />

                    </div>
                    {showEmoji &&
                        <div className="emoji">
                            <Picker
                                data={data}
                                theme="light"
                                onEmojiSelect={(e) => handlePickEmoji(e)}
                                maxFrequentRows="2"
                                navPosition="bottom"
                                perLine="8"
                                searchPosition="none"
                                previewPosition="none"
                            />
                        </div>
                    }
                    <input
                        onChange={handleImageUpload}
                        ref={inputImgRef}
                        type="file"
                        multiple={true}
                        hidden={true}
                        accept="image/*"
                    />


                </div> :
                <div
                    className="personalChatHidden cursorPoint color3"
                    onClick={() => {setShowChat(true)}}
                >
                    🗨️ Chăm sóc khách hàng
                </div>
            }
        </div>
    )
}