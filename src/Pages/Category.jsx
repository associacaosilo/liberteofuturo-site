import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import _ from 'lodash';
import VideoLightbox from '../Components/VideoLightbox';
import PageHero from '../Components/PageHero';

class Category extends Component {
  state = {
    slug: '',
    currentVideo: '',
    currentCategory: '',
    openLightbox: false,
  };
  componentDidMount() {
    const categories = _.values(this.props.data.categories);
    const slug = this.props.match.params.slug;
    this.setState({ slug, categories });
  }
  _openLightbox = (id, category) => {
    const currentCategory = _.findIndex(this.state.categories, {
      slug: this.state.slug,
    });
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
    const { data, lang } = this.props;
    const slug = this.props.match.params.slug;
    return (
      <div className="categorypage">
        <PageHero
          logo={require(`../assets/logos/${slug}.svg`)}
          descricao={data.categories[slug][lang].descricao}
          titulo={data.categories[slug][lang].titulo}
          header={slug}
        />

        <div className="categorypage_videos">
          <Container>
            <Row>
              {data.categories[slug].videos.map((video, index) => {
                var colProps = {
                  xs: 12,
                  sm: 6,
                  xl: 3,
                };
                if (index < 2) {
                  colProps = {
                    xs: 12,
                    sm: 12,
                    md: 6,
                  };
                }
                return (
                  <Col {...colProps}>
                    <div className="categorypage_videos-box">
                      <img
                        src={`https://i.ytimg.com/vi/${video.identificador}/mqdefault.jpg`}
                        alt=""
                        onClick={() =>
                          this._openLightbox(video.identificador, index)
                        }
                      />{' '}
                      {video.autor}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
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
      </div>
    );
  }
}

export default withRouter(Category);
