import {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import {addToOrders} from "../../service/cart/Orders";
import {infoAppUserByJwtToken} from "../../service/user/UserService";

export function Paypal(prop) {
    const paypal = useRef();
    const [cartDetail, setCartDetail] = useState({});
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    const price =  parseFloat(prop.propData1);
                    const priceUsd = parseInt(price / 23000);
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Very dicelious",
                                amount: {
                                    currency_code: "USD",
                                    value: priceUsd,
                                },
                            },
                        ],
                    });
                },
                onApprove: async(data, actions) => {
                    const order = await actions.order.capture();
                    setCartDetail({cartDetailDtoList: prop.proData2 });
                    const result = infoAppUserByJwtToken();
                    console.log(result);
                    console.log(cartDetail);
                    if (result != null){
                        await addToOrders ({
                            cartDetailDtoList: prop.proData2
                        }, result.sub)
                    }
                    Swal.fire("Thanh toán thành công!")
                    window.location.reload();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                    Swal.fire("Thanh toán không thành công!")
                }
            })
            .render(paypal.current);
    }, []);
    return(
        <>
            <div ref={paypal}
            ></div>
        </>
    )
}