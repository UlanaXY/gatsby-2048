import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tile extends Component {
  render() {
    const { value } = this.props;
    return (
      <div>
        {value}
      </div>
    );
  }
}

export default Tile;
