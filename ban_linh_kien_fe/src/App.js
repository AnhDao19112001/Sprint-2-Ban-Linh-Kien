import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./component/user/Login";
import Home from "./component/home/Home";
import {EnumAppUserRole} from "./component/user/EnumAppUserRoles";
import Authentication from "./component/user/Authentication";
import AuthorOfCustomer from "./component/user/AuthorOfCustomer";
import FaceID from "./component/user/FaceID";
import Footer from "./component/home/Footer";
import Header from "./component/home/Header";
import "bootstrap/dist/css/bootstrap.css"
import CartDetail from "./component/cart/CartDetail";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/face" element={<FaceID/>}/>
            <Route path="/1" element={<Header/>}/>
            <Route path="/2" element={<Footer/>}/>
            <Route path="/cart" element={<CartDetail/>}/>
            <Route element={
                <Authentication
                    allowedRoles={[
                        EnumAppUserRole.ROLE_ADMIN,
                        EnumAppUserRole.ROLE_CUSTOMER,
                    ]}
                />
            }>
                <Route element={<AuthorOfCustomer />}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/face" element={<FaceID/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
