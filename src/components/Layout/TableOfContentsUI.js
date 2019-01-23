import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { medium } from '../../layouts/grid'

export default class TableOfContentsUI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeHeadings: []
    }
  }
  componentDidMount() {
    if(this.container.getBoundingClientRect().width)
      this.intv = setInterval(this.highlightActiveLink, 200)
  }
  componentWillUnmount() {
    if(this.intv)
      clearInterval(this.intv)
  }
  highlightActiveLink = () => {
    const contentWindow = this.props.getContentWindow()
    if(!contentWindow)
      return
    let headings = this.props.headings.map(h => ({
      ...h,
      id: h.id && h.id
        .replace('uport-', 'u-port-')
        .replace('--', '-')
    }))
    for(let i=0; i<headings.length; i++) {
      const headlingEl = document.getElementById(headings[i].id)
      if(!headlingEl) {
        continue
      }
      const rect = headlingEl.getBoundingClientRect()
      headings[i].isInView = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      )
      headings[i].hasScrolledPast = (headlingEl.offsetTop < contentWindow.scrollTop)
    }
    let activeIndex = -1
    for(let i=0; i<headings.length; i++) {
      if(headings[i].isInView) {
        // pick the first heading within the viewport
        headings[i].active = true
        activeIndex = i
        break
      }
    }
    if(activeIndex == -1) {
      // none of the headings are within the viewport
      for(let i=headings.length-1; i>=0; i--) {
        if(headings[i].hasScrolledPast) {
          // pick the nearest heading above the viewport
          headings[i].active = true
          activeIndex = i
          break
        }
      }
    }
    if(activeIndex > -1) {
      let curLevel = headings[activeIndex].level
      for(let i=activeIndex-1; i>=0; i--) {
        if(headings[i].level >= curLevel) {
          headings[i].active = false
        } else {
          curLevel = headings[i].level
          headings[i].active = true
        }
      }
      for(let i=activeIndex+1; i<headings.length; i++) {
        headings[i].active = false
      }
    }
    const activeHeadings = headings.filter(h => h.active).map(h => h.id)
    if(this.state.activeHeadings.join('|') != activeHeadings.join('|')) {
      // set state only if active headings change
      this.setState({
        activeHeadings
      })
    }
  }
  render () {
    const { listItems } = this.props
    const { activeHeadings } = this.state

    const links = listItems.map(li => {
      const innerLinks = li.innerLinks.map(cc => {
        const isActive = Boolean(activeHeadings.find(hId => hId == cc.headingId)) &&
          cc.isPathMatch
        return (<li key={cc.text}>
          <ContentContainer>
            <a href={cc.url}>
              <h6 className={`${ isActive ? 'active' : ''}`}>{cc.text}</h6>
            </a>
          </ContentContainer>
        </li>)
      })

      const isActive = activeHeadings
        .find(hId => hId === li.headingId ) ||
        li.isPathMatch

      return (<li key={`${li.url}`}>
        <Link to={`${li.url}`}>
          <span>
            <h5 className={`tocHeading ${isActive ? 'active' : ''}`}>
              {li.text}
            </h5>
          </span>
        </Link>
        <ul className='chapterItems'>
          {innerLinks}
        </ul>
      </li>)
    })

    return (<TableOfContentsContainer id="toc" ref={ref => this.container = ref}>
      <Scrollpane>
        <ul>
          {links}
        </ul>
      </Scrollpane>
    </TableOfContentsContainer>)
  }
}
TableOfContentsUI.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape({
    headingId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isPathMatch: PropTypes.bool.isRequired,
    innerLinks: PropTypes.arrayOf(PropTypes.shape({
      headingId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      isPathMatch: PropTypes.bool.isRequired
    }))
  }))
}

const TableOfContentsContainer = styled.div`
  display: none;
  padding: 40px 25px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0;
    }

    li::before {
      all: initial;
      background-image: none;
      list-style: none;
    }
    li:first-child .tocHeading {
      background: none;
      color: #5C50CA;
      font-size: 20px;
      font-weight: 800;
      margin-top: 0;
      padding-left: 20px;
    }
  }
  .chapterItems {
    list-style: none;
    padding: 0;
    margin-left: 40px;
  }

  a {
    text-decoration: none;
  }

  p, h6 {
    display: inline-block;
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 8px;
  }
  h5 {
    font-size: 14px;
    font-weight: bold;
    padding-left: 20px;
  }
  h5.active,
  .tocHeading.active {
    background-color: #D3D4F8;
    border-radius: 4px;
    color: ${props => props.theme.brandHighlight};
    font-size: 14px;
    font-weight: bold;
    padding: 15px 20px;
  }

  h5:hover {
    color: ${props => props.theme.brandHighlight};
  }

  h6.active {
    color: ${props => props.theme.secondaryBrand};
  }

  .tocHeading {
    font-weight: 400;
    color: ${props => props.theme.darkGrey};
    margin-top: 25px;
    font-size: 14px;
  }

  ${medium('display: block;')}
`
const Scrollpane = styled.div`
  background-color: #F2F3F9;
  border-radius: 4px;
  height: 70vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 30px 20px;
  ::-webkit-scrollbar-track
  {
    background: ${props => props.theme.lightGrey};
  }
  ::-webkit-scrollbar
  {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb
  {
    background: ${props => props.theme.tocAccent};
  }
`
const ContentContainer = styled.div`
   h6, p {
   color: ${props => props.theme.darkGrey};
 }
 li {
   margin-left:-10px;
 }

 &:hover {
   li {
     span {
       border-bottom: 1px solid ${props => props.theme.tocAccent};
     }
   }
 }
`
