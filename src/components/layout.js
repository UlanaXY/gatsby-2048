/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Game from './game';


const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {   
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <PageContainer>
          <main>
            {children}
          </main>
          {/* <Game /> */}
          <footer>
            ©
            {' '}
            {new Date().getFullYear()}
            {', Built with'}
            {' '}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </PageContainer>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
