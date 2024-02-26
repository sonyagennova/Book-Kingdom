import { Footer } from "../homePageSections/Footer";
import { Info } from "../homePageSections/InfoSection";
import { NavLogin } from "../partial/NavbarLogin";
import * as bookService from "../../utils/booksService"
import * as userService from "../../utils/userService"
import { useNavigate } from "react-router-dom";
import './createPage.scss'
import { useState } from "react";
import { Discount } from "../partial/Discount";
//import * as bookCreateHandler from "../otherPages/CategoryPage";

export function CreatePage(){
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true)

  const [points, setPoints] = useState(0)


  const closeModal = () => {
    setShowModal(false)
    navigate("/categories")
  }

  const bookCreateHandler = async (e) => {
    // Stop page from refreshing
    e.preventDefault();


    // Get data from form data
    const accessToken = localStorage.getItem("auth").split(',')[2]
    const data = Object.fromEntries(new FormData(e.target.form));

    // Create new user at the server
    await bookService.create(data, accessToken);
    
    const userId = localStorage.getItem("auth").split(",")[2];
    
    try {
      const result = await userService.getOne(userId);
      const updatedPoints = Number(result.points || 0) + 1; // Use 0 if points is null or undefined
      setPoints(updatedPoints);
    
      await userService.setPoints(updatedPoints, userId);
    
      // Check if the points are not a multiple of 20 or 0, then navigate
      if (updatedPoints % 20 !== 0 || updatedPoints === 0) {
        navigate("/categories");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
    return(
        <>
            <NavLogin />
            <section className="contact_section layout_padding-top">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-5 offset-md-1">
        <div className="form_container">
          <div className="heading_container">
            <img src="./static/images/storytelling.png" alt="" />
            <h2>Създай книга</h2>
          </div>
          <form method="POST">
            <div>
              <input type="text" name="title" placeholder="Заглавие" />
            </div>
            <div>
              <input type="text" name="author" placeholder="Автор" />
            </div>
            <div>
              <input type="text" name="publication_year" placeholder="Година на издаване" />
            </div>
            <div>
              <input type="text" name="description" placeholder="Резюме" rows="7"/>
            </div>
            <div>
              <input type="text" name="imageUrl" placeholder="URL линк за корица" />
            </div>
            <div>
              <input type="text" name="publisher" placeholder="Издателство" />
            </div>
            <div>
              <select name="category">
                <option value="детска литература">Детска литература</option>
                <option value="историческа литература">Историческа литература</option>
                <option value="фентъзи">Фентъзи</option>
                <option value="мистерия">Мистерия</option>
                <option value="трагедия">Трагедия</option>
                <option value="приключенска литература">Приключенска литература</option>
                <option value="биография">Биография</option>
                <option value="класика">Класика</option>
              </select>
            </div>
            <div className="d-flex ">
              <button type="submit" onClick={bookCreateHandler}>Създай</button>
            </div>
          </form>
        </div>
      </div>
      <div classname="col-md-6 px-0">
  <div classname="map_container">
    <div classname="map-responsive">
      <img src="./static/images/books-8.png" width={500}/>
    </div>
  </div>
</div>

    </div>
  </div>
</section>
<br />

{points == 20 &&
    <Discount showModal={showModal} closeModal={closeModal}/>
}

<Footer />
        </>
    )
}