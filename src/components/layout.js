/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'linaria/react';
import { css } from 'linaria';
import { StaticQuery, graphql } from 'gatsby';
import './style.css';

import Footer from './footer';

const PageContainer = styled.div`
  margin: 0 auto;
`;

export const globals = css`
  :global() {
    html {
      background: var(--background-color);
      font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
      color: var(--text-color-main);
    }
    body {
      margin: 0;
    }
  }
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
        <PageContainer>
          <main>
            {children}
          </main>
          <Footer />
        </PageContainer>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
