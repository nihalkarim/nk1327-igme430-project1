const recipes = {};

const respond = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getRecipes = (request, response) => {
  const responseJSON = { recipes };

  respondMeta(request, response, 200, responseJSON);
};

const getRecipesMeta = (request, response) => {
  return respondMeta(request, response, 200);
};

const addRecipe = (request, response, body) => {
  const responseJSON = {
    message: 'Recipe name is required',
  };

  if (!body.name) {
    responseJSON.id = 'addRecipeMissingParam';
    return respond(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!recipes[body.name]) {
    responseCode = 201;
    recipes[body.name] = {
      name: body.name,
    }
  }

  recipes[body.name].description = body.description;
  recipes[body.name].prepTime = body.prepTime;
  recipes[body.name].cookTime = body.cookTime;
  recipes[body.name].difficulty = body.difficulty;
  recipes[body.name].rating = body.rating;
  recipes[body.name].ingredients = body.ingredients;
  recipes[body.name].steps = body.steps;

  if (responseCode === 201) {
    responseJSON.message = 'Created successfully';
    return respond(request, response, responseCode, responseJSON);
  }

  return respondMeta(request, response, responseCode);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respond(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  return respondMeta(request, response, 404);
};

module.exports = {
  getRecipes,
  getRecipesMeta,
  addRecipe,
  notFound,
  notFoundMeta
};
