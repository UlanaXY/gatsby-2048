import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import Layout from './layout';
import Tile from './tile';

const Container = styled.div`
  display: block;
  margin-top: 25px;
  width: 600px;
  height: 600px;
  background: #bbada0;
  border-radius: 5px;
`;


class Game extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    const board = [];
    for (let i = 0; i < data.site.siteMetadata.size; i += 1) {
      board[i] = new Array(data.site.siteMetadata.size);
    }
  }

  render() {
    return (
      <Container>
        <Tile value={2} />
      </Container>
    );
  }
}

Game.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default Game;
