import { Link } from "react-router-dom";
import { logout } from "../../utils/logout";
import * as userService from "../../utils/userService"
import { Nav } from "../partial/Navbar";
import './Header.scss'

export function Header(){

    return(
        <div className="hero_area ">
    {/* header section strats */}
    <header className="header_section">
      <div className="container-fluid">
       <Nav/>
      </div>
    </header>
    {/* end header section */}
    {/* slider section */}
    <section className="slider_section">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
          <li data-target="#carouselExampleIndicators" data-slide-to={3} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-5 offset-md-1">
                  <div className="detail-box">
                    <div className="number">
                      <h5>01</h5>
                    </div>
                    <h1>
                      <span>Книжно Царство</span>
                    </h1>
                    <p>
                      Книжно царство е приложение, където можете да споделяте впечатления от любими книги.
                    </p>
                    <div className="btn-box">
                      <Link to="/categories" className="btn-1">
                        Категории
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-box">
                    <img src="/static/images/Open Doodles - Reflecting.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-5 offset-md-1">
                  <div className="detail-box">
                    <div className="number">
                      <h5>02</h5>
                    </div>
                    <h1>
                      <span>Книжно Царство</span>
                    </h1>
                    <p>
                      Една от най-популярните ни категории е "Приключенска литература". Кликнете върху бутона долу и се вдъхновете да се впуснете в приключения.
                    </p>
                    <div className="btn-box">
                    <Link to="/category/adventure" className="btn-1">
                        Виж
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="img-box">
                    <img src="/static/images/Open Doodles - Studying.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-5 offset-md-1">
                  <div className="detail-box">
                    <div className="number">
                      <h5>03</h5>
                    </div>
                    <h1>
                      <span>Книжно Царство</span>
                    </h1>
                    <p>
                      Има книги, които винаги ще вълнуват всяко следващо поколение и винаги ще се наричат Класика. Ако сте пропуснали някои от тях, вижте какво казват за тях е направете своя избор.
                    </p>
                    <div className="btn-box">
                    <Link to="/category/classic" className="btn-1">
                        Виж
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-box">
                    <img src="/static/images/Open Doodles - Petting.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="carousel-item">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-5 offset-md-1">
                  <div className="detail-box">
                    <div className="number">
                      <h5>04</h5>
                    </div>
                    <h1>
                      <span>Печели, докато споделяш!</span>
                    </h1>
                    <p>
                      Споделяй резюмета на любимите си книги и получавай точки! За всеки 20 получавате <span style={{color: "tomato", fontSize: "20px"}}>10% намаление</span> от избрано издателство! Не пропускайте!
                    </p>
                    <div className="btn-box">
                      {localStorage.getItem("auth")?
                    <Link to="/add" className="btn-1">
                        Сподели сега
                      </Link>:
                      <Link to="/register" className="btn-1">
                      Регистрирай се
                    </Link>
                      }
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-box">
                    <img src="/static/images/Open Doodles - Messy.png" alt="" />
                  </div>
                </div>
              </div>
            </div></div>
          </div>
        </div>
    </section>
    {/* end slider section */}
        </div>
    )
}