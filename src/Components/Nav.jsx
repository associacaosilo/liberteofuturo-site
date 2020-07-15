import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import logo from '../assets/logos/logo_vertical.svg';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import CategoryMenu from './CategoryMenu';

export default class Navmenu extends Component {
  state = {
    isOpen: false,
    navClass: 'transparent',
    openCategoryMenu: false,
  };
  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener('scroll', function (e) {
      scrollComponent.toggleVisibility();
    });
  }
  toggleVisibility() {
    if (window.pageYOffset < 100) {
      this.setState({
        navClass: 'transparent',
      });
    } else {
      this.setState({
        navClass: '',
      });
    }
  }
  toggle = () => {
    if (this.state.isOpen) {
      document.body.style.marginLeft = '0px';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.marginLeft = '320px';
      document.body.style.overflowY = 'hidden';
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  toggleCategoryMenu = () => {
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
        <Button
          className={`menutoggler ${this.state.navClass}`}
          onClick={this.toggle}
        >
          <i className="fa fa-bars"></i>
        </Button>
        <div className={`navigation ${this.state.navClass}`}>
          <div className="topbar">
            <Container fluid>
              <Row>
                <Col className="text-left">{languageSelector}</Col>
                <Col className="text-right socialmedia">
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
              </Row>
            </Container>
          </div>
          <div className="menu">
            <Container fluid>
              <Row>
                <Col className="d-none d-xl-block" xs="12" lg="4" xl="5">
                  <Link className="menulink" to={`/movimento`}>
                    {pages.movimento[lang].menuTitle}
                  </Link>
                  <Link className="menulink" to={`/laboratorio`}>
                    {pages.laboratorio[lang].menuTitle}
                  </Link>
                </Col>

                {/* <Col className="d-block d-xl-none" xs="2">
                  <Button className="menutoggler">
                    <i className="fa fa-bars"></i>
                  </Button>
                </Col> */}
                <Col
                  xs={{ size: 12 }}
                  xl={{ size: 2, offset: 0 }}
                  className="brand"
                >
                  <Link to={`/`}>
                    <img src={logo} alt="" />
                  </Link>
                </Col>
                <Col
                  className="d-none d-xl-block text-right"
                  xs="12"
                  lg="4"
                  xl="5"
                >
                  <span
                    className="menulink"
                    to="#"
                    onClick={this.toggleCategoryMenu}
                  >
                    {pages.categories[lang].menuTitle}
                  </span>

                  <Link className="menulink" to={`/participe`}>
                    <Button size="sm">{pages.participe[lang].menuTitle}</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        {this.state.isOpen ? (
          <div className="offcanvasmenu">
            <div className="offcanvasmenu_shadow" onClick={this.toggle}></div>
            <div className="offcanvasmenu_inner">
              <img src={logo} alt="" />
              <ul>
                <li>
                  <span className="offcanvasmenu_header">
                    {pages.categories[lang].menuTitle}
                  </span>
                  <ul>
                    {categories.map((category) => {
                      return (
                        <li key={category.slug}>
                          <Link
                            onClick={this.toggle}
                            to={`/category/${category.slug}`}
                            className="offcanvasmenu_category"
                          >
                            {category[lang].titulo}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <Link
                    onClick={this.toggle}
                    to={`/movimento`}
                    className="offcanvasmenu_header"
                  >
                    {pages.movimento[lang].menuTitle}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={this.toggle}
                    to={`/laboratorio`}
                    className="offcanvasmenu_header"
                  >
                    {pages.laboratorio[lang].menuTitle}
                  </Link>
                </li>
                <li>
                  <Link onClick={this.toggle} to={`/participe`}>
                    <Button size="sm">{pages.participe[lang].menuTitle}</Button>
                  </Link>
                </li>
                <li>{languageSelector}</li>
              </ul>
            </div>
          </div>
        ) : (
          ''
        )}
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
