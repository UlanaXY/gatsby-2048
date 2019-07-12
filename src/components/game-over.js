import { animated, useSpring } from 'react-spring';
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import Tile from './tile';

const opacityChoose = (ifDisplay) => {
  if (ifDisplay) {
    return '1';
  }
  return '0';
};

function GameOver(props) {
  const {
    ifDisplay,
  } = props;
  const {
    opacity,
  } = useSpring({
    from: {
      opacity: [false],
    },
    to: {
      opacity: [ifDisplay],
    },
  });
  return (
    <animated.div
      style={{
        opacity: opacity.interpolate(opacityChoose),
      }}
    />
  );
}

Tile.propTypes = {
  ifDisplay: PropTypes.bool.isRequired,
};

export default GameOver;
