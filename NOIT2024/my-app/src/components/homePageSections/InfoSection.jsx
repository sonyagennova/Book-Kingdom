import { Link } from "react-router-dom";
import './infoSection.scss'

export function Info(){
    return(
        <section className="info_section ">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <div className="info_contact">
            <h5>CONTACT INFO</h5>
            <div>
              <img src="./static/images/call.png" alt="" />
              <p>+01 1234567890</p>
            </div>
            <div>
              <img src="./static/images/mail.png" alt="" />
              <p>demo@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="info_time">
            <h5>Opening Hours Shop</h5>
            <div>
              <p>Monday to friday</p>
            </div>
            <div>
              <p>07:00 am to 04:00 pm</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="info_social">
            <h5>social media</h5>
            <div className="social_container">
              <div>
                <Link to="">
                  <img src="./static/images/fb.png" alt="" />
                </Link>
              </div>
              <div>
                <Link to="">
                  <img src="./static/images/twitter.png" alt="" />
                </Link>
              </div>
              <div>
                <Link to="">
                  <img src="./static/images/linkedin.png" alt="" />
                </Link>
              </div>
              <div>
                <Link to="">
                  <img src="./static/images/instagram.png" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="info_form pl-lg-4">
            <h5>Newsletter</h5>
            <form action="">
              <input type="text" placeholder="Enter Your Email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
    )
}