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

  respond(request, response, 200, responseJSON);
};

const getRecipesMeta = (request, response) => respondMeta(request, response, 200);

const addRecipe = (request, response, body) => {
  const responseJSON = {
    message: 'Recipe name and image link are required',
  };

  if (!body.name || !body.image) {
    responseJSON.id = 'addRecipeMissingParams';
    return respond(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!recipes[body.name]) {
    responseCode = 201;
    recipes[body.name] = { name: body.name };
  }

  recipes[body.name].description = body.description;
  recipes[body.name].image = body.image;
  recipes[body.name].prepTime = body.prepTime;
  recipes[body.name].cookTime = body.cookTime;
  recipes[body.name].difficulty = body.difficulty;
  recipes[body.name].rating = body.rating;
  recipes[body.name].ingredients = body.ingredients;
  recipes[body.name].steps = body.steps;

  if (responseCode === 201) {
    responseJSON.message = 'Created successfully';
    // htmlHandler.getIndex;
    return respond(request, response, responseCode, responseJSON);
  }

  return respond(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respond(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondMeta(request, response, 404);

module.exports = {
  getRecipes,
  getRecipesMeta,
  addRecipe,
  notFound,
  notFoundMeta,
};
