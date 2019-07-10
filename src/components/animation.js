import React from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import { css } from 'linaria';

const box = css`
  position: absolute;
  width: 127.5px;
  height: 127.5px;
  margin-left: 18px;
  margin-top: 18px;
  float: left;
`;

const tilePosition = (posX, posY) => `translate(${posY * (127.5 + 18)}px, ${posX * (127.5 + 18)}px)`;

const Animation = () => {
  const props = useSpring({
    from: { translate: '0px, 0px' },
    to: { translate: '100px, 100px' },
    config: { duration: 1000 },
  });
  return <animated.div className={box} style={props} />;
};

export default Animation;
