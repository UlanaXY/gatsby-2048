import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';

const TileLayout = styled.div`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-weight: bold;
  width: 127.5px;
  height: 127.5px;
  margin-left: 18px;
  float: left;
  border-radius: 4px;
  background: var(--tile-color);
  color: var(--text-color);
  font-size: 4rem;
  text-align: center;
  line-height: 127.5px;
`;

const color = (value) => {
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
  return 'rgba(250, 228, 218, 0.35)';
};

const textColor = (value) => {
  if (value <= 4) {
    return '#776E65';
  } 
  return 'white';
};

const displayValue = (value) => {
  if (value !== 0) {
    return value;
  }
  return '';
};

class Tile extends Component {
  render() {
    const { value } = this.props;
    return (
      <TileLayout
        style={{
          '--tile-color': color(value),
          '--text-color': textColor(value),
        }}
      >
        {
          displayValue(value)
        }
      </TileLayout>
    );
  }
}

Tile.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Tile;
