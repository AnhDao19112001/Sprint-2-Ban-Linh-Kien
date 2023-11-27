import * as userService from "../../service/user/UserService"
import {Navigate, Outlet} from "react-router-dom";
const AuthorOfCustomer = ({ allowedRoles }) => {
    const roleAdmin = userService.checkRollAppUser("ROLE_ADMIN");

    const infoUser = userService.infoAppUserByJwtToken();


    let roles;
    if (infoUser) {
        roles = infoUser.roleList;
    }

    return roles && (roleAdmin)  ? (
        <Outlet />
    ) : <Navigate to={`/403`} />

}

export default AuthorOfCustomer;