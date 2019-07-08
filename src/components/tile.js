import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from "linaria/react"

const TileLayout = styled.div`
  width: 127.5px;
  height: 127.5px;
  margin-left: 18px;
  float: left;
  border-radius: 4px;
  background: rgba(0, 228, 218, 0.35);
  font-size: 5rem;
  text-align: center;
`;

class Tile extends Component {
  render() {
    const { value } = this.props;
    return (
      <TileLayout>
        {value}
      </TileLayout>
    );
  }
}

Tile.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Tile;
