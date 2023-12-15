import "./Style.css";
import Slider from "react-slider";
import {useState} from "react";

const MIN = 1000;
const MAX = 500000;

function TestSlider() {
    const [values, setValues] = useState([MIN, MAX])
    console.log(values)
    return (
        <>
            <div className="app">
                <div className="box">
                    <h3>Tìm theo giá</h3>
                    <span className={"values"}>{values[0]} vnđ - {values[1]} vnđ</span>
                    <small>
                        Phạm vi hiện tại: {values[1] - values[0]} vnđ
                    </small>

                    <Slider className={"slider"}
                            onChange={setValues}
                            value={values}
                            min={MIN}
                            max={MAX}/>
                </div>
            </div>
        </>
    )
}

export default TestSlider;