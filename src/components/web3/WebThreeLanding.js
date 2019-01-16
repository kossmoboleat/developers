import React, {Component} from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import web3Img from '../../images/web3monitor.png'
import arrowImg from '../../images/ArrowBlack.png'
import orangeTick from '../../images/orange-tick.svg'
import UnorderedList from '../Layout/html/UnorderedList'
import { Container, Grid, Col, large, small } from '../../layouts/grid'

class WebThreeLanding extends Component {
  render() {
    return (
      <Wrapper>
        <Content>
          <Grid className='box'>
            <Col span={6} large className='left' />
            <Col span={6} large className='right'>
              <Grid className='right-wrap'>
                <Col span={12}>
                  <h2>Web 3.0</h2>
                  <p>
                    uPort provides client-side libraries that allow you to
                    interact with a user's uPort identity&mdash;through the
                    mobile app. You can create requests for a user's data,
                    share credentials, and generate transactions to be signed
                    on the user's mobile app.
                  </p>
                  <hr />
                </Col>
                <Col span={6}>
                  <UnorderedList>
                    <li className='blue-tick'>
                      <Link to='/connect/login'>Create and verify authentication requests</Link>
                    </li>
                    {/* <li className='blue-tick'> */}
                    {/*   <a href='#'>Ask users to sign Ethereum transactions</a> */}
                    {/* </li> */}
                  </UnorderedList>
                </Col>
                <Col span={6}>
                  <UnorderedList className='second'>
                    <li className='blue-tick'>
                      <Link to='/connect/sendverification'>Create and Send verified claims</Link>
                    </li>
                    <li className='blue-tick'>
                      <Link to='/connect/requestverification'>Request verified claims from your users</Link>
                    </li>
                  </UnorderedList>
                </Col>
                <Col span={12}>
                  <Link to='/web3' className='link'>
                    VIEW ALL SOLUTIONS
                  </Link>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </Content>
        <Background>
          <Triangle viewBox="0 0 200 100">
            <polygon points="0,100 0,75 200,45 200,100" className="triangle" />
          </Triangle>
        </Background>
      </Wrapper>
    );
  }
}

export default WebThreeLanding

const Content = styled(Container)`
  position: relative;
  z-index: 4;
`
const Wrapper = styled.section`
  position: relative;
  .box {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 20px rgba(139, 139, 139, 0.25);
    overflow: hidden;
    justify-content: space-between;
  }
  .left {
    display: none;
  }
  .right {

  }
  .right-wrap {
    margin: 2em;
  }
  .subgrid {
    justify-content: center;
    margin: 40px 0;
  }
  .subleft {

  }
  .subright {

  }
  hr {
    margin: unset;
    margin: initial;
    border: 1px solid #e5e5e5;
  }
  h2 {
    color: #3F3D4B;
    font-size: 24px;
    font-weight: 800;
    font-style: normal;
    line-height: 32px;
    margin-top: 0;
  }
  li {
    color: #E77E55;
    font-weight: 700;
  }
  li::before {
    background-image: url(${orangeTick});
  }
  p {
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
    font-style: normal;
    color: #3F3D4B;
  }
  a {
    color: #E77E55;
    text-decoration: none;
  }
  .link {
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 18px;
    color: #3F3D4B;
    grid-area: 2 / 1 / 3 / 3;
  }
  .link::after {
    content: url(${arrowImg});
    margin-left: 20px;
    vertical-align: middle;
    text-align: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  ${small(`
    ul.second {
      margin-top: -30px;
    }
  `)}
  ${large(`
    .left {
      display: block;
      background-image: url(${web3Img});
      background-position: right bottom;
      background-repeat: no-repeat;
    }
    .right-wrap {
      margin: 76px 80px 30px 20px;
    }
  `)}
  @media (min-width: 1137px) {
    .left {
      background-position: left bottom;
    }
  }
`
const Background = styled.div`
  bottom: -40px;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 2;
`
const Triangle = styled.svg`
  fill: #fff;
`
