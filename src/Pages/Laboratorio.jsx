import React, { Component } from 'react';
import PageHero from '../Components/PageHero';
import { Container, Row, Col } from 'reactstrap';

class Laboratorio extends Component {
  state = {};
  render() {
    const { data, lang } = this.props;
    const laboratorio = data.pages.laboratorio[lang];
    return (
      <div className="laboratoriopage">
        <PageHero
          logo={require(`../assets/logos/logo_vertical.svg`)}
          descricao={laboratorio.subtitulo}
          titulo={laboratorio.titulo}
          header="laboratorio"
        />
        <div className="page_content">
          <Container>
            <Row>
              <Col lg="12">{laboratorio.content}</Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Laboratorio;
