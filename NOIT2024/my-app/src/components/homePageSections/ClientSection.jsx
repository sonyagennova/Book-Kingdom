import { Link } from "react-router-dom";
import './ClientSection.scss';

export function ClientSection(){
    return(
        <section className="client_section layout_padding">
    <div className="container">
      <div className="heading_container">
        <img src="./static/images/heading-img.png" alt="" />
        <h2>What Says Our Customer</h2>
        <p>
          It is a long established fact that a reader will be distracted by the
        </p>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="box">
              <div className="img-box">
                <img src="./static/images/client.png" alt="" />
              </div>
              <div className="detail-box">
                <h4>Jack Mengo</h4>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable cIt is a long established fact that a reader
                  will be distracted by the readable c
                </p>
                <img src="./static/images/quote.png" alt="" />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="box">
              <div className="img-box">
                <img src="./static/images/client.png" alt="" />
              </div>
              <div className="detail-box">
                <h4>Jack Mengo</h4>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable cIt is a long established fact that a reader
                  will be distracted by the readable c
                </p>
                <img src="./static/images/quote.png" alt="" />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="box">
              <div className="img-box">
                <img src="./static/images/client.png" alt="" />
              </div>
              <div className="detail-box">
                <h4>Jack Mengo</h4>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable cIt is a long established fact that a reader
                  will be distracted by the readable c
                </p>
                <img src="./static/images/quote.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="carousel_btn-box">
          <Link
            className="carousel-control-prev"
            to="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span className="sr-only">Previous</span>
          </Link>
          <Link
            className="carousel-control-next"
            to="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span className="sr-only">Next</span>
          </Link>
        </div>
      </div>
    </div>
  </section>
    )
}