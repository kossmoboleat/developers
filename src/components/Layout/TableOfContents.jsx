import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import _ from 'lodash'
import { cleanDoubleByteChars } from '../../helpers/cleanDoubleByteChars'

const fixOverviewPaths = (path='') => path.replace(/^\/overview\/overview$/, '/overview')

export default class TableOfContents extends React.Component {
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
      if(!headlingEl)
        continue
      const rect = headlingEl.getBoundingClientRect()
      headings[i].isInView = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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
    const { activeHeadings } = this.state
    const { post, types } = this.props
    let urlHash = ''
    let pathName = ''
    if (typeof window !== 'undefined') {
      urlHash = window.location.hash.replace('#', '')
      pathName = window.location.pathname
    }
    const type = post.type
    /* const type = this.props.contentsType */
    const postNodes = []

    types.forEach(_post => {
        const postNode = {
          title: _post.node.frontmatter.title,
          path: fixOverviewPaths(_post.node.fields.slug),
          indexNumber: _post.node.frontmatter.index,
          category: _post.node.frontmatter.category,
          headings: _post.node.headings
        }

        if (postNode.indexNumber || postNode.indexNumber === 0) {
          postNodes.push(postNode)
        } else if (post.title == _post.node.frontmatter.title ) {
          postNodes.push(
            {
              title: _post.node.frontmatter.title,
              path: fixOverviewPaths(_post.node.fields.slug),
              indexNumber: 0,
              category: _post.node.frontmatter.category,
              headings: _post.node.headings
            }
          )
        }
    })
    const listItems = []
    postNodes.sort((a, b) => a.indexNumber - b.indexNumber).forEach((cat) => {
      const chapterContents = []
      if (cat.headings) {
        cat.headings.forEach(node => {
          if (node.depth === 2) {
            const heading = cleanDoubleByteChars(_.kebabCase(node.value))
            const isActive = Boolean(activeHeadings.find(hId => hId == heading)) &&
              cat.path == pathName
            chapterContents.push(
              <li key={`${node.value}`}>
                <ContentContainer>
                  <a href={`${cat.path}#${heading}`}>
                    <h6 className={`${ isActive ? 'active' : ''}`}>{node.value}</h6>
                  </a>
                </ContentContainer>
              </li>
            )
          }
        })
      }
      const isActive = activeHeadings
        .find(hId => hId == cleanDoubleByteChars(_.kebabCase(cat.title))) ||
        pathName === cat.path
      listItems.push(
        <li key={`${cat.path}`}>
          <Link to={`${cat.path}`}>
            <span>
              <h5 className={`tocHeading ${isActive ? 'active' : ''}`}>
                {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
              </h5>
            </span>
          </Link>
          <ul className='chapterItems'>
            {chapterContents}
          </ul>
        </li>
      )
    })
    return (
      <TableOfContentsContainer id="toc" ref={ref => this.container = ref}>
        <ul>
          {listItems}
        </ul>
      </TableOfContentsContainer>
    )
  }
}

const TableOfContentsContainer = styled.div`
  display: none;
  padding: ${props => props.theme.sitePadding};

  ul li::before {
    all: initial;
    background-image: none;
    list-style: none;
  }
  & > ul, .chapterItems {
    list-style: none;
    padding: 0;
    margin-left: 30px;
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
  .active,
  .tocHeading.active {
    color: ${props => props.theme.brandHighlight};
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
   font-size: 16px;
 }
 @media all and (min-width: 600px) {
  display: block;
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
