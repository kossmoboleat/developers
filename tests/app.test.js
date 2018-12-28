const puppeteer = require('puppeteer')

let browser
let page
let baseURL = 'http://localhost:8000'
const width = 1920
const height = 1080

const linkCache = new Map()

const isDebugging = () => {
  const debuggingMode = {
    headless: false,
    slowMo: 250,
    devtools: true
  }
  return process.env.NODE_ENV === 'debug' ? debuggingMode : {}
}

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  await page.goto(baseURL)
  page.setViewport({ width: width, height: height })
})

describe('Homepage loads', () => {
  test('Main heading displays correctly', async() => {
    await page.waitForSelector('.hero-title')
    const html = await page.$eval('.hero-title', e => e.innerHTML)
    expect(html).toBe('Build User-Centric Ethereum Apps')
  }, 20000)
})

describe('Crawl for broken links ', () => {
  test('Checking Nav, ToC and Content', async () => {
    let isValid;
    await page.goto(baseURL, {waitUntil: 'networkidle2'})
    let navLinks = await page.evaluate(() => Array.from(document.body.querySelectorAll('#topNav a[href]'), ({ href }) => href))
    for (const navLink of navLinks) {
      isValid = await checkLink(navLink)
      if(!isValid)
        console.log(`[ERR] ${navLink}`)
      else
        console.log(`[OK]  ${navLink}`)
      expect(isValid).toBe(true)
      if (navLink.indexOf(baseURL) >= 0) {
        // await page.goto(navLink, {waitUntil: 'networkidle2'})
        let tocLinks = await page.evaluate(() => Array.from(document.body.querySelectorAll('#toc a[href]'), ({ href }) => href))
        for (const tocLink of tocLinks) {
          isValid = await checkLink(tocLink)
          if(!isValid)
            console.log(`[ERR] ToC Link broken: ${tocLink} on ${navLink}`)
          else
            console.log(`[OK]  ${tocLink}`)
          expect(isValid).toBe(true)
          // await page.goto(tocLink, {waitUntil: 'networkidle2'})
          let contentLinks = await page.evaluate(() => Array.from(document.body.querySelectorAll('.docSearch-content a[href]'), ({ href }) => href))
          for (const contentLink of contentLinks) {
            isValid = await checkLink(contentLink)
            if(!isValid)
              console.log(`[ERR] Content Link broken: ${contentLink} on ${tocLink}`)
            else
              console.log(`[OK]  ${contentLink}`)
            expect(isValid).toBe(true)
          }
        }
      }
    }
  }, 180000)

  test('Checking footer', async () => {
    await page.goto(baseURL, {waitUntil: 'networkidle2'})
    let footerLinks = await page.evaluate(() => Array.from(document.body.querySelectorAll('footer a[href]'), ({ href }) => href))
    for (const footerLink of footerLinks) {
      expect(await checkLink(footerLink)).toBe(true)
    }
  }, 60000)

  test('Checking homepage content', async () => {
    await page.goto(baseURL, {waitUntil: 'networkidle2'})
    let homepageLinks = await page.evaluate(() => Array.from(document.body.querySelectorAll('.body-container a[href], .home-hero a[href]'), ({ href }) => href))
    for (const homepageLink of homepageLinks) {
      expect(await checkLink(homepageLink)).toBe(true)
    }
  }, 60000)
})

const checkLink = async (url) => {
  if(url.indexOf('#') >= 0)
    url = url.slice(0, url.indexOf('#'))
  if(linkCache.has(url))
    return linkCache.get(url)
  let response = await page.goto(url, {waitUntil: 'networkidle2'})
  let isValid = true;
  if (url.indexOf(baseURL) < 0) {
    isValid = response._status === 200
  } else {
    isValid = await page.$eval('img.brand-img', el => el ? true : false)
  }
  linkCache.set(url, isValid)
  return isValid
}

afterAll(() => {
  if (isDebugging()) {
    browser.close()
  }
})
