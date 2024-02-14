import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../utils/logout";
import * as userService from "../../utils/userService"

export function NavLogin(){
  let username = ''
  const [point, setPoint] = useState("")
  if(localStorage.getItem("auth")){
    username = localStorage.getItem("auth").split(",")[0];
  }
  const getPoints = async() => {
    await userService.getOne(localStorage.getItem("auth").split(",")[2])
      .then(result => setPoint(result.points))
  }

  getPoints()
    return(
        <>
            <body class="sub_page">
  <div class="hero_area ">

<header className="header_section">
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg custom_nav-container">
      <Link className="navbar-brand" to="/">
      <img src='/static/images/Книжно царство1.png' style={{width: "12rem"}}></img>
      </Link>
      <div className="" id="">
        {/* <div className="User_option">
          <form className="form-inline my-2  mb-3 mb-lg-0">
            <input type="search" placeholder="Search" />
            <button className="btn   my-sm-0 nav_search-btn" type="submit" />
          </form>
        </div> */}
        <div className="custom_menu-btn">
          <button onClick={openNav}>
            <span className="s-1"></span>
            <span className="s-2"></span>
            <span className="s-3"></span>
          </button>
        </div>
        <div id="myNav" className="overlay">
          <div className="overlay-content">
          {localStorage.getItem("auth") && <><h1 style={{color: "white"}}>Здравейте, {username}</h1><h2 style={{color: "white"}}>Точки: {point}</h2></>}<br></br>
          <Link to="/">Начало</Link>
                <Link to="/categories">Категории</Link>
                {localStorage.getItem("accessToken")?
                  <>
                  <Link to="/me">Моят профил</Link>
                  <Link to="/add">Създай книга</Link>
                  <Link onClick={logout}>Излез</Link></>:
                  <><Link to="/login">Влез</Link>
                  <Link to="/register">Регистрация</Link></>
                }
          </div>
        </div>
      </div>
    </nav>
  </div>
</header>
</div>
</body>
        </>
    )
}