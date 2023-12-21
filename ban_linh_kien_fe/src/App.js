import './App.css';
import Login from "./component/user/Login";
import Cart from "./component/order/Cart";
import {Route, Routes} from "react-router-dom";
import DetailProduct from "./component/order/DetailProduct";
import Authentication from "./component/user/Authentication";
import {EnumAppUserRole} from "./component/user/EnumAppUserRoles";
import AuthorOfCustomer from "./component/user/AuthorOfCustomer";
import "bootstrap/dist/css/bootstrap.css"
import SearchPage from "./component/search/SearchPage";
import ListOrder from "./component/order/ListOrder";
import OrderDetail from "./component/order/OrderDetail";
import FaceID from "./component/user/FaceID";
import Home from "./component/home/Home";
import ProductWithKind from "./component/home/ProductWithKind";
import Test from "./component/chatbox/Test";
import Info from "./component/user/Info";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/testChat" element={<Test />}/>
            <Route path="/face" element={<FaceID/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path='/details/:idProduct' element={<DetailProduct/>}/>
            <Route path='/user-info/:id' element={<Info/>}/>
            <Route path='/home/list-product/:nameType' element={<ProductWithKind/>}/>
            <Route path='/home/search/' element={<SearchPage/>}/>
            <Route path={`/home/search/:nameProduct`} element={<SearchPage />} />
            <Route path={`/home/list-order`} element={<ListOrder />} />
            <Route path={`/order-detail/:idOrder`} element={<OrderDetail />} />
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
