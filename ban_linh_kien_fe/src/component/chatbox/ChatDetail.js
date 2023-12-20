import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {useEffect, useRef, useState} from "react";
import {getDate, IdByNow} from "../../service/formatData";
import "./chatBox.css"
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

export function ChatDetail({accountId}) {
    const [inputMess, setInputMess] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [typing, setTyping] = useState(false);
    const [content, setContent] = useState();
    const inputImgRef = useRef();
    const buttonArea = useRef();
    const display = useRef();

    const pushMessRealTime = async (type, text) => {
        if (text !== "") {
            const path = "mess/mess-" + accountId;
            const pathNoti = "noti/mess-" + accountId;
            const idMessage = IdByNow();

            await push(refText(database, path), {
                id: idMessage,
                adminSend: true,
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
    const scaleInput = () => {
        if (!typing) {
            buttonArea.current.style.gridTemplateColumns = "50px 50px 1fr 50px";
        } else {
            buttonArea.current.style.gridTemplateColumns = "50px 1fr 50px";
        }
    }
    const handleImageUpload = async (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            try {
                let file = files[i];
                let storageRef = refImage(storage, `product` + file.name);
                let snapshot = await uploadBytes(storageRef, file);
                let downloadURL = await getDownloadURL(snapshot.ref);
                pushMessRealTime("img", downloadURL);
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
        scaleInput();
    },[typing])
    useEffect(() => {
        getDatabase();
    }, [accountId])

    return (
        <>
            <div className="chatbox-detail-display borderradius color0 boxshadow-inset" ref={display}>
                {content &&
                    content.map(e => {
                        return (
                            <div key={e.id} className={`chat ${e.adminSend ? "chatme" : "chatyou"}`}>
                                {
                                    e.type === "text" &&
                                    <p className={`chattext borderradius ${e.adminSend ? "color3" : "color2"}`}
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
            <div ref={buttonArea} className="chatbox-detail-button">
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
                     onClick={handleSendMessage}
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
        </>
    )

}