/* eslint-disable no-undef */
import React, {useEffect} from 'react'
import "../../css/Face.css";
import {useNavigate} from "react-router-dom";
import * as userService from '../../service/user/UserService';
function FaceID() {
    let faceioInstance = null
    const navigate = useNavigate();
    useEffect(() => {
        const faceIoScript = document.createElement('script')
        faceIoScript.src = '//cdn.faceio.net/fio.js'
        faceIoScript.async = true
        faceIoScript.onload = () => faceIoScriptLoaded()
        document.body.appendChild(faceIoScript)

        return () => {
            document.body.removeChild(faceIoScript)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const faceIoScriptLoaded = () => {
        console.log(faceIO)
        if (faceIO && !faceioInstance) {
            faceioInstance = new faceIO('fioa5cc3')
        }
    }

    // Đăng ký khuôn mặt mới vào hệ thống
    // const faceRegistration = async () => {
    //     try {
    //         const userInfo = await faceioInstance.enroll({
    //             locale: "auto",
    //             payload: {
    //                 email: "daoben188@gmail.com",
    //                 userId: "19112903-id-anhdao11",
    //                 username: "anhdao99",
    //                 // website: "https://trungquandev.com"
    //             },
    //         })
    //         console.log(userInfo)
    //         console.log('Unique Facial ID: ', userInfo.facialId)
    //         console.log('Enrollment Date: ', userInfo.timestamp)
    //         console.log('Gender: ', userInfo.details.gender)
    //         console.log('Age Approximation: ', userInfo.details.age)
    //     } catch (errorCode) {
    //         console.log(errorCode)
    //         handleError(errorCode)
    //     }
    // }

    // Xác thực một khuôn mặt đã có vào hệ thống
    const faceSignIn = async () => {
        try {
            console.log(faceioInstance)
            const userData = await faceioInstance.authenticate({
                locale: "auto",
                payload: {
                    userName: "anhdao99",
                    // userId: ""
                }
            })
            const result = await userService.loginUser(userData);
            userService.addJwtTokenToLocalStorage(result.data.jwtToken);
            console.log(result);
            const tempURL = localStorage.getItem("tempURL");
            localStorage.removeItem("tempURL");
            if (tempURL){
                navigate(tempURL);
            } else {
                navigate(`/home`)
            }
            console.log(userData)
            console.log('Unique Facial ID: ', userData.facialId)
            console.log('PayLoad: ', userData.payload)
        } catch (errorCode) {
            console.log(errorCode)
            handleError(errorCode)
        }
    }

    const handleError = (errCode) => {
        switch (errCode) {
            case fioErrCode.PERMISSION_REFUSED:
                console.log("Access to the Camera stream was denied by the end user")
                break
            case fioErrCode.NO_FACES_DETECTED:
                console.log("No faces were detected during the enroll or authentication process")
                break
            case fioErrCode.UNRECOGNIZED_FACE:
                console.log("Unrecognized face on this application's Facial Index")
                break
            case fioErrCode.MANY_FACES:
                console.log("Two or more faces were detected during the scan process")
                break
            case fioErrCode.PAD_ATTACK:
                console.log("Presentation (Spoof) Attack (PAD) detected during the scan process")
                break
            case fioErrCode.FACE_MISMATCH:
                console.log("Calculated Facial Vectors of the user being enrolled do not matches")
                break
            case fioErrCode.WRONG_PIN_CODE:
                console.log("Wrong PIN code supplied by the user being authenticated")
                break
            case fioErrCode.PROCESSING_ERR:
                console.log("Server side error")
                break
            case fioErrCode.UNAUTHORIZED:
                console.log("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information")
                break
            case fioErrCode.TERMS_NOT_ACCEPTED:
                console.log("Terms & Conditions set out by FACEIO/host application rejected by the end user")
                break
            case fioErrCode.UI_NOT_READY:
                console.log("The FACEIO Widget code could not be (or is being) injected onto the client DOM")
                break
            case fioErrCode.SESSION_EXPIRED:
                console.log("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly")
                break
            case fioErrCode.TIMEOUT:
                console.log("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)")
                break
            case fioErrCode.TOO_MANY_REQUESTS:
                console.log("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications")
                break
            case fioErrCode.EMPTY_ORIGIN:
                console.log("Origin or Referer HTTP request header is empty or missing")
                break
            case fioErrCode.FORBIDDDEN_ORIGIN:
                console.log("Domain origin is forbidden from instantiating fio.js")
                break
            case fioErrCode.FORBIDDDEN_COUNTRY:
                console.log("Country ISO-3166-1 Code is forbidden from instantiating fio.js")
                break
            case fioErrCode.SESSION_IN_PROGRESS:
                console.log("Another authentication or enrollment session is in progress")
                break
            case fioErrCode.NETWORK_IO:
            default:
                console.log("Error while establishing network connection with the target FACEIO processing node")
                break
        }
    }

    return (
        <div className="face-authentication-by-anhdao flex fdc jcfc aic">
            <h1>Face Authentication using ReactJS & FaceIO</h1>
            <button className="action face-sign-in" onClick={faceSignIn}>Face Sign In</button>
        </div>
    )
}

export default FaceID;