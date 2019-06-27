import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tile extends Component {
  render() {
    const { props } = this;
    return (
      <div>
        {props.value}
      </div>
    );
  }
}

export default Tile;
