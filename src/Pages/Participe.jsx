import React, { Component } from 'react';
import PageHero from '../Components/PageHero';
import { Container, Row, Col } from 'reactstrap';

class Participe extends Component {
  state = {};
  render() {
    const { data, lang } = this.props;
    const participe = data.pages.participe[lang];
    return (
      <div className="participepage">
        <PageHero
          logo={`/assets/logos/logo_vertical.svg`}
          descricao={participe.subtitulo}
          titulo={participe.titulo}
          header="participe"
        />
        <div className="page_content">
          <Container>
            <Row>
              <Col lg="12">{participe.content}</Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Participe;
