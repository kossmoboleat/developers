import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import bgPatternWhite from '../../images/bg-pattern-white.svg'
import heroImg from '../../images/server_hero.svg'
import track from '../../utilities/track'
import { Container, Grid, Col, medium } from '../../layouts/grid'
import { Link } from 'gatsby'

class ServerHero extends React.Component {
  track = (name) => () => {
    track(name, {
      source: 'Server Landing'
    })
  }
  render () {
    return (<Hero>
      <Container>
        <Grid>
          <Col span={6} className={`left`}>
            <div className='content'>
              <h4>Using uPort in</h4>
              <h1 className='hero-title'>Server Solutions</h1>
              <p className='hero-subheading'>
                Login your users, in addition to issuing and accepting verified data.
              </p>
              <div className={'hero-features'}>
                <div className=''>
                  <Link to='/server#server-solutions' className='hero-button' onClick={this.track('Server Solutions Clicked')}>
                    GET STARTED
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Col span={6} className={`right`} />
        </Grid>
      </Container>
    </Hero>);
  }
}

export default ServerHero

const Hero = styled.div`
  background: url(${bgPatternWhite});
  background-size: 60%;
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
    background: #4C9EA6;
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
