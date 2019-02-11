import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Link } from 'gatsby'
import heroImg from '../../images/web3hero.svg'
import track from '../../utilities/track'
import { Container, Grid, Col, medium } from '../../layouts/grid'

class Web3Hero extends React.Component {
  track = (name) => () => {
    track(name, {
      source: 'Web3 Landing'
    })
  }
  render () {
    return (<Hero>
      <Container>
        <Grid>
          <Col span={6} className='left'>
            <div className='content'>
              <h4>Using uPort in</h4>
              <h1 className='hero-title'>Client-Side Solutions</h1>
              <p className='hero-subheading'>
                Whether it's a "dApp" or a more traditional application, your users will appreciate the gift of soveriengty.

                Let them have power over what information they choose to disclose.
              </p>
              <div className={'hero-features'}>
                <div className=''>
                  <Link to='/web3#web3-solutions' className='hero-button' onClick={this.track('Web3 Solutions Clicked')}>
                    GET STARTED
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Col span={6} className='right' />
        </Grid>
      </Container>
    </Hero>);
  }
}

export default Web3Hero

const Hero = styled.div`
  margin-bottom: 100px;
  .left {
    position: relative;
    .content {
      padding: 50px 0;
    }
  }
  .right {
    background-image: url(${heroImg});
    background-position: top right;
    background-repeat: no-repeat;
    background-size: contain;
    display: none;
  }
  .hero-title {
    font-style: normal;
    font-weight: 800;
    line-height: 72px;
    font-size: 52px;
    margin: -5px 0 10px 0;
  }
  .hero-subheading {
    font-style: normal;
    font-weight: normal;
    line-height: 36px;
    font-size: 24px;
    margin: 20px 0;
  }
  .hero-title, .hero-subheading, h2, h4, p {
    color: #3F3D4B;
  }
  .hero-button {
    height: 60px;
    margin: 10px 0 0 0;
    background: #E77E55;
    border: none;
    color: #FFFFFF;
    font-style: normal;
    font-weight: 800;
    line-height: 48px;
    font-size: 16px;
    text-align: center;
    padding: 7px 0 7px 0;
  }

  ${medium(`
    .left .content {
      padding: 20vh 0 0;
    }
    .right {
      display: block;
      height: 70vh;
      position: absolute;
      right: 0;
      top: 63px;
      width: 50vw;
    }
  `)}
`


// https://foundation.zurb.com/sites/docs/media-queries.html#default-media-queries
