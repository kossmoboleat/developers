import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Navigation from './Navigation'
import Search from '../Search'
import bannerImg from '../../images/Horizontal-Logo.svg'
import { Container } from '../../layouts/grid'

class MainHeader extends React.Component {
  render () {
    return (
      <SiteContainer>
        <Container>
          <NavGrid>
            <Link to='/'>
              <img className='brand-img' src={bannerImg} />
            </Link>
            <div className='nav-wrap'>
              <Navigation
                className={`w-nav`}
                activeSection={this.props.activeSection} />
            </div>
          </NavGrid>
        </Container>
      </SiteContainer>
    )
  }
}

const NavGrid = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 60px;
`
const SiteContainer = styled.header`
  .nav-wrap #topNav {
    text-align: right;
    white-space: nowrap;
  }
  .bm-overlay {
    display:none;
  }
`

export default MainHeader
