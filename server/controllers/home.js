'use strict';
const path = require('path');

function index(req, res) {
  const frontend = path.resolve(__dirname, '../..', 'testFrontend.html');
  console.log('send frontend ' + frontend);
  
  res.sendFile(frontend);
}

module.exports = {
  index: index
};
