const respond = (request, response, status, object, type = 'application/json') => {
  response.writeHead(status, { 'Content-Type': type });

  // dont stringify if xml
  if (type === 'text/xml') {
    response.write(object);
  } else {
    response.write(JSON.stringify(object));
  }
  response.end();
};

const checkIfXml = (request, response, acceptedTypes, responseJSON, status) => {
  // check if xml
  if (acceptedTypes[0] === 'text/xml') {
    let xmlResponse = '<response>';

    xmlResponse += `<message>${responseJSON.message}</message>`;
    if (responseJSON.id) { xmlResponse += `<id>${responseJSON.id}</id>`; }
    xmlResponse += '</response>';

    return respond(request, response, status, xmlResponse, 'text/xml');
  }
  return respond(request, response, status, responseJSON);
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  return checkIfXml(request, response, acceptedTypes, responseJSON, 200);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query param set to true';
    responseJSON.id = 'badRequest';

    return checkIfXml(request, response, acceptedTypes, responseJSON, 400);
  }

  return checkIfXml(request, response, acceptedTypes, responseJSON, 200);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing logged in query parameter set to \'yes\'';
    responseJSON.id = 'unauthorized';

    return checkIfXml(request, response, acceptedTypes, responseJSON, 401);
  }

  return checkIfXml(request, response, acceptedTypes, responseJSON, 200);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This request is forbidden',
    id: 'forbidden',
  };

  return checkIfXml(request, response, acceptedTypes, responseJSON, 403);
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal server error',
    id: 'internal',
  };

  return checkIfXml(request, response, acceptedTypes, responseJSON, 500);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This page is not implemented',
    id: 'notImplemented',
  };

  return checkIfXml(request, response, acceptedTypes, responseJSON, 501);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  checkIfXml(request, response, acceptedTypes, responseJSON, 404);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
