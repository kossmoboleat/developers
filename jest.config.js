const { defaults } = require('jest-config')

module.exports = {
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '.cache', 'repos', 'plugins', 'content', 'markdown'],
  verbose: true
}
