import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import { css } from 'linaria';

const FooterWrap = styled.div`
    background: #bbada0;
    width: 100%;
    bottom: 0;
    position: absolute;
    height: 3rem;
`;

const dropdowncontent = css`
  display: none;
  position: absolute;
  min-width: 160px;
        li {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  }
`;

const dropbtn = css`
  display: inline-block;
  text-align: center;
`;

const Dropdown = styled.div`
  float: right;
  display: inline-block;
  background: #bb00bb;
  &:hover ~   .dropdowncontent {
    display: block;
    height: 300px;
    width: 100px;
    background: #bb0000;
  }
`;

const Footer = () => (
  <FooterWrap>
    <Dropdown>
      <button type="button" className={dropbtn}>Dropdown</button>
      <div className={dropdowncontent}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </div>
    </Dropdown>
  </FooterWrap>
);

export default Footer;
