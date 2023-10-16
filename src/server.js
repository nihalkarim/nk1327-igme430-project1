const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

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
    console.log(body);

    const bodyString = Buffer.concat(body).toString();
    console.log(bodyString);

    const bodyParams = query.parse(bodyString);
    console.log(bodyParams);

    callback(request, response, bodyParams);
  });
}

const urlStruct = {
  'GET': {
    '/': htmlHandler.getIndex,
    '/output.css': htmlHandler.getCss,
    '/getRecipes': jsonHandler.getRecipes,
    '/addRecipe': jsonHandler.addRecipe,
    '/notReal': jsonHandler.notFound,
    notFound: jsonHandler.notFound,
  },
  'HEAD': {
    '/getRecipes': jsonHandler.getRecipesMeta,
    '/notReal': jsonHandler.notFoundMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  'POST': {
    '/addRecipe': (request, response) => parseBody(request, response, jsonHandler.addRecipe),
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if (!urlStruct[request.method]) {
    return urlStruct['HEAD'].notFound(request, response);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }

  //console.log(`URL: ${request.url}`);
  //console.dir(parsedUrl);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
