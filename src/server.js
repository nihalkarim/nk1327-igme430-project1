const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/**
 * Parses the request body.Pushes the data to the body in chunks. Check if there aare errors
 * @param {*} request: request
 * @param {*} response: sets response for user
 * @param {*} callback: callback function for server
 */
const parseBody = (request, response, callback) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();

    const bodyParams = query.parse(bodyString);

    callback(request, response, bodyParams);
  });
};

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/output.css': htmlHandler.getOutputCss,
    '/style.css': htmlHandler.getStyleCss,
    '/getRecipes': jsonHandler.getRecipes,
    '/addNew': htmlHandler.addNew,
    '/bundle.js': htmlHandler.getBundle,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getRecipes': jsonHandler.getRecipesMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  POST: {
    '/addRecipe': (request, response) => parseBody(request, response, jsonHandler.addRecipe),
    notFound: jsonHandler.notFoundMeta,
  },
};

/**
 * Deals with the requests made to server
 * @param {*} request
 * @param {*} response
 * @returns
 */
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response);
  }

  return true;
  // console.log(`URL: ${request.url}`);
  // console.dir(parsedUrl);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
