import React, { Component } from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';
import i18n from './i18n';

const FooterWrap = styled.div`
    background: var(--footer-color);
    width: 100%;
    bottom: 0;
    position: absolute;
    height: 3rem;
    color: var(--text-color-secondary);
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
    background: var(--buttons-color);
  }
`;

const Element = styled.div`
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
      background: var(--footer-color);
    }
    margin: 0 auto;
`;

const dropBtn = css`
  padding: 12px 16px;
  background: var(--buttons-color);
  display: block;
  text-align: center;
  &:hover {
    background: var(--footer-color);
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

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLanguage: 'en',
    };
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    this.setState({ currentLanguage: lng });
  };

  chooseFlag = (lng) => {
    if (lng === 'en') {
      return (
        <img
          className="icon"
          src="https://cdn.pg.edu.pl/ekontakt-updated-theme/images/language/en_GB.png"
          alt="English (United Kingdom)"
          title="English (United Kingdom)"
        />
      );
    } if (lng === 'pl') {
      return (
        <img
          className="icon"
          src="https://cdn.pg.edu.pl/ekontakt-updated-theme/images/language/pl_PL.png"
          alt="polski (Polska)"
          title="polski (Polska)"
        />
      );
    }
    return null;
  }

  render() {
    const { currentLanguage } = this.state;
    return (
      <FooterWrap>
        <div className={wrap} />
        <CustomWrap />
        <div className={wrap}>
          <Dropdown>
            <div className={dropdownContent}>
              <Element onClick={() => this.changeLanguage('pl')}>
                <img
                  className="icon"
                  src="https://cdn.pg.edu.pl/ekontakt-updated-theme/images/language/pl_PL.png"
                  alt="polski (Polska)"
                  title="polski (Polska)"
                />
              </Element>
              <Element onClick={() => this.changeLanguage('en')}>
                <img
                  className="icon"
                  src="https://cdn.pg.edu.pl/ekontakt-updated-theme/images/language/en_GB.png"
                  alt="English (United Kingdom)"
                  title="English (United Kingdom)"
                />
              </Element>
              <Element>3</Element>
            </div>
            <div className={dropBtn}>
              {this.chooseFlag(currentLanguage)}
            </div>
          </Dropdown>
        </div>
      </FooterWrap>
    );
  }
}

export default Footer;
