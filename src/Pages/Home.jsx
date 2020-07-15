import React, { Component } from 'react';
import Hero from '../Components/Hero';
import HomeVideos from '../Components/HomeVideos';

class Home extends Component {
  state = {
    navClass: 'transparent',
  };

  render() {
    return (
      <React.Fragment>
        <Hero data={this.props.data} lang={this.props.lang} />
        <HomeVideos data={this.props.data} lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default Home;
