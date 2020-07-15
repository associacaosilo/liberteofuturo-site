import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Slider from 'react-slick';
import _ from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import VideoLightbox from './VideoLightbox';
import catImages from '../data/categoryimages';

class HomeVideos extends Component {
  state = {
    categories: [],
    currentVideo: '',
    currentCategory: '',
    openLightbox: false,
  };
  componentDidMount() {
    const categories = _.values(this.props.data.categories);
    this.setState({ categories });
  }
  _openLightbox = (id, category) => {
    const currentCategory = category;
    const currentVideo = id;
    const openLightbox = !this.state.openLightbox;
    if (openLightbox) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    this.setState({ openLightbox, currentVideo, currentCategory });
  };
  _changeVideo = (direction) => {
    const videos = this.state.categories[this.state.currentCategory].videos;
    const indexOfVideo = _.findIndex(videos, {
      identificador: this.state.currentVideo,
    });
    const lengtOfVideos = videos.length;
    var currentVideo = '';
    if (direction == 'up') {
      if (videos.length == indexOfVideo + 1) {
        currentVideo = videos[0].identificador;
      } else {
        currentVideo = videos[indexOfVideo + 1].identificador;
      }
    } else {
      if (indexOfVideo == 0) {
        currentVideo = videos[videos.length - 1].identificador;
      } else {
        currentVideo = videos[indexOfVideo - 1].identificador;
      }
    }
    this.setState({ currentVideo });
  };
  render() {
    const { lang } = this.props;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };
    return (
      <div className="homevideos">
        <Container>
          {this.state.categories.map((category, index) => {
            return (
              <Row key={`category${index}`}>
                <Col>
                  <section>
                    <Link to={`/category/${category.slug}`}>
                      <h2>
                        <img src={catImages[category.slug].url} alt="" />
                        <span>0{index + 1}</span> {category[lang].titulo}
                        <small>VER</small>
                      </h2>
                    </Link>
                    <p>{category[lang].descricao}</p>

                    <Slider {...settings}>
                      {category.videos.map((video) => {
                        return (
                          <div
                            className="homevideos_videothumb"
                            key={`${category.slug}${video.identificador}`}
                            onClick={() =>
                              this._openLightbox(video.identificador, index)
                            }
                          >
                            <img
                              src={`https://img.youtube.com/vi/${video.identificador}/mqdefault.jpg`}
                              alt=""
                            />{' '}
                            {video.autor}
                          </div>
                        );
                      })}
                    </Slider>
                  </section>
                </Col>
              </Row>
            );
          })}

          {this.state.openLightbox ? (
            <VideoLightbox
              _openLightbox={this._openLightbox}
              _changeVideo={this._changeVideo}
              categories={this.state.categories}
              currentCategory={this.state.currentCategory}
              currentVideo={this.state.currentVideo}
              lang={lang}
            />
          ) : (
            ''
          )}
        </Container>
      </div>
    );
  }
}

export default HomeVideos;
