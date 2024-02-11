import { Footer } from "../homePageSections/Footer";
import { Info } from "../homePageSections/InfoSection";
import { NavLogin } from "../partial/NavbarLogin";
import * as userService from "../../utils/userService"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function RegisterPage(){
  //const accessToken = localStorage.getItem("accessToken")

  let navigate = useNavigate()
  async function register(e){
    e.preventDefault();

    //

    // Get data from form data
    const data = Object.fromEntries(new FormData(e.target.form));

    // Create new user at the server
    await userService.register(data);
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("userImage").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("rPass").value = "";

    navigate("/")
  }

    return(
        <>
            <NavLogin/>
            <section className="contact_section layout_padding-top">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-5 offset-md-1">
        <div className="form_container">
          <div className="heading_container">
            <img src="./static/images/storytelling.png" alt="" />
            <h2>Регистрация</h2>
          </div>
          <form method="POST">
            <div>
              <input type="text" placeholder="Име " name="name" id="fullName"/>
            </div>
            <div>
              <input type="text" placeholder="Email" name="email" id="email"/>
            </div>
            <div>
              <input type="text" placeholder="URL линк за профилна снимка (не е задължително)" name="userImage" id="userImage"/>
            </div>
            <div>
              <input type="password" placeholder="Парола" name="password" id="pass"/>
            </div>
            <div>
              <input type="password" placeholder="Повтори паролата" name="rPassword" id="rPass"/>
            </div>
            <div className="d-flex ">
              <button onClick={register}>Регистрация</button>
            </div>
          </form>
        </div>
      </div>
      <div classname="col-md-6 px-0">
  <div classname="map_container">
    <div classname="map-responsive">
      <img src="./static/images/books-6.png" width={500}/>
    </div>
  </div>
</div>

    </div>
  </div>
</section>
<br />
<Footer />
        </>
    )
}