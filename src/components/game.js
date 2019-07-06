import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import uuid from "uuid";

const Container = styled.div`
  display: block;
  margin-top: 25px;
  width: 600px;
  height: 600px;
  background: var(--game-background-color);
  border-radius: 5px;
`;

const Blank = styled.div`
  width: 127.5px;
  height: 127.5px;
  margin-left: 18px;
  float: left;
  border-radius: 4px;
  background: rgba(238, 228, 218, 0.35);
`;

const Row = styled.div`
  padding-top: 18px;
  width: 100%;
  height: 127.5px;
  display: block;
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


  getRow = (width) => {
    const rows = [];

    for (let i = 0; i < width; i += 1) {
      rows[i] = <Blank key={i} />;
    }

    return (
      <Row key={uuid.v4()}>
        {rows}
      </Row>
    );
  }

  getBoard = (width, height) => {
    const board = [];
    for (let i = 0; i < height; i += 1) {
      board[i] = this.getRow(width);
    }
    return board;
  }


  render() {
    return (
      <Container>
        {this.getBoard(4, 4)}
      </Container>
    );
  }
}

Game.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default Game;
