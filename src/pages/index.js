import React, { Component } from 'react';
import { styled } from 'linaria/react';
import { Link, graphql } from 'gatsby';

import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Game from '../components/game';

const Main = styled.div`
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    flex-direction: row;
    justify-content: space-around;
    @media all and (max-width: 999px) {
      .aside-1 {order: 1;}
      .aside-2 {order: 2;}
      .mid {order: 3;}
    }
`;

const Score = styled.div`
    display: inline-block;
    background: var(--menu-elements-color);
    font-size: 2rem;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    padding: 10px 15px;
    margin-top: 10px;
    color: var(--text-color);
`;

const Wrap = styled.div`
  width: 200px;
  height: 100px;
  margin: 0 auto;text-align: center;
  
`;

const Title = styled.header`
  font-style: normal;
  font-size: 5rem;
  font-weight: bold;
  margin: 0;
  display: block;
`;

const Up = styled.div`
  font-size: 0.8rem;
`;

const GameContainer = styled.div`
  margin: 0;
`;

class IndexPage extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <Main class="main">
          <Wrap class="aside-1">
            <Title>
              {data.site.siteMetadata.title}
            </Title>
          </Wrap>
          <GameContainer class="mid ">
            <Game
              data={data}
            />
          </GameContainer>
          <Wrap class="aside-2">
            <Score>
              <Up>SCORE:</Up>
              87446
            </Score>
          </Wrap>
        </Main>
      </Layout>
    );
  }
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title,
                boardSize
            }
        }
    }
`;

IndexPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default IndexPage;
