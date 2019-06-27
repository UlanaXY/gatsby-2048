import React, { Component } from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';
import { Link, graphql } from 'gatsby';

import '../components/style.css';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import Game from '../components/game';
import Header from '../components/header';

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;

// const header = css`
//   display: flex;
//   align-items: row;
//   flex-direction: column;
//   justify-content: flexstart;
// `;

const GameContainer = styled.div`
  margin: auto;
`;

class IndexPage extends Component {
  render() {
    const { data } = this.props;
    return (
      <Main>
        <Header siteTitle={data.site.siteMetadata.title} />
        <GameContainer>
          <Game
            data={data}
          />
        </GameContainer>
      </Main>
    );
  }
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

IndexPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default IndexPage;
