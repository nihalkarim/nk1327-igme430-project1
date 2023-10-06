const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  // grab the accept headers and split into array at commas
  const acceptedTypes = request.headers.accept.split(',');

  const handlerFunction = urlStruct[parsedUrl.pathname];

  if (handlerFunction) {
    handlerFunction(request, response, acceptedTypes, params);
  } else {
    // send to index (but will normally send to 404 page)
    urlStruct.notFound(request, response, acceptedTypes, params);
  }

  console.log(`URL: ${request.url}`);
  console.dir(parsedUrl);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
