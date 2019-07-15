import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import './i18n';
import { Translation } from 'react-i18next';

const Button = styled.div`
  font-size: 2rem;
  background: var(--buttons-color);
  border-radius: 5px;
  color: var(--text-color-secondary);
  width: 200px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  cursor: pointer;
  margin-top: 50px;
`;

class NewGameButton extends React.Component {
  render() {
    const { newGame } = this.props;
    return (
      <Translation>
        {t => (
          <Button onClick={newGame}>
            {t('NEWGAME')}
          </Button>
        )}
      </Translation>
    );
  }
}

NewGameButton.propTypes = {
  newGame: PropTypes.func.isRequired,
};

export default NewGameButton;
