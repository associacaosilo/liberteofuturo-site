import React, { Component } from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash';
import InstagramEmbed from 'react-instagram-embed';

class VideoLightbox extends Component {
  state = {};
  render() {
    const {
      _openLightbox,
      _changeVideo,
      categories,
      currentCategory,
      currentVideo,
      lang,
    } = this.props;
    return (
      <div className="video_lightbox">
        <Button
          className="video_lightbox-button video_lightbox-button-close"
          onClick={_openLightbox}
        >
          <i className="fa fa-times"></i>
        </Button>
        <Button
          className="video_lightbox-button video_lightbox-button-previous"
          onClick={() => _changeVideo('down')}
        >
          <i className="fa fa-angle-left"></i>
        </Button>
        <Button
          className="video_lightbox-button video_lightbox-button-next"
          onClick={() => _changeVideo('up')}
        >
          <i className="fa fa-angle-right"></i>
        </Button>
        <p className="video_lightbox-counter">
          <strong>{categories[currentCategory][lang].titulo}</strong>:{' '}
          {_.findIndex(categories[currentCategory].videos, {
            identificador: currentVideo,
          }) + 1}
          /{categories[currentCategory].videos.length}
        </p>
        <div className="video_lightbox-container">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          {/* <InstagramEmbed
            url="https://www.instagr.am/p/CCedZ2QnD3F/"
            hideCaption={true}
            maxWidth={320}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          /> */}
        </div>
        <div className="video_lightbox-shadow" onClick={_openLightbox}></div>
      </div>
    );
  }
}

export default VideoLightbox;
