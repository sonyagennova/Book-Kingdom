import * as userService from "./userService"

export async function logout(e){
    e.preventDefault()

    userService.logout();

    location.href = "/"
}