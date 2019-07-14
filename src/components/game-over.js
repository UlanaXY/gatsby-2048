import { animated, useSpring } from 'react-spring';
import React from 'react';
import { css } from 'linaria';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';

import NewGameButton from './new-game-button';

const gameOver = css`
  display: block;
  width: 600px;
  height: 600px;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  font-size: 4rem;
  background: var(--game-over-color);
  border-radius: 5px;
  top: 0;
  position: absolute;
`;

const Up = styled.div`
  font-size: 1.5rem;
  line-height: 1.5rem;
`;

const Title = styled.div`
  margin-top: 150px;
`;

function GameOver(props) {
  const { points, newGame } = props;
  const fadeIn = useSpring(
    {
      opacity: 1,
      from: { opacity: 0 },
      config: { duration: 400 },
    }
  );
  return (
    <animated.div
      className={gameOver}
      style={fadeIn}
    >
      <Title>
        GAME OVER
      </Title>
      <Up>
        SCORE:
        {points}
      </Up>
      <NewGameButton newGame={newGame} />
    </animated.div>
  );
}

GameOver.propTypes = {
  points: PropTypes.number.isRequired,
  newGame: PropTypes.func.isRequired,
};

export default GameOver;
