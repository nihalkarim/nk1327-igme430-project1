/**
 * the functions return the html, css, and js page
 */

const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const cssOutput = fs.readFileSync(`${__dirname}/../dist/output.css`);
const cssStyle = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const recipeForm = fs.readFileSync(`${__dirname}/../hosted/addNew.html`);
const bundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getOutputCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssOutput);
  response.end();
};

const getStyleCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssStyle);
  response.end();
};

const getBundle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(bundle);
  response.end();
};

const addNew = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(recipeForm);
  response.end();
};

module.exports = {
  getIndex,
  getOutputCss,
  getStyleCss,
  getBundle,
  addNew,
};
