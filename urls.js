const fs = require('fs');
const axios = require('axios');
const path = require('path');

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Please provide a filename as an argument');
  process.exit(1);
}

fs.readFile(inputFile, 'utf8', async (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }

  const urls = data.split('\n').filter(url => url.trim() !== '');

  await Promise.all(urls.map(async (url) => {
    try {
      const response = await axios.get(url);
      const hostname = new URL(url).hostname;
      const outputPath = path.join(__dirname, hostname);
      fs.writeFile(outputPath, response.data, (err) => {
        if (err) {
          console.error(`Error writing to file ${hostname}: ${err.message}`);
        } else {
          console.log(`Wrote to ${hostname}`);
        }
      });
    } catch (error) {
      console.error(`Couldn't download ${url}: ${error.message}`);
    }
  }));
});
