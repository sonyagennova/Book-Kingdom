import './AboutSection.scss'

export function About(){
    return(
        <section className="about_section layout_padding">
    <div className="container">
      <div className="detail-box">
        <div className="heading_container">
          <img src="./static/images/storytelling.png" alt="" />
          <h2>За нас</h2>
        </div>
        <p>
        „Книжно Царство“ е проект на SVG Studios. Ние сме малък и ентусиазиран екип от freelance програмисти и дизайнери, които заедно реализират своите идеи в свободното си време.
Всеки от нас допринася със своите умения и страст към общата ни цел - да създадем нещо уникално и полезно. Работим с любов и отдаденост към детайла, за да осигурим висококачествени решения.
Вярваме в силата на креативността и иновациите. Нашата цел е да създаваме уникални и вдъхновяващи проекти, които да обогатят опита на нашите потребители. Стремим се да съчетаем технологията с изкуството, предлагайки продукти и услуги, които не само отговарят на нуждите, но и надхвърлят очакванията.
Заедно с нашите партньори сме насочени към взаимно усъвършенстване и успешно сътрудничество. Винаги сме отворени към обратна връзка и нови идеи.
        </p>
      </div>
    </div>
  </section>
    )
}