import React from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'

import TOCUI from './TableOfContentsUI'
import { medium } from '../../layouts/grid'
import { cleanDoubleByteChars } from '../../helpers/cleanDoubleByteChars'

const fixOverviewPaths = (path='') => path.replace(/^\/overview\/overview$/, '/overview')

export default class TableOfContents extends React.Component {
  render () {
    const { headings, post, types, getContentWindow } = this.props
    let urlHash = ''
    let pathName = ''
    if (typeof window !== 'undefined') {
      urlHash = window.location.hash.replace('#', '')
      pathName = window.location.pathname.replace(/\/$/, '')
    }
    const type = post.type
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
            chapterContents.push({
              headingId: heading,
              text: node.value,
              url: `${cat.path}#${heading}`,
              isPathMatch: cat.path === pathName
            })
          }
        })
      }
      listItems.push({
        headingId: cleanDoubleByteChars(_.kebabCase(cat.title)),
        text: cat.title.charAt(0).toUpperCase() + cat.title.slice(1),
        url: cat.path,
        innerLinks: chapterContents,
        isPathMatch: cat.path === pathName
      })
    })

    return (<TOCUI
      headings={headings}
      listItems={listItems}
      getContentWindow={getContentWindow} />)
  }
}
