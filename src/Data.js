import React, { Component } from 'react';
import Papa from 'papaparse';

class Data extends Component {
  state = {};
  componentDidMount() {
    Papa.parse(
      'https://raw.githubusercontent.com/associacaosilo/liberteofuturo-site/gh-pages/_data/antidoto.csv',
      {
        download: true,
        header: true,
        complete: function (results) {
          var data = results.data;
          console.log(data);
        },
      }
    );
  }
  render() {
    return <h1>Hello</h1>;
  }
}

export default Data;
