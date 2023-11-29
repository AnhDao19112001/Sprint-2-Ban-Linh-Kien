import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./component/user/Login";
import Home from "./component/home/Home";
import {EnumAppUserRole} from "./component/user/EnumAppUserRoles";
import Authentication from "./component/user/Authentication";
import AuthorOfCustomer from "./component/user/AuthorOfCustomer";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
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
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
