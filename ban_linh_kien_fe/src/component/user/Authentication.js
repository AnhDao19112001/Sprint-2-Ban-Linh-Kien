import {Navigate, Outlet} from "react-router-dom";
import * as userService from "../../service/user/UserService"
const hasValueInAuthorProperty = (allowedRoles, currentRoles) => {
    for (let i = 0; i < allowedRoles.length; i++) {
        const valueToCheck = allowedRoles[i];
        for (let j = 0; j < currentRoles.length; j++) {
            const obj = currentRoles[j];
            if (obj.authority === valueToCheck) {
                return true;
            }
        }
    }
    return false;
}
const Authentication = ({ allowedRoles }) => {
    const infoUser = userService.infoAppUserByJwtToken();


    let roles;
    if (infoUser) {
        roles = infoUser.roleList;
    }

    return roles && hasValueInAuthorProperty(allowedRoles, roles) ? (
        <Outlet />
    ) : <Navigate to={`/403`} />
}
export default Authentication;