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

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// this class is used to store information about what happened to a tile in this move
// It helps properly display animations of movement of tiles
class MovementInfo {
  constructor(fromCoords, toCoords, fromTileValue, toTileValue) {
    this.fromCoords = fromCoords;
    this.toCoords = toCoords;
    this.fromTileValue = fromTileValue;
    this.toTileValue = toTileValue;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      // this list stores information about every tile
      // its initial and final coords and value
      // eslint-disable-next-line react/no-unused-state
      movedList: [],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    // At the beginning of the game 2 tiles are needed.
    // For them to load properly we use another newTile function in callback
    this.placeNewTile(this.placeNewTile);
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
      // eslint-disable-next-line react/no-unused-state
      this.setState({ movedList: [] }, () => this.move(event));
    }
  }

  move = (direction) => {
    const { data } = this.props;
    const { setPoints } = this.props;
    const { board } = this.state;

    class Element {
      constructor(value, isUsed) {
        this.value = value;
        // Tile can't be merged twice in one move therefore
        // we need to mark tile that was already merged
        this.isUsed = isUsed;
      }
    }

    const temporaryBoard = [];
    let i;
    let j;
    let k;
    let impossibleMove = true;
    let pointsToAdd = 0;
    for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
      temporaryBoard[i] = new Array(data.site.siteMetadata.boardSize);
    }

    for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
      for (j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
        temporaryBoard[i][j] = new Element(board[i][j], false);
      }
    }

    const newMovedList = [];

    const mergeTiles = (tileMergeIntoPosX, tileMergedIntoPosY,
      tileMergedFromPosX, tileMergedFromPosY) => {
      temporaryBoard[tileMergeIntoPosX][tileMergedIntoPosY].value *= 2;
      temporaryBoard[tileMergeIntoPosX][tileMergedIntoPosY].isUsed = true;
      temporaryBoard[tileMergedFromPosX][tileMergedFromPosY].value = 0;
      newMovedList[newMovedList.length - 1]
        .toCoords = new Coordinates(tileMergeIntoPosX, tileMergedIntoPosY);
      newMovedList[newMovedList.length - 1]
        .toTileValue = temporaryBoard[tileMergeIntoPosX][tileMergedIntoPosY].value;
      impossibleMove = false;
      pointsToAdd += temporaryBoard[tileMergeIntoPosX][tileMergedIntoPosY].value;
    };

    const moveTile = (tileMovedFromPosX, tileMovedFromPosY,
      tileMovedIntoPosX, tileMovedIntoPosY) => {
      temporaryBoard[tileMovedIntoPosX][tileMovedIntoPosY]
        .value = temporaryBoard[tileMovedFromPosX][tileMovedFromPosY].value;
      temporaryBoard[tileMovedFromPosX][tileMovedFromPosY].value = 0;
      newMovedList[newMovedList.length - 1]
        .toCoords = new Coordinates(tileMovedIntoPosX, tileMovedIntoPosY);
      impossibleMove = false;
    };

    if (direction.key === 'ArrowRight') {
      for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
        for (j = (data.site.siteMetadata.boardSize - 1); j >= 0; j -= 1) {
          if (temporaryBoard[i][j].value !== 0) {
            newMovedList.push(new MovementInfo(
              new Coordinates(i, j),
              new Coordinates(i, j),
              temporaryBoard[i][j].value,
              temporaryBoard[i][j].value
            ));
            for (k = j + 1; k < data.site.siteMetadata.boardSize; k += 1) {
              if (temporaryBoard[i][k - 1].value === temporaryBoard[i][k].value
                && temporaryBoard[i][k].isUsed === false
                && temporaryBoard[i][k - 1].isUsed === false) {
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
        for (j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
          if (temporaryBoard[i][j].value !== 0) {
            newMovedList.push(new MovementInfo(
              new Coordinates(i, j),
              new Coordinates(i, j),
              temporaryBoard[i][j].value,
              temporaryBoard[i][j].value
            ));
            for (k = j - 1; k >= 0; k -= 1) {
              if (temporaryBoard[i][k + 1].value === temporaryBoard[i][k].value
                && temporaryBoard[i][k].isUsed === false
                && temporaryBoard[i][k + 1].isUsed === false) {
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
        for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
          if (temporaryBoard[i][j].value !== 0) {
            newMovedList.push(new MovementInfo(
              new Coordinates(i, j),
              new Coordinates(i, j),
              temporaryBoard[i][j].value,
              temporaryBoard[i][j].value
            ));
            for (k = i - 1; k >= 0; k -= 1) {
              if (temporaryBoard[k + 1][j].value === temporaryBoard[k][j].value
                && temporaryBoard[k][j].isUsed === false
                && temporaryBoard[k + 1][j].isUsed === false) {
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
        for (i = data.site.siteMetadata.boardSize - 1; i >= 0; i -= 1) {
          if (temporaryBoard[i][j].value !== 0) {
            newMovedList.push(new MovementInfo(
              new Coordinates(i, j),
              new Coordinates(i, j),
              temporaryBoard[i][j].value,
              temporaryBoard[i][j].value
            ));
            for (k = i + 1; k < data.site.siteMetadata.boardSize; k += 1) {
              if (temporaryBoard[k - 1][j].value === temporaryBoard[k][j].value
                && temporaryBoard[k][j].isUsed === false
                && temporaryBoard[k - 1][j].isUsed === false) {
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
    const newBoard = [];
    if (!impossibleMove) {
      for (i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
        newBoard[i] = new Array(data.site.siteMetadata.boardSize);
        for (j = 0; j < data.site.siteMetadata.boardSize; j += 1) {
          newBoard[i][j] = temporaryBoard[i][j].value;
        }
      }
      this.setState({ board: newBoard });
      this.setState({ movedList: newMovedList }, () => this.placeNewTile());
      setPoints(pointsToAdd);
    } else {
      this.setState({ movedList: newMovedList });
    }
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

  checkIfBoardIsEmpty = () => {
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
    return countFreePlaces === 16;
  }

  updateMovedList = (x, y, value, newValue) => {
    this.setState((prevState) => ({
      movedList: [...prevState.movedList, new MovementInfo(
        new Coordinates(x, y),
        new Coordinates(x, y),
        value,
        newValue
      )],
    }));
  }


  placeNewTile = (callback = () => {}) => {
    const { data } = this.props;
    let posX;
    let posY;
    const { board } = this.state;
    const newBoard = [];
    for (let i = 0; i < data.site.siteMetadata.boardSize; i += 1) {
      newBoard[i] = [...board[i]];
    }
    // WIP
    // game over
    if (!this.checkIfBoardIsFull) {

    }
    else {
      do {
        posX = Math.floor(Math.random() * (data.site.siteMetadata.boardSize));
        posY = Math.floor(Math.random() * (data.site.siteMetadata.boardSize));
      } while (newBoard[posX][posY] !== 0);
      // There is 10% chance for a new Tile to be 4
      const chanceForFour = 10; // in percentages
      const percentages = 100; // obvious
      const whichTile = Math.floor(Math.random() * (percentages / chanceForFour));
      if (whichTile === 0) {
        newBoard[posX][posY] = 4;
      } else {
        newBoard[posX][posY] = 2;
      }
      this.setState({ board: newBoard }, () => {
        this.updateMovedList(posX, posY, 0, newBoard[posX][posY]);
        callback();
      });
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

  getBoardTiles = () => {
    const newBoard = [];
    const { movedList } = this.state;
    if (!this.checkIfBoardIsEmpty()) {
      for (let i = 0; i < movedList.length; i += 1) {
        newBoard.push(
          <Tile
            key={uuid.v4()}
            value={movedList[i].fromTileValue}
            newValue={movedList[i].toTileValue}
            posX={movedList[i].fromCoords.x}
            posY={movedList[i].fromCoords.y}
            newPosX={movedList[i].toCoords.x}
            newPosY={movedList[i].toCoords.y}
          />
        );
      }
      return newBoard;
    }
    return newBoard;
  }

  render() {
    const { data } = this.props;
    return (
      <Container>
        {this.getBoard(data.site.siteMetadata.boardSize, data.site.siteMetadata.boardSize)}
        <BlankContainer>
          {this.getBoardTiles()}
        </BlankContainer>
      </Container>
    );
  }
}

Game.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  setPoints: PropTypes.func.isRequired,
};

export default Game;
