const path = require("path");
const _ = require("lodash");
const repositories = require('./data/repositories')

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    // if (
    //   Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
    //   Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
    // ) {
    //   slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    // }

    // if (
    //   Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
    //   Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    // ) {
    //   slug = `/${_.kebabCase(node.frontmatter.title)}`;
    // } else

    // if (// parsedFilePath.name !== "index" &&
    //     parsedFilePath.dir !== "" && parsedFilePath.dir !== null) {

    // } // else

    // if (parsedFilePath.dir === "") {
    //   //slug = `/${parsedFilePath.name}/`;
    //   slug = `${_.trim(parsedFilePath.dir, 'public/')}/${_.trim(_.toLower(parsedFilePath.name))}`;
    // } else {
    //   //slug = `/${parsedFilePath.dir}/`;
    //   slug = `${_.trim(parsedFilePath.dir, 'public/')}`;
    // }

    let dir = `${_.replace(parsedFilePath.dir, 'public', '')}`;
    let name = `${_.trim(_.toLower(parsedFilePath.name))}`;
    slug = `${dir}/${name}`;

    // console.log(parsedFilePath);

    //console.log(slug);
    // if ( Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
    //      Object.prototype.hasOwnProperty.call(node.frontmatter, "prefix")){
    //   createNodeField({node, name: "slug", value: `${node.frontmatter.prefix}${slug}`});
    // } else {
    //   createNodeField({node, name: "slug", value: slug});
    // }
    createNodeField({node, name: "slug", value: slug});
  }
};

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;

  /* add new types of pages for programatic creation here */
  return new Promise((resolve, reject) => {
    const contentPage = path.resolve("src/templates/content.jsx");
    const overviewPage = path.resolve("src/templates/overview.jsx");
    const categoryPage = path.resolve("src/templates/category.jsx");
    const releasesPage = path.resolve("src/templates/releases.jsx");
    const repoIds = Object.keys(repositories).map(function (key) { return repositories[key] })
    resolve(
      graphql(
        `
        query ($repos: [ID!]!) {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  title
                  category
                  type
                  source
                  next
                  prev
                }
                fields {
                  slug
                }
              }
            }
          }
          github {
            nodes(ids: $repos) {
              id
              ... on GitHub_Repository {
                url
                name
                releases(first: 2, orderBy: {field: CREATED_AT, direction: DESC}) {
                  edges {
                    node {
                      name
                      description
                      url
                      tag {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {repos: repoIds}
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off"*/
          console.log(result.errors);
          reject(result.errors);
        }

        // Releases Page
        createPage({
          path: `/releases`,
          component: releasesPage,
          context: {
            slug: 'releases',
            repositories: result.data.github.nodes,
            tocRepos: result.data.github.nodes
          }
        })
        // Releases: Indiviual Repositories
        result.data.github.nodes.forEach(repository => {
          createPage({
            path: `/releases/${repository.name.replace(/\s+/g, '-').toLowerCase().replace('uport-', 'u-port-')}`,
            component: releasesPage,
            context: {
              slug: `${repository.name.replace(/\s+/g, '-').toLowerCase().replace('uport-', 'u-port-')}`,
              repositories: [repository],
              tocRepos: result.data.github.nodes
            }
          })
        })

        //const tagSet = new Set();
        const categorySet = new Set();
        // console.log(result.data.allMarkdownRemark.edges.length)
        // console.log(JSON.stringify(result.data.allMarkdownRemark.edges))
        const articleList = {};
        result.data.allMarkdownRemark.edges.forEach(edge => {
          const { source } = edge.node.frontmatter;
          let { prev, next } = edge.node.frontmatter;
          if(next) {
            const nextNode = result.data.allMarkdownRemark.edges.find(e =>
              e.node.frontmatter.source == next);
            if(nextNode) {
              next = {
                url: nextNode.node.fields.slug,
                title: nextNode.node.frontmatter.title
              };
            } else {
              next = null;
            }
          }
          if(prev) {
            const prevNode = result.data.allMarkdownRemark.edges.find(e =>
              e.node.frontmatter.source == prev);
            if(prevNode) {
              prev = {
                url: prevNode.node.fields.slug,
                title: prevNode.node.frontmatter.title
              };
            } else {
              prev = null;
            }
          }
          if(source && (!prev || !next)) {
            const matches = source.match(/(\/|\\)([^/\\]+)-(\d+)\.md$/i);
            if(matches && matches.length == 4) {
              const basePath = source.substr(0, matches.index + 1);
              const baseName = matches[2];
              const num = parseInt(matches[3], 10);
              if(!next) {
                next = `${basePath}${baseName}-${num + 1}.md`;
                const nextNode = result.data.allMarkdownRemark.edges.find(e =>
                  e.node.frontmatter.source == next);
                if(nextNode) {
                  next = {
                    url: nextNode.node.fields.slug,
                    title: nextNode.node.frontmatter.title
                  };
                } else {
                  next = null;
                }
              }
              if(!prev && num >= 0) {
                prev = `${basePath}${baseName}-${num - 1}.md`;
                const prevNode = result.data.allMarkdownRemark.edges.find(e =>
                  e.node.frontmatter.source == prev);
                if(prevNode) {
                  prev = {
                    url: prevNode.node.fields.slug,
                    title: prevNode.node.frontmatter.title
                  };
                } else {
                  prev = null;
                }
              }
            }
          }
          articleList[edge.node.fields.slug] = {};
          if(next)
            articleList[edge.node.fields.slug].next = next;
          if(prev)
            articleList[edge.node.fields.slug].prev = prev;
        });

        result.data.allMarkdownRemark.edges.forEach(edge => {
          // if (edge.node.frontmatter.tags) {
          //   edge.node.frontmatter.tags.forEach(tag => {
          //     tagSet.add(tag);
          //   });
          // }
          const linkedArticles = articleList[edge.node.fields.slug] || {};

          if (edge.node.frontmatter.category) {
            categorySet.add(edge.node.frontmatter.category);
          }
         //console.log(JSON.stringify(edge.node.frontmatter))
          if (['overview'].includes(edge.node.frontmatter.type)) {
            //console.log(JSON.stringify(edge.node.frontmatter));
            //console.log(edge.node.fields.slug);
            const path = edge.node.fields.slug.replace(/^\/overview\/overview$/, '/overview');
            createPage({
              path,
              component: overviewPage,
              context: {
                slug: edge.node.fields.slug,
                ...linkedArticles
              }
            });
          }

          if (['guide', 'content', 'tutorial', 'reference', 'guides', 'tutorials', 'landing'].includes(edge.node.frontmatter.type)) {
              //console.log(JSON.stringify(edge.node.frontmatter));
              //console.log(edge.node.fields.slug);
              createPage({
                  path: edge.node.fields.slug,
                  component: contentPage,
                  context: {
                      category: edge.node.frontmatter.category,
                      slug: edge.node.fields.slug,
                      ...linkedArticles
                  }
              });
          }
        });

        // const tagList = Array.from(tagSet);
        // tagList.forEach(tag => {
        //   createPage({
        //     path: `/tags/${_.kebabCase(tag)}/`,
        //     component: tagPage,
        //     context: {
        //       tag
        //     }
        //   });
        // });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          });
        });
      })
    );
  });
};

// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//   switch (stage) {
//     case `build-javascript`:
//       actions.setWebpackConfig({
//         plugins: [],
//       });
//   }
// }

// exports.onCreateBabelConfig = ({ actions }) => {
//   actions.setBabelPlugin({
//     name: '@babel/plugin-transform-regenerator'
//   })
// }
