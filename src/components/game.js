import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import uuid from 'uuid';

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
      for (let j = 0; j < data.site.siteMetadata.size; j += 1) {
        board[i][j] = 0;
      }
    }
    this.state = {
      board,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    this.newTile();
    this.newTile();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp'
      || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.move(event);
    }
  }

  move = (direction) => {
    const { data } = this.props;
    const { board } = this.state;

    class Element {
      constructor(value, isUsed) {
        this.value = value;
        this.isUsed = isUsed;
      }
    }

    const ground = [];
    let i;
    let j;
    let k;
    for (i = 0; i < data.site.siteMetadata.size; i += 1) {
      ground[i] = new Array(data.site.siteMetadata.size);
    }

    for (i = 0; i < data.site.siteMetadata.size; i += 1) {
      console.log(i + ":  ", board[i][0], board[i][1], board[i][2], board[i][3]);
      for (j = 0; j < data.site.siteMetadata.size; j += 1) {
        ground[i][j] = new Element(board[i][j], false);
      }
    }

    if (direction.key === 'ArrowRight') {
      for (i = 0; i < data.site.siteMetadata.size; i += 1) {
        for (j = (data.site.siteMetadata.size - 2); j >= 0; j -= 1) {
          if (ground[i][j].value !== 0) {
            for (k = j + 1; k < data.site.siteMetadata.size; k += 1) {
              if (ground[i][k - 1].value === ground[i][k].value && ground[i][k].isUsed === false) {
                ground[i][k].value *= 2;
                ground[i][k].isUsed = true;
                ground[i][k - 1].value = 0;
                break;
              } else if (ground[i][k].value === 0) {
                ground[i][k].value = ground[i][k - 1].value;
                ground[i][k - 1].value = 0;
              }
            }
          }
        }
      }
    } else if (direction.key === 'ArrowLeft') {
      for (i = 0; i < data.site.siteMetadata.size; i += 1) {
        for (j = 1; j < data.site.siteMetadata.size; j += 1) {
          if (ground[i][j].value !== 0) {
            for (k = j - 1; k >= 0; k -= 1) {
              if (ground[i][k + 1].value === ground[i][k].value && ground[i][k].isUsed === false) {
                ground[i][k].value *= 2;
                ground[i][k].isUsed = true;
                ground[i][k + 1].value = 0;
                break;
              } else if (ground[i][k].value === 0) {
                ground[i][k].value = ground[i][k + 1].value;
                ground[i][k + 1].value = 0;
              }
            }
          }
        }
      }
    } else if (direction.key === 'ArrowUp') {
      for (j = 0; j < data.site.siteMetadata.size; j += 1) {
        for (i = 1; i < data.site.siteMetadata.size; i += 1) {
          if (ground[i][j].value !== 0) {
            for (k = i - 1; k >= 0; k -= 1) {
              if (ground[k + 1][j].value === ground[k][j].value && ground[k][j].isUsed === false) {
                ground[k][j].value *= 2;
                ground[k][j].isUsed = true;
                ground[k + 1][j].value = 0;
                break;
              } else if (ground[k][j].value === 0) {
                ground[k][j].value = ground[k + 1][j].value;
                ground[k + 1][j].value = 0;
              }
            }
          }
        }
      }
    } else if (direction.key === 'ArrowDown') {
      for (j = 0; j < data.site.siteMetadata.size; j += 1) {
        for (i = data.site.siteMetadata.size - 2; i > 0; i -= 1) {
          if (ground[i][j].value !== 0) {
            for (k = i + 1; k < data.site.siteMetadata.size; k += 1) {
              if (ground[k - 1][j].value === ground[k][j].value && ground[k][j].isUsed === false) {
                ground[k][j].value *= 2;
                ground[k][j].isUsed = true;
                ground[k - 1][j].value = 0;
                break;
              } else if (ground[k][j].value === 0) {
                ground[k][j].value = ground[k - 1][j].value;
                ground[k - 1][j].value = 0;
              }
            }
          }
        }
      }
    }
    console.log(" ");
    for (i = 0; i < data.site.siteMetadata.size; i += 1) {
      console.log(i + ":  ", ground[i][0].value, ground[i][1].value, ground[i][2].value, ground[i][3].value);
      for (j = 0; j < data.site.siteMetadata.size; j += 1) {
        board[i][j] = 0;
        board[i][j] = ground[i][j].value;
      }
    }
    console.log(" ");
  }

  newTile = () => {
    const { data } = this.props;
    let posX;
    let posY;
    const { board } = this.state;
    do {
      posX = Math.floor(Math.random() * (data.site.siteMetadata.size - 1));
      posY = Math.floor(Math.random() * (data.site.siteMetadata.size - 1));
    } while (board[posX][posY] !== 0);
    const whichTile = Math.floor(Math.random() * 9);
    if (whichTile === 0) {
      board[posX][posY] = 4;
    } else {
      board[posX][posY] = 2;
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
    const { data } = this.props;
    return (
      <Container>
        {this.getBoard(data.site.siteMetadata.size, data.site.siteMetadata.size)}
      </Container>
    );
  }
}

Game.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default Game;
