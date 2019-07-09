import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import { useSpring, animated } from 'react-spring';

const TileLayout = styled.div`
  position: absolute;
  transform: var(--tile-position);
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-weight: bold;
  width: 127.5px;
  height: 127.5px;
  margin-left: 18px;
  margin-top: 18px;
  float: left;
  border-radius: 4px;
  background: var(--tile-color);
  color: var(--text-color);
  font-size: var(--font-size);
  text-align: center;
  line-height: 127.5px;
`;

const tileColor = (value) => {
  if (value === 0) {
    return 'default';
  }
  if (value === 2) {
    return '#EEE4DA';
  }
  if (value === 4) {
    return '#EDE0C8';
  }
  if (value === 8) {
    return '#F2B179';
  }
  if (value === 16) {
    return '#F59563';
  }
  if (value === 32) {
    return '#F67C5F';
  }
  if (value === 64) {
    return '#F65E3B';
  }
  if (value === 128) {
    return '#EDCF72';
  }
  return '#EDCF72';
};

const textColor = (value) => {
  if (value <= 4) {
    return '#776E65';
  } 
  return 'white';
};

const fontSize = (value) => {
  if (value < 100) { // 2 and 1 digits
    return '4rem';
  }
  if (value < 1000) { // 3 digits
    return '3.5rem';
  }
  return '3rem'; // over 3 digits
};

const toDisplay = (value) => {
  if (value === 0) {
    return '';
  }
  return value;
};

const tilePosition = (posX, posY) => `translate(${posY * (127.5 + 18)}px, ${posX * (127.5 + 18)}px)`;

// WIP
const animate = (posX, posY, newPosX, newPosY) => useSpring({
  from: { translate: tilePosition(posX, posY) },
  to: { translate: tilePosition(newPosX, newPosY) },
  config: { duration: 100 },
});

class Tile extends Component {
  render() {
    const { value, posX, posY } = this.props;
    return (
      // <animated.div style={animate(posX, posY, posX, posY)}>
      <TileLayout
        style={{
          '--tile-color': tileColor(value),
          '--text-color': textColor(value),
          '--font-size': fontSize(value),
          '--tile-position': tilePosition(posX, posY),
        }}
      >
        {
          toDisplay(value)
        }
      </TileLayout>
      // </animated.div>
    );
  }
}

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
};

export default Tile;
