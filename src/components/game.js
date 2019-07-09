import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import uuid from 'uuid';
import Tile from './tile';

const Container = styled.div`
  display: block;
  margin-top: 25px;
  width: 600px;
  height: 600px;
  background: var(--game-background-color);
  border-radius: 5px;
  position: relative;
`;

const BlankContainer = styled.div`
  display: block;
  width: 600px;
  height: 600px;
  border-radius: 5px;
  position: absolute;
  top: 0;
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
    this.state = {
      board: this.initBoard(),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    this.placeNewTile();
    this.placeNewTile();
    this.forceUpdate();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  initBoard = () => {
    const { data } = this.props;
    const board = [];
    for (let i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
      board[i] = new Array(data.site.siteMetadata.boardSize);
      for (let j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
        board[i][j] = 0;
      }
    }
    return board;
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
        this.isUsed = isUsed; // Tile can't be merged twice in one move therefore
        // we need to mark tile that was already merged
      }
    }

    const temporaryBoard = [];
    let i;
    let j;
    let k;
    for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
      temporaryBoard[i] = new Array(data.site.siteMetadata.boardSize);
    }

    for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
      for (j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
        temporaryBoard[i][j] = new Element(board[i][j], false);
      }
    }

    const mergeTiles = (tileMergeIntoPosX, tileMergedIntoPosY,
      tileMergedFromPosX, tileMergedFromPosY) => {
      temporaryBoard[tileMergeIntoPosX][tileMergedIntoPosY].value *= 2;
      temporaryBoard[tileMergeIntoPosX][tileMergedIntoPosY].isUsed = true;
      temporaryBoard[tileMergedFromPosX][tileMergedFromPosY].value = 0;
    };

    const moveTile = (tileMovedFromPosX, tileMovedFromPosY,
      tileMovedIntoPosX, tileMovedIntoPosY) => {
      // eslint-disable-next-line max-len
      temporaryBoard[tileMovedIntoPosX][tileMovedIntoPosY].value = temporaryBoard[tileMovedFromPosX][tileMovedFromPosY].value;
      temporaryBoard[tileMovedFromPosX][tileMovedFromPosY].value = 0;
    };

    if (direction.key === 'ArrowRight') {
      for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
        for (j = (data.site.siteMetadata.boardSize - 2); j >= 0; j -= 1) {
          if (temporaryBoard[i][j].value !== 0) {
            for (k = j + 1; k < data.site.siteMetadata.boardSize; k += 1) {
              if (temporaryBoard[i][k - 1].value === temporaryBoard[i][k].value
                && temporaryBoard[i][k].isUsed === false) {
                mergeTiles(i, k, i, (k - 1));
                break;
              } else if (temporaryBoard[i][k].value === 0) {
                moveTile(i, (k - 1), i, k);
              }
            }
          }
        }
      }
    } else if (direction.key === 'ArrowLeft') {
      for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
        for (j = 1; j < data.site.siteMetadata.boardSize; j += 1) {
          if (temporaryBoard[i][j].value !== 0) {
            for (k = j - 1; k >= 0; k -= 1) {
              if (temporaryBoard[i][k + 1].value === temporaryBoard[i][k].value
                && temporaryBoard[i][k].isUsed === false) {
                mergeTiles(i, k, i, (k + 1));
                break;
              } else if (temporaryBoard[i][k].value === 0) {
                moveTile(i, (k + 1), i, k);
              }
            }
          }
        }
      }
    } else if (direction.key === 'ArrowUp') {
      for (j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
        for (i = 1; i < data.site.siteMetadata.boardSize; i += 1) {
          if (temporaryBoard[i][j].value !== 0) {
            for (k = i - 1; k >= 0; k -= 1) {
              if (temporaryBoard[k + 1][j].value === temporaryBoard[k][j].value
                && temporaryBoard[k][j].isUsed === false) {
                mergeTiles(k, j, (k + 1), j);
                break;
              } else if (temporaryBoard[k][j].value === 0) {
                moveTile((k + 1), j, k, j);
              }
            }
          }
        }
      }
    } else if (direction.key === 'ArrowDown') {
      for (j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
        for (i = data.site.siteMetadata.boardSize - 2; i >= 0; i -= 1) {
          if (temporaryBoard[i][j].value !== 0) {
            for (k = i + 1; k < data.site.siteMetadata.boardSize; k += 1) {
              if (temporaryBoard[k - 1][j].value === temporaryBoard[k][j].value
                && temporaryBoard[k][j].isUsed === false) {
                mergeTiles(k, j, (k - 1), j);
                break;
              } else if (temporaryBoard[k][j].value === 0) {
                moveTile((k - 1), j, k, j);
              }
            }
          }
        }
      }
    }
    for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
      for (j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
        board[i][j] = temporaryBoard[i][j].value;
      }
    }
    this.placeNewTile();
    this.forceUpdate();
  }

  checkIfBoardIsFull = () => {
    const { data } = this.props;
    let i;
    let j;
    let countFreePlaces = 0;
    const { board } = this.state;
    for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
      for (j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
        if (board[i][j] === 0) {
          countFreePlaces += 1;
        }
      }
    }
    return countFreePlaces !== 0;
  }

  placeNewTile = () => {
    const { data } = this.props;
    let posX;
    let posY;
    const { board } = this.state;
    // WIP
    if (!this.checkIfBoardIsFull) {} // game over
    else {
      do {
        posX = Math.floor(Math.random() * (data.site.siteMetadata.boardSize));
        posY = Math.floor(Math.random() * (data.site.siteMetadata.boardSize));
      } while (board[posX][posY] !== 0);
      const whichTile = Math.floor(Math.random() * 9);
      if (whichTile === 0) {
        board[posX][posY] = 4;
      } else {
        board[posX][posY] = 2;
      }
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

  getTile = (width, row) => {
    const { board } = this.state;
    const rows = [];
    for (let i = 0; i < width; i += 1) {
      rows[i] = <Tile key={i} value={board[row][i]} />;
    }

    return (
      <Row key={uuid.v4()}>
        {rows}
      </Row>
    );
  }

  getBoardTiles = (width, height) => {
    const board = [];
    for (let i = 0; i < height; i += 1) {
      board[i] = this.getTile(width, i);
    }
    return board;
  }

  render() {
    const { data } = this.props;
    return (
      <Container>
        {this.getBoard(data.site.siteMetadata.boardSize, data.site.siteMetadata.boardSize)}
        <BlankContainer>
          {this.getBoardTiles(data.site.siteMetadata.boardSize, data.site.siteMetadata.boardSize)}
        </BlankContainer>
      </Container>
    );
  }
}

Game.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default Game;
