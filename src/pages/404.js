import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/layout'
import SiteHeader from '../components/Layout/Header'
import config from '../../data/SiteConfig'
import { medium } from '../layouts/grid'
import bgImg from '../images/404-bg.svg'

class Custom404 extends React.Component {
  render() {
    return (<Layout location={this.props.location}>
      <div className='index-container'>
        <Helmet title={config.siteTitle} />
        <Main>
          <IndexHeadContainer>
            <SiteHeader
              activeSection={''}
              location={this.props.location} />
          </IndexHeadContainer>
          <BodyContainer>
            <Message>
              <h2>So, this happened...</h2>
              <h1>404</h1>
              <h3>We can’t seem to find the page you’re looking for.</h3>
            </Message>
          </BodyContainer>
          <Footer>
            <p>Here are some links that might be helpful:</p>
            <ul>
              <li>
                <Link to='/'>Home &#8594;</Link>
              </li>
              <li>
                <Link to='/categories/uport-connect'>uport-connect &#8594;</Link>
              </li>
              <li>
                <Link to='/categories/uport-credentials'>uport-credentials &#8594;</Link>
              </li>
              <li>
                <Link to='/categories/uport-transports'>uport-transports &#8594;</Link>
              </li>
            </ul>
          </Footer>
        </Main>
      </div>
    </Layout>)
  }
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`
const IndexHeadContainer = styled.div`
  background: ${props => props.theme.brand};
`
const BodyContainer = styled.div`
  background: transparent url(${bgImg}) center no-repeat;
  background-size: cover;
  padding: ${props => props.theme.sitePadding};
`
const Message = styled.section`
  text-align: center;
  padding: 2rem 20px;
  ${medium('padding: 100px 0;')}

  h1 {
    color: #5C50CA;
    font-size: 5rem;
    line-height: 1;
    margin: 40px 0;
    ${medium('font-size: 11.25rem;')}
  }
  h2 {
    color: #5C50CA;
    font-size: 2.375rem;
    line-height: 1;
  }
  h3 {
    color: #5C50CA;
    font-size: 1.5rem;
    line-height: 1;
  }
`;
const Footer = styled.footer`
  background: linear-gradient(138.95deg, #5C50CA 5.42%, #7958D8 96.28%);
  clear: all;
  color: #fff;
  padding: 35px 20px;
  text-align: center;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li + li {
    margin-top: 15px;
  }
  a {
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
  }
`

export default Custom404
