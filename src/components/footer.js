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
    
    display: flex;
    align-items: flex-start;
    flex-flow: row;
    flex-direction: row;
    justify-content: space-around;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

//  TODO
//  Stylelint $
const dropdownContent = css`
  display: none;
  position: absolute;
  min-width: 50px;
  bottom:100%;
  ${Dropdown}:hover & {
    display: block;
    background: #bb0000;
  }
`;

const Element = styled.div`
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
      background: #bb00bb;
    }
    margin: 0 auto;
`;

const dropBtn = css`
  background: #bbbba0;
  display: block;
  text-align: center;
  height: 3rem;
  min-width: 50px;
  &:hover {
    background: #bb00bb;
  }
`;

const wrap = css`
  width: 200px;
  margin: 0 auto;
  text-align: center;
`;

const CustomWrap = styled.div`
  width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Footer = () => (
  <FooterWrap>
    <div className={wrap} />
    <CustomWrap />
    <div className={wrap}>
      <Dropdown>
        <div className={dropdownContent}>
          <Element>1</Element>
          <Element>2</Element>
          <Element>3</Element>
        </div>
        <div className={dropBtn}>Drop</div>
      </Dropdown>
    </div>
  </FooterWrap>
);

export default Footer;
