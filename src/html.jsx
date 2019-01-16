/* eslint import/no-unresolved:"off" */
/* eslint import/extensions:"off" */
/* eslint global-require:"off" */
import React from 'react'
import favicon from './favicon.png'

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.headComponents}
          <link rel="shortcut icon" href={favicon} />
          <script type='text/javascript' src='https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css' />
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
