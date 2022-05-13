const fs = require('fs/promises')
const url = process.argv[2];

const scraperObject = {
  url,
  async scraper(browser) {
    let page = await browser.newPage();
   
    console.log(`Navigating to ${url}...`);
    await page.goto(`${url}/policies?ref=pf`);

    
    const links = await page.$$eval("a", (anchors) => {
      return anchors.map((anchor) => anchor.textContent);
    });
    if(links.length<=0){
      console.log('Not found')
    }
    await fs.writeFile("links.txt", links.join("\r\n"))
    
  },
};

module.exports = scraperObject;
