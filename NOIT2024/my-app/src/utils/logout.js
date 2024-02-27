import { useNavigate } from "react-router-dom";
import * as userService from "./userService"

export async function logout(e){
    e.preventDefault()

    await userService.logout();

    location.href = "/"
}