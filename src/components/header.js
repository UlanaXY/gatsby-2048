import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import { Link } from 'gatsby';
import { css } from 'linaria';


const Title = styled.header`
  font-style: normal;
  font-size: 5rem;
  font-weight: bold;
  margin: 0;
  display: block;
`;

const Score = styled.div`
    position: relative;
    display: inline-block;
    background: #bbada0;
    font-size: 2rem;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    float: right;
    color: #ffffff; 
`;

const Wrap = styled.div`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const element = css`
  padding: 15px 20px;
`;

const Up = styled.div`
  font-size: 0.8rem;
`;

const Header = ({ siteTitle }) => (
  <Wrap>
    <Title class={element}>
      {siteTitle}
    </Title>
    <Score class={element}>
      <Up>SCORE:</Up>
       87446
    </Score>
  </Wrap>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
