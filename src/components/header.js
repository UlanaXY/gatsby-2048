import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import { Link } from 'gatsby';


const StyledHeader = styled.header`
  background: var(--purple);
  margin-bottom: 1.45rem;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

const StyledLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
`;


const Header = ({ siteTitle }) => (
  <StyledHeader>
    <Container>
      <h1>
        <StyledLink
          to="/"
        >
          {siteTitle}
        </StyledLink>
      </h1>
    </Container>
  </StyledHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
