import React, {Component} from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import serverImg from '../../images/server-landing.png'
import arrowImg from '../../images/ArrowBlack.png'
import blueTick from '../../images/blue-tick.svg'
import UnorderedList from '../Layout/html/UnorderedList'
import { Container, Grid, Col, small, medium, large } from '../../layouts/grid'
import track from '../../utilities/track'

class ServerLanding extends Component {
  track = (name) => () => {
    track(name, {
      source: 'home'
    })
  }
  render() {
    return (
      <Wrapper>
        <Content>
          <Grid className='box'>
            <Col span={6} large className='left' />
            <Col span={6} large className='right'>
              <div className='right-wrap'>
                <Grid>
                  <Col span={12}>
                    <h2>Server</h2>
                    <p>
                      Server applications can integrate with uPort easily using uport-credentials and other helpful tools for traditional and web3 solutions.
                    </p>
                    <hr />
                  </Col>
                  <Col span={6}>
                    <UnorderedList>
                      <li className='blue-tick'>
                        <Link to='/credentials/login' onClick={this.track('Create & Verify Auth Requests Clicked')}>
                          Create and verify authentication requests
                        </Link>
                      </li>
                      <li className='blue-tick'>
                        <Link to='/credentials/transactions'>Ask users to sign Ethereum transactions</Link>
                      </li>
                    </UnorderedList>
                  </Col>
                  <Col span={6}>
                    <UnorderedList className='second'>
                      <li className='blue-tick'>
                        <Link to='/credentials/createverification' onClick={this.track('Create Verified Claims Clicked')}>
                          Create verified claims
                        </Link>
                      </li>
                      <li className='blue-tick'>
                        <Link to='/credentials/requestverification' onClick={this.track('Verify Claims For Users Clicked')}>
                          Verify claims for your users
                        </Link>
                      </li>
                    </UnorderedList>
                  </Col>
                  <Col span={12}>
                    <Link to='/server' className='link' onClick={this.track('View All Solutions Clicked')}>
                      VIEW ALL SOLUTIONS
                    </Link>
                  </Col>
                </Grid>
              </div>
            </Col>
          </Grid>
        </Content>
        <Background />
      </Wrapper>
    );
  }
}

export default ServerLanding


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
  color: #4C9EA6;
  font-weight: 700;
}
p {
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  font-style: normal;
  color: #3F3D4B;
}
a {
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
    background-image: url(${serverImg});
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
  background-color: #fff;
  bottom: -20px;
  left: 0;
  position: absolute;
  right: 0;
  top: -20px;
  z-index: 2;
`
