import { Footer } from "../homePageSections/Footer";
import { Info } from "../homePageSections/InfoSection";
import { Nav } from "../partial/Navbar";
import { CapitalizeFirstLowercaseRest } from "../partial/FirstLetterCapitel";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import './CategoriesPage.scss'

export function CategoriesPage(){
    return(<>
    <div className="hero_area1 ">
        <section className="animal_section1">
        <div className="container-fluid">
            <Nav/>
        </div>
        <section className="slider_section" >
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
       
        <div className="carousel-inner">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-5 offset-md-1">
                  <div className="detail-box">
                    <h1>
                      <span>Всички категории</span>
                    </h1>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-box">
                    <img src="./static/images/Open Doodles - Reflecting.png" alt="" />
                  </div>
                </div>
                </div>
                </div>
                </div>
                </div></section><br/><br/><br/><br/><br/>
        <div className="container">
          <div className="animal_container">
            
            <div className="box b1">
              <div className="img-box">
                <Fragment>
                <Link to="/category/kids"><img src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></Link>
                </Fragment>
              </div>
              <div className="detail-box">
                <h5>Детска литература</h5>
              </div>
            </div>
            <div className="box b1">
              <div className="img-box">
                <Link to="/category/history"><img src="https://images.unsplash.com/photo-1585159858792-ceb6be5c1937?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></Link>
              </div>
              <div className="detail-box">
                <h5>Историческа литература</h5>
              </div>
            </div>
            <div className="box b2">
              <div className="img-box">
                <Link to="/category/fantasy"><img src="https://images.unsplash.com/photo-1573689705959-7786e029b31e?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></Link>
              </div>
              <div className="detail-box">
                <h5>Фентъзи</h5>
              </div>
            </div>
            <div className="box b2">
              <div className="img-box">
                <Link to="/category/romance"><img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=2973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></Link>
              </div>
              <div className="detail-box">
                <h5>Романтика</h5>
              </div>
            </div>
            <div className="box b2">
              <div className="img-box">
                <Link to="/category/adventure"><img src="https://images.unsplash.com/photo-1571782605941-8c8fd0d43df6?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></Link>
              </div>
              <div className="detail-box">
                <h5>Приключенска литература</h5>
              </div>
            </div>
            <div className="box b2">
              <div className="img-box">
                <Link to="/category/mystery"><img src="./static/images/mystery.jpg" alt="" /></Link>
              </div>
              <div className="detail-box">
                <h5>Мистерия</h5>
              </div>
            </div>
            <div className="box b2">
              <div className="img-box">
                <Link  to="/category/autobiography"><img src="https://images.unsplash.com/photo-1619878473858-ace2b236897c?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></Link>
              </div>
              <div className="detail-box">
                <h5>Биография</h5>
              </div>
            </div>
            <div className="box b2">
              <div className="img-box">
                <Link  to="/category/tragedy"><img src="https://images.unsplash.com/photo-1532598065077-cf9ee59bf91f?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></Link>
              </div>
              <div className="detail-box">
                <h5>Трагедия</h5>
              </div>
            </div>
            <div className="box b2">
              <div className="img-box">
                <Link to="/category/classic"><img src="https://images.unsplash.com/photo-1531079997448-485eb7235a2b?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></Link>
              </div>
              <div className="detail-box">
                <h5>Клсика</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      
        <Footer />
        </div>
      </>
    )
}