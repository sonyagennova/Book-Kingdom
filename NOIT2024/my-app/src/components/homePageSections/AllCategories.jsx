import { Link } from "react-router-dom";
import './AllCategories.scss'

export function AllCategories(){
    return(
        <section className="pet_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src="./static/images/books-5.png" alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <img src="./static/images/storytelling.png" alt="" />
                  <h2>Царство от царства</h2>
                </div>
                <p>
                  Всяка книга тук живее в царството на своя жанр. Към всяко царство можете да добавите книга или просто да се разходите и разгледате вече съществуващите.
                </p>
                <div className="btn-box">
                  <Link to="/categories">
                    <span>Виж всички</span>
                    <img src="./static/images/link-arrow-1.png" alt="" />
                  </Link>
                  {localStorage.getItem("auth") &&
                  <Link to="/add">
                    <span>Добави книга</span>
                    <img src="./static/images/link-arrow-1.png" alt="" />
                  </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}