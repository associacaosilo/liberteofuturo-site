import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Papa from 'papaparse';
import _ from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import data from './data/data';
import Navmenu from './Components/Nav';
import Home from './Pages/Home';
import Movimento from './Pages/Movimento';
import Category from './Pages/Category';
import ScrollToTop from './Components/ScrollToTop';
import Laboratorio from './Pages/Laboratorio';
import Participe from './Pages/Participe';
import Footer from './Components/Footer';

data.categories.antidotos.videos = [];
data.categories.clima.videos = [];
data.categories.consumo.videos = [];
data.categories.democracia.videos = [];
data.categories.insurreicao.videos = [];

class App extends Component {
  state = {
    data: data,
    lang: 'pt',
    videosToFetch: [
      {
        category: 'antidotos',
        url:
          'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vRs1WKi9EBE0T_Wlhh9QETMz-6lxqf27-ysUTZNmQOR_pVF3Wa27rPAPxUnTjz2Pn3Ds1BJokbjDqX9/pub?gid=0&single=true&output=csv',
      },
      {
        category: 'clima',
        url:
          'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vRs1WKi9EBE0T_Wlhh9QETMz-6lxqf27-ysUTZNmQOR_pVF3Wa27rPAPxUnTjz2Pn3Ds1BJokbjDqX9/pub?gid=2026617917&single=true&output=csv',
      },
      {
        category: 'consumo',
        url:
          'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vRs1WKi9EBE0T_Wlhh9QETMz-6lxqf27-ysUTZNmQOR_pVF3Wa27rPAPxUnTjz2Pn3Ds1BJokbjDqX9/pub?gid=1098268932&single=true&output=csv',
      },
      {
        category: 'democracia',
        url:
          'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vRs1WKi9EBE0T_Wlhh9QETMz-6lxqf27-ysUTZNmQOR_pVF3Wa27rPAPxUnTjz2Pn3Ds1BJokbjDqX9/pub?gid=666431457&single=true&output=csv',
      },
      {
        category: 'insurreicao',
        url:
          'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vRs1WKi9EBE0T_Wlhh9QETMz-6lxqf27-ysUTZNmQOR_pVF3Wa27rPAPxUnTjz2Pn3Ds1BJokbjDqX9/pub?gid=1877781102&single=true&output=csv',
      },
    ],
  };
  componentDidMount() {
    this.state.videosToFetch.map((item) => {
      Papa.parse(item.url, {
        download: true,
        header: true,
        complete: (results) => {
          var res = results.data;
          res = _.filter(res, { publicar_no_site: 'SIM' });
          res = _.orderBy(res, ['destaque', 'ordem'], ['desc', 'desc']);
          res = res.map((video) => {
            video.identificador = video.identificador.trim();
            return video;
          });
          data.categories[item.category].videos = res;
          this.setState({ data });
        },
      });
    });

    const antidotoUrl =
      'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vRs1WKi9EBE0T_Wlhh9QETMz-6lxqf27-ysUTZNmQOR_pVF3Wa27rPAPxUnTjz2Pn3Ds1BJokbjDqX9/pub?gid=0&single=true&output=csv';
  }
  _handleLang = (selectedLang) => {
    const lang = selectedLang;
    this.setState({ lang });
  };
  render() {
    const settings = {
      data: this.state.data,
      lang: this.state.lang,
    };
    return (
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navmenu
            {...settings}
            navClass=""
            onChangeLang={(selectedLang) => this._handleLang(selectedLang)}
          />
          <Switch>
            <Route path={`/category/:slug`}>
              <Category {...settings} />
            </Route>
            <Route path={`/movimento`}>
              <Movimento {...settings} />
            </Route>
            <Route path={`/laboratorio`}>
              <Laboratorio {...settings} />
            </Route>
            <Route path={`/participe`}>
              <Participe {...settings} />
            </Route>
            <Route path={`/`}>
              <Home {...settings} />
            </Route>
          </Switch>
          <Footer
            {...settings}
            onChangeLang={(selectedLang) => this._handleLang(selectedLang)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
