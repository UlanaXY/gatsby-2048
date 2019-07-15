import React, { Component } from 'react';
import { styled } from 'linaria/react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import '../components/i18n';
import { Translation } from 'react-i18next';
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
    color: var(--text-color-secondary);
`;

const Wrap = styled.div`
  width: 200px;
  height: 100px;
  margin: 0 auto;
  text-align: center;
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
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
    };
  }

  points = (pointsToAdd) => {
    this.setState((prevState) => ({ points: prevState.points + pointsToAdd }));
  }

  render() {
    const { data } = this.props;
    const { points } = this.state;
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
              setPoints={this.points}
              points={points}
            />
          </GameContainer>
          <Wrap class="aside-2">
            <Score>
              <Translation>
                {
                  t => (
                    <Up>
                      { t('SCORE')}
                      :
                    </Up>
                  )
                }
              </Translation>
              {points}
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
                boardSize,
            }
        }
    }
`;

IndexPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default IndexPage;
