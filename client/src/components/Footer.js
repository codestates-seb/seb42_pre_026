import { Link } from 'react-router-dom';
import FooterBigSvg from '../util/FooterLogo';
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #232629;
  color: hsl(210, 8%, 60%);

  @media screen and (max-width: 980px) {
    display: flex;
    flex-flow: row wrap;
    flex-direction: column;
  }

  > .footer {
    box-sizing: border-box;
    max-width: 1150px;
    width: 100%;
    margin: 0 auto;
    padding: 32px 12px 12px 12px;
    display: flex;
    flex-flow: row wrap;

    > .footer-logo {
      flex: 0 0 64px;
      margin: -12px 0 32px 0;

      @media screen and (max-width: 980px) {
        margin-left: 10px;
        margin-top: -20px;
      }
    }

    a {
      text-decoration: none;
      color: hsl(210, 8%, 60%);
      cursor: pointer;
    }

    > .footer-nav {
      @media screen and (max-width: 980px) {
        display: flex;
        flex-direction: column;
        margin-top: -5px;
        margin-left: 10px;
        padding-bottom: 10px;
      }

      li {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 500;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        @media screen and (max-width: 980px) {
          display: flex;
          column-gap: 12px;
          flex-flow: row wrap;
          flex-direction: row;
        }
      }
    }

    > .footer-nav {
      display: flex;
      flex: 2 1 auto;
      flex-wrap: wrap;

      > .footer-column {
        padding: 0 12px 24px 0;
        flex: 1 0 auto;

        > h5 {
          margin-top: 0;
          margin-bottom: 12px;
          font-size: 13px;
          font-weight: bold;
          color: hsl(210, 8%, 75%);

          > a {
            color: inherit;
          }
        }

        > ul {
          font-size: 13px;

          > li {
            margin: 0;
            padding: 4px 0;
          }
        }
      }
    }

    > .footer-copyright {
      display: flex;
      flex: 1 1 150px;
      flex-direction: column;
      box-sizing: border-box;
      margin-left: 10px;
      font-weight: 500;
      font-size: 10px;

      > ul {
        display: flex;

        > li {
          list-style: none;
          padding: 4px 0;
          margin-left: 12px;
          font-size: 10px;
          line-height: calc(17 / 13);
          :first-child {
            margin-left: 0;
          }
        }
      }

      > p {
        margin-top: auto;
        margin-bottom: 24px;
        line-height: 1.4;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer">
        <div className="footer-logo">
          <Link to="/">
            <FooterBigSvg />
          </Link>
        </div>
        <nav className="footer-nav">
          <div className="footer-column">
            <h5>
              <Link to="/">STACK OVERFLOW</Link>
            </h5>
            <ul>
              <li>
                <Link to="/">Questions</Link>
              </li>
              <li>
                <a href="https://stackoverflow.com/help">Help</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>PRODUCTS</h5>
            <ul>
              <li>
                <a href="https://stackoverflow.com/teams">Teams</a>
              </li>
              <li>
                <a href="https://stackoverflow.com/advertising">Advertising</a>
              </li>
              <li>
                <a href="https://stackoverflow.com/collectives">Collectives</a>
              </li>
              <li>
                <a href="https://stackoverflow.com/talent">Talent</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>
              <a href="https://stackoverflow.co/">COMPANY</a>
            </h5>
            <ul>
              <li>
                <a href="https://stackoverflow.co/">About</a>
              </li>
              <li>
                <a href="https://stackoverflow.co/company/press">Press</a>
              </li>
              <li>
                <a href="https://stackoverflow.co/company/work-here">Work Here</a>
              </li>
              <li>Legal</li>
              <li>
                <a href="https://stackoverflow.com/legal/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="https://stackoverflow.com/legal/terms-of-service">Terms of Service</a>
              </li>
              <li>
                <a href="https://stackoverflow.co/company/contact">Contact Us</a>
              </li>
              <li>Cookie Settings</li>
              <li>
                <a href="https://stackoverflow.com/legal/cookie-policy">Cookie Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>
              <a href="https://stackexchange.com/">STACK EXCHANGE NETWORK</a>
            </h5>
            <ul>
              <li>
                <a href="https://stackexchange.com/sites#technology">Technology</a>
              </li>
              <li>
                <a href="https://stackexchange.com/sites#culturerecreation">Culture & recreation</a>
              </li>
              <li>
                <a href="https://stackexchange.com/sites#lifearts">Life & arts</a>
              </li>
              <li>
                <a href="https://stackexchange.com/sites#science">Science</a>
              </li>
              <li>
                <a href="https://stackexchange.com/sites#professional">Professional</a>
              </li>
              <li>
                <a href="https://stackexchange.com/sites#business">Business</a>
              </li>
              <li></li>
              <li>
                <a href="https://api.stackexchange.com/">API</a>
              </li>
              <li>
                <a href="https://data.stackexchange.com/">Data</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="footer-copyright">
          <ul>
            <li>
              <a href="https://stackoverflow.blog/?blb=1/">Blog</a>
            </li>
            <li>
              <a href="https://www.facebook.com/officialstackoverflow/">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com/stackoverflow">Twitter</a>
            </li>
            <li>
              <a href="https://linkedin.com/company/stack-overflow">LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/thestackoverflow">Instagram</a>
            </li>
          </ul>
          <p>
            Site design / logo © 2022 Stack Exchange Inc; user contributions licensed under CC
            BY-SA. <br />
            rev 2023.2.23.43256
          </p>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
