import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Menu from 'react-burger-menu/lib/menus/slide'

import LoginStatus from './LoginStatus'
import Search from '../Search'
import Flagged from './Flagged'
import track from '../../utilities/track'
import { medium, small } from '../../layouts/grid'

class Navigation extends React.Component {
  track = (name, properties={}) => () => {
    track(name, {
      source: 'Header',
      ...properties
    })
  }
  render () {
    const { activeCategory, showSearch } = this.props
    return (
      <NavContainer>
        <section id='topNav'>
          <StyledLink
            className={`w-nav-link nav-link menu-item ${activeCategory === 'overview' ? 'active' : ''}`}
            to='/overview/index'
            activeClassName='active'
            onClick={this.track('Overview Clicked')}
          > About </StyledLink>
          <StyledLink
            className={`w-nav-link nav-link menu-item ${activeCategory !== 'overview' ? 'active' : ''}`}
            to='/index.html#platform'
            activeClassName='active'
            onClick={this.track('Platform Clicked')}
          > Platform </StyledLink>
          <a href='https://chat.uport.me'
            className={`nav-link w-nav-link`}
            target='_blank'
            onClick={this.track('Help Opened')}
          > Help </a>
          <a href='https://medium.com/uport'
            className='nav-link w-nav-link'
            target='_blank'
            onClick={this.track('Blog Opened')}
          > Blog </a>
          <Flagged name='headerSearch'>
            <div>
              <Search />
            </div>
          </Flagged>
          <LoginStatus />
        </section>
        <div id='responsiveNavContainer'>
          <Menu right isOpen={false} styles={styles}>
            <StyledLink
              className={`w-nav-link nav-link menu-item ${activeCategory === 'overview' ? 'active' : ''}`}
              to='/overview/index'
              activeClassName='active'
              onClick={this.track('Overview Clicked', { mobile: true })}
            > About </StyledLink>
            <StyledLink
              className={`w-nav-link nav-link menu-item ${activeCategory !== 'overview' ? 'active' : ''}`}
              to='/index.html#platform'
              activeClassName='active'
              onClick={this.track('Platform Clicked', { mobile: true })}
            > Platform </StyledLink>
            <a href='https://chat.uport.me'
              className={`menu-item`}
              target='_blank'
              onClick={this.track('Help Opened', { mobile: true })}
            > Help </a>
            <a href='https://medium.com/uport'
              className='menu-item'
              target='_blank'
              onClick={this.track('Blog Opened', { mobile: true })}
            > Blog </a>
          </Menu>
        </div>
      </NavContainer>
    )
  }
}

const styles = {
  bmMenuWrap: {
    width: '280px'
  },
  bmBurgerButton: {
    position: 'absolute',
    width: '20px',
    height: '15px',
    right: '36px',
    top: '22px'
  },
  bmBurgerBars: {
    background: '#fff',
    borderRadius: '2px'
  },
  bmCrossButton: {
    height: '28px',
    width: '28px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#5c50ca',
    padding: '8px 10 8px 20px',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const NavContainer = styled.nav`
  #topNav {
    width: 100%;
    background: ${props => props.theme.brand};
  }

  .bm-menu {
    padding-top: 20px;
    .menu-item {
      font-size: 16px;
      text-decoration: none;
      color: #efefef;
      padding: 10px 20px;
    }
  }

  nav.bm-item-list a {
    text-transform: none;
  }

  ${small(`
    display: flex;
    flex-direction: column;

    #topNav {
      display: none;
    }
  `)}
  ${medium(`
    #responsiveNavContainer {
      display: none;
    }
    #topNav {
      display: flex;
    }
  `)}
`
const StyledLink = styled(Link)`
  &.active {
    font-weight: 400;
    color: ${props => props.theme.themedWhite};
  }
`

export default Navigation
