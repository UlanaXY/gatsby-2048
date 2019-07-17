import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import { useSpring, animated } from 'react-spring';
import logarithmBase2 from './logarithm-base-2';

const tileLayout = css`
  display: var(--to-display);
  position: absolute;
  font-weight: bold;
  width: 127.5px;
  height: 127.5px;
  margin-left: 18px;
  margin-top: 18px;
  float: left;
  border-radius: 4px;
  text-align: center;
  line-height: 127.5px;
  font-size: var(--font-size);
  box-shadow: var(--box-shadow);
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
  if (value === 256) {
    return '#EDCC61';
  }
  if (value === 512) {
    return '#EDC850';
  }
  if (value === 1024) {
    return '#EDC53F';
  }
  if (value === 2048) {
    return '#EDC22E';
  }
  return '#3C3A32';
};

const calcBoxShadow = (value) => {
  if (value <= 2048 && value >= 128) {
    const numberOfTile = 5 + (logarithmBase2(value) - 6) * 3;
    return ` 0 0 ${numberOfTile}px ${numberOfTile}px rgba(237,207,114, 0.2)`;
  }
  return ' 0 0px 0px 0 rgba(237,207,114, 0.2)';
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

const ifDisplay = (value) => {
  if (value === 0) {
    return 'none';
  }
  return 'block';
};

const tilePosition = (posX, posY) => `translate(${posX * (127.5 + 18)}px, ${posY * (127.5 + 18)}px)`;

const scaleTile = (posX, posY, scale) => {
  let toReturn = tilePosition(posX, posY);
  toReturn += ` scale(${scale})`;
  return toReturn;
};

const setScale = (value, newValue) => {
  // if tile value remains unchanged it means that it did't merged or appear
  // in this move so we don't need
  // appear and merge animation
  if (value === newValue) {
    return 1;
  }
  return 0;
};

const setScaleNext = (value, newValue) => {
  // if tile value remains unchanged it means that it didn't merged or appear
  // in this move so we don't need
  // appear and merge animation
  if (value === newValue) {
    return 1;
  }
  return 1.2;
};

function Tile(props) {
  const {
    value, newValue, posX, posY, newPosX, newPosY,
  } = props;
  const {
    scale,
    color,
    background,
    sizeFont,
    display,
    boxShadow,
  } = useSpring({
    from: {
      scale: [posY, posX, 1],
      background: [value],
      color: [value],
      sizeFont: [value],
      display: [value],
      boxShadow: [value],
    },
    to: async next => {
      await next({ // Tile move animation
        scale: [newPosY, newPosX, 1],
        config: { duration: 100 },
      });
      await next({ // Tile change state animation
        display: [newValue],
        background: [newValue],
        color: [newValue],
        sizeFont: [newValue],
        boxShadow: [newValue],
        scale: [newPosY, newPosX, setScale(value, newValue)],
        config: { duration: 1 },
      });
      await next({ // Tile appear or merge animation
        scale: [newPosY, newPosX, setScaleNext(value, newValue)],
        config: {
          duration: 100,
        },
      });
      await next({ // Tile appear or merge animation
        scale: [newPosY, newPosX, 1],
        config: {
          duration: 100,
        },
      });
    },
  });
  return (
    <animated.div
      className={tileLayout}
      style={{
        transform: scale.interpolate(scaleTile),
        background: background.interpolate(tileColor),
        color: color.interpolate(textColor),
        '--font-size': sizeFont.interpolate(fontSize),
        '--to-display': display.interpolate(ifDisplay),
        '--box-shadow': boxShadow.interpolate(calcBoxShadow),
      }}
    >
      {
        toDisplay(newValue)
      }
    </animated.div>
  );
}

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  newValue: PropTypes.number.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  newPosY: PropTypes.number.isRequired,
  newPosX: PropTypes.number.isRequired,
};

export default Tile;
