import React, { Component } from 'react';
import PageHero from '../Components/PageHero';
import { Container, Row, Col } from 'reactstrap';
import Papa from 'papaparse';
import _ from 'lodash';
import quemSomosLista from '../data/quemsomos';

class Movimento extends Component {
  state = { quemSomos: [] };
  componentDidMount() {
    var quemSomosNomes = quemSomosLista.map((nome) => {
      var nameString = nome.replace(/\s+/g, ' ');
      nameString = nameString.charAt(0).toUpperCase() + nameString.slice(1);
      return nameString;
    });
    console.log(quemSomosNomes);
    const formularioUrl =
      'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vR_L0sPFQ4BBuos5uLcNoGbAx3T5keHm4qh-EtFP3jIEqGz3qVMnf_SxBRvU2iJ5wgA_7lYmsVccL1A/pub?output=csv';

    Papa.parse(formularioUrl, {
      download: true,
      header: true,
      complete: (results) => {
        var res = results.data;
        const nomeKey = '1. Com que nome você gosta de ser chamadx?';
        const authKey =
          'Você autoriza, de forma gratuita, o uso da sua imagem, nome e voz, constante no vídeo ora compartilhado, para composição de material de divulgação do movimento sobre as "5 propostas para adiar o fim do mundo", sem que nada haja a ser reclamado a título de direitos conexos à minha imagem ou a qualquer outro?';
        var quemSomos = _.filter(res, [authKey, 'Eu autorizo/I authorize']);
        quemSomos = quemSomos.map((person) => {
          var nameString = person[nomeKey].replace(/\s+/g, ' ');
          nameString = nameString.charAt(0).toUpperCase() + nameString.slice(1);
          return nameString;
        });
        quemSomos = _.union(quemSomos, quemSomosNomes);
        quemSomos = quemSomos.sort(function (a, b) {
          return a.localeCompare(b);
        });
        this.setState({ quemSomos });
      },
    });
  }
  render() {
    const { data, lang } = this.props;
    const movimento = data.pages.movimento[lang];
    return (
      <div className="movimentopage">
        <PageHero
          logo={require(`../assets/logos/logo_vertical.svg`)}
          descricao={movimento.subtitulo}
          titulo={movimento.titulo}
          header="movimento"
        />
        <div className="page_content">
          <Container>
            <Row>
              <Col lg="12">{movimento.content}</Col>
              <Col>
                <div className="movimentopage_nomes">
                  {this.state.quemSomos.map((nome) => {
                    return <p>{nome}</p>;
                  })}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Movimento;
