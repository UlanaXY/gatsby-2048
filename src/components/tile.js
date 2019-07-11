import React from 'react';
import PropTypes from 'prop-types';
// import { styled } from 'linaria/react';
import { css } from 'linaria';
import { useSpring, animated } from 'react-spring';

//   transform: var(--tile-position);

const tileLayout = css`
  position: absolute;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-weight: bold;
  width: 127.5px;
  height: 127.5px;
  margin-left: 18px;
  margin-top: 18px;
  float: left;
  border-radius: 4px;
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

const resize = (value, newValue) => {
  if (value === newValue) {
    return 'scale(1)';
  }
  return 'scale(1.2)';
};

const tilePosition = (posX, posY) => `translate(${posX * (127.5 + 18)}px, ${posY * (127.5 + 18)}px)`;

function Tile(props) {
  const {
    value, newValue, posX, posY, newPosX, newPosY,
  } = props;
  const { xy, merge } = useSpring({
    from: { xy: [newPosY, newPosX], merge: [value] },
    to: async next => {
      await next({ xy: [posY, posX], config: { duration: 200 } });
      await next({ merge: [newValue], config: { duration: 200 } });
    },
  });
  // console.log(xy);
  return (
    <animated.div
      className={tileLayout}
      style={{
        transform: xy.interpolate(tilePosition),
        //transform: merge.interpolate(resize),
        background: merge.interpolate(tileColor),
        '--text-color': textColor(newValue),
        '--font-size': fontSize(newValue),
      }}
    >
      {
        toDisplay(newValue)
      }
    </animated.div>
  );
}

Tile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  // xy: PropTypes.any,
  value: PropTypes.number.isRequired,
  newValue: PropTypes.number.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  newPosY: PropTypes.number.isRequired,
  newPosX: PropTypes.number.isRequired,
};

export default Tile;
