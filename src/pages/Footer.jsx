import '../assets/css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faSnapchat } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <div id="footerContainer">
          <div id="about">
            <b>About</b>
            <p>Fenosoa Randriamamitina</p>
            <p>Ranaivoarimanana Fitahiana Roland</p>
            <p>Aina Ravelonarivo</p>
            <p>Danny Perry</p>
          </div>
          <div id="middle">
            <b>Follow us</b>
            <div id='svgContainer'>
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faSnapchat} />
            </div>
          </div>
          <div id="contact">
            <b>Contact</b>
            <p>+ 261 45 879 44</p>
            <p>fitahianaroland@gmail.com</p>
          </div>
        </div>
    );
}
export default Footer