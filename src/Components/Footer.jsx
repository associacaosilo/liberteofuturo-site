import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import logo from '../assets/logos/logo_vertical.svg';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import CategoryMenu from './CategoryMenu';

class Footer extends Component {
  state = {
    openCategoryMenu: false,
  };
  toggleCategoryMenu = () => {
    console.log('aaaaa');
    const openCategoryMenu = !this.state.openCategoryMenu;
    this.setState({ openCategoryMenu });
  };
  render() {
    const { data, lang } = this.props;
    const { pages } = data;
    const categories = _.values(data.categories);
    const languageSelector = (
      <div className="languageselector">
        <a onClick={() => this.props.onChangeLang('en')}>EN</a> |{' '}
        <a onClick={() => this.props.onChangeLang('pt')}>PT</a> |{' '}
        <a onClick={() => this.props.onChangeLang('es')}>ES</a>
      </div>
    );
    return (
      <React.Fragment>
        <div className="footer">
          <Container>
            <Row>
              <Col className="align-self-center" lg="2" xl="3">
                <img src={logo} alt="" />
              </Col>
              <Col className="align-self-center" lg="10" xl="9">
                <ul>
                  <li>
                    <Link className="menulink" to={`/movimento`}>
                      {pages.movimento[lang].menuTitle}
                    </Link>
                  </li>
                  <li>
                    <Link className="menulink" to={`/laboratorio`}>
                      {pages.laboratorio[lang].menuTitle}
                    </Link>
                  </li>
                  <li>
                    <span
                      className="menulink"
                      to="#"
                      onClick={this.toggleCategoryMenu}
                    >
                      {pages.categories[lang].menuTitle}
                    </span>
                  </li>
                  <li>
                    <Link className="menulink" to={`/participe`}>
                      <Button size="sm">
                        {pages.participe[lang].menuTitle}
                      </Button>
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
            <hr />
            <Row className="justify-content-between">
              <Col className="socialmedia" xs="auto">
                <a
                  href="https://www.facebook.com/liberteofuturo/"
                  target="_blank"
                >
                  <i className="fa fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/liberteofuturo/"
                  target="_blank"
                >
                  <i className="fa fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCHDA4Nfvu9emyq1juLiUoEw"
                  target="_blank"
                >
                  <i className="fa fa-youtube-square"></i>
                </a>
              </Col>
              <Col xs="auto">
                Fale com a gente pelo email{' '}
                <strong>contato@liberteofuturo.net</strong>
              </Col>
              <Col xs="auto">
                2020 <i className="fa fa-creative-commons"></i>
              </Col>
            </Row>
          </Container>
        </div>
        {this.state.openCategoryMenu ? (
          <CategoryMenu
            categories={categories}
            toggleCategoryMenu={this.toggleCategoryMenu}
            lang={lang}
          />
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}

export default Footer;
