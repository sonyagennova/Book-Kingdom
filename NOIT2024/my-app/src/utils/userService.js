const baseUrlRegister = "book-kingdom-server.vercel.app/users/register";
const loginUrl = "book-kingdom-server.vercel.app/users/login"
const baseUrl = "book-kingdom-server.vercel.app/users/"
const logoutUrl = "book-kingdom-server.vercel.app/users/logout"

import images from '../utils/imageFilenames.js';

export const setUserProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImageUrl = images[randomIndex];

    return randomImageUrl;
}

export const setPoints = async(points, id) => {
    const body = {
        points: points
    }

    let response = await fetch(`book-kingdom-server.vercel.app/data/users/edit/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "X-Authorization": localStorage.getItem("accessToken")
        },
        body: JSON.stringify(body),
    })

    let result = await response.json()

    return result
}

export const setVouchers = async(userId, voucher) => {
    const body = {
        vouchers: voucher
    }

    let response = await fetch(`book-kingdom-server.vercel.app/data/users/edit/${userId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "X-Authorization": localStorage.getItem("accessToken")
        },
        body: JSON.stringify(body),
    })

    let result = await response.json()

    return result
}

export const register = async(data) =>{
    const body = {
        name: data.name,
        email: data.email,
        userImage: data.userImage || setUserProfileImage(),
        password: data.password,
        rPassword: data.rPassword,
    }

    if(body.password !== body.rPassword){
        alert("Passwords need to match!");
        throw new Error("Passwords need to match!");
    }

    let response = await fetch(baseUrlRegister, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
    const result = await response.json();

    if(result.status != 200){
            alert(result.message)
            throw new Error(result.message);
    }

    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("auth", [result.data.name, result.data.email, result.data._id])
    

    return result;
}

export const getOne = async (userId) => {
    const response = await fetch(`book-kingdom-server.vercel.app/data/users/${userId}`,{
        method: "GET",
        headers: {
            "X-Authorization": localStorage.getItem("accessToken")
        }
    })
    const result = await response.json();
    return result.data
}

export const deleteUser = async (userId) => {
    const response  = await fetch(`book-kingdom-server.vercel.app/data/users/${userId}`, {
        method: "DELETE",
        headers: {
            'X-Authorization': localStorage.getItem("accessToken")
        },
    })

    return response
}


export const editUserImage = async (userId, data) => {
    const body = {
        userImage: data.imageUrl
    }

    const response = await fetch(`book-kingdom-server.vercel.app/data/users/edit/${userId}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "X-Authorization": localStorage.getItem("accessToken")
        },
        body: JSON.stringify(body),
    })

    const result = await response.json();
    //console.log(result);

    return result;
}

export const editUserName = async (userId, data) => {
    const body = {
        name: data.name
    }

    const response = await fetch(`book-kingdom-server.vercel.app/data/users/edit/${userId}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "X-Authorization": localStorage.getItem("accessToken")
        },
        body: JSON.stringify(body),
    })

    const result = await response.json();
    //console.log(result);

    return result;
}

export const getAll = async() => {
    const response = await fetch('book-kingdom-server.vercel.app/data/users')
    const result = await response.json()
    return result
}

export const login = async(data) =>{
    const body = {
        email: data.email,
        password: data.password
    }

    const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    const result = await response.json();

    if(result.status != 200){
        alert(result.message)
        throw new Error(result.message);
    }


    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("auth", [result.data.name, result.data.email, result.data._id])

    return result;
}

export const logout = async() =>{
    await fetch(logoutUrl, {
        method: "GET", 
        //headers: {"X-Authorization": accessToken}
    })

    localStorage.removeItem("accessToken")
    localStorage.removeItem("auth")
}