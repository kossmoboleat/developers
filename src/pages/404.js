import React from "react"
import { Link } from 'gatsby'
import Helmet from "react-helmet"
import styled from "styled-components"

import Layout from '../components/layout'
import SiteHeader from '../components/Layout/Header'
import SiteFooter from '../components/Layout/Footer'
import config from "../../data/SiteConfig"
import MainHeader from '../components/Layout/Header'
import About from '../components/About/About'
import { medium } from '../layouts/grid'
import arrowImg from '../images/ArrowBlurple.png'

class AboutPage extends React.Component {
  render() {
    return (<Layout location={this.props.location}>
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <Main>
          <IndexHeadContainer>
            <SiteHeader
              activeSection={''}
              location={this.props.location} />
          </IndexHeadContainer>
          <BodyContainer>
            <Message>
              <h1>We're sorry. The page you're looking for can't be found.</h1>
              <Link to='/' className='home'>
                Take me Home
              </Link>
            </Message>
          </BodyContainer>
          {/*<FooterContainer>
            <SiteFooter />
          </FooterContainer>*/}
        </Main>
      </div>
    </Layout>)
  }
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  min-height: 100vh;
`
const IndexHeadContainer = styled.div`
  background: ${props => props.theme.brand};
`
const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
`
const Message = styled.section`
  margin: 10vh auto 0;
  padding: 20px;
  ${medium('width: 60vw;')}

  h1 {
    font-size: 1.5rem;
  }
  .home {
    border: 2px solid #5c50ca;
    border-radius: 4px;
    background: linear-gradient(180deg,#7958D8 0%,#5C50CA 100%);
    color: #fff;
    box-shadow: 0 2px 10px 0 rgba(63,61,75,0.2);
    display: inline-block;
    padding: 10px 15px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
  }
`;
const FooterContainer = styled.footer`
  background-color: #6c59cf;
  clear: all;
`

export default AboutPage;
