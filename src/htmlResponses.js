const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../dist/output.css`);
const recipeForm = fs.readFileSync(`${__dirname}/../hosted/addNew.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const addNew = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(recipeForm);
  response.end();
};

module.exports = {
  getIndex,
  getCss,
  addNew,
};
