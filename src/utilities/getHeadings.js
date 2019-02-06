export default (htmlAst) => htmlAst.children
  .filter(c => c.tagName && c.tagName.match(/^h\d$/))
  .map(h => ({
    level: parseInt(h.tagName.slice(1), 10),
    id: h.properties.id
  }))
