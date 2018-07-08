const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

// downloadPage will take a url, download the html and save the html to a file
// first argument is default if CLI argument url value is not provided by the CLI argument (process.argv[2])
const downloadPage = (url='http://nodeprogram.com') => {
  console.log('downloading', url);
  // fetchPage takes the URL and a callback function and makes a GET request. The html of the page is sent as the second argument of the callback function once the response has been completed.
  const fetchPage = (urlF, callback) => {
    http.get(urlF, (response) => {
      let buff = '';
      response.on('data', (chunk) => {
        buff += chunk;
      });
      response.on('end', () => {
        callback(null, buff);
      });
    }).on('error', (error) => {
      console.error(`Got error: ${error.message}`);
      callback(error);
    });
  }

  // logic to create the files go inside the callback because the GET method is asynchronous. 
  // mkdirSync and writeFileSync methods are synchronous.(do not use when run by multiple clients)
  const folderName = uuidv1();
  fs.mkdirSync(folderName);

  fetchPage(url, (error, data) => {
    if (error) {return console.log(error)};
    fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
    fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data);
    console.log('downloading is done in folder ', folderName);
  });
}

downloadPage(process.argv[2]); // CLI argument -- in terminal: node is 0 index, document(download.js) is 1 index, url is 2 index

// example test -- run: node download.js http://www.google.com  --> returns google
// example test -- run: node download.js  --> returns default (nodeprogram)