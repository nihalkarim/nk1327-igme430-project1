/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const recipeObject = __webpack_require__(/*! ../src/jsonResponses */ \"./src/jsonResponses.js\");\n\nconst handleResponse = async (response) => {\n    const content = document.querySelector('body');\n\n    let obj = await response.json();\n\n    content.innerHTML = `<p>${obj}</p>`;\n\n    // let recipeDiv = document.createElement('div');\n    // let recipeImage = document.createElement('img');\n    // let recipeName = document.createElement('h3');\n\n    // recipeDiv.className = 'rounded-lg border-2 bg-slate-300 h-1/4 min-h-1/4';\n    // //recipeImage.src = recipeObject;\n    // recipeName.innerHTML = recipeObject;\n\n    //content.innerHTML += `<p>${obj}</p>`;\n};\n\nconst sendPost = async (recipeForm) => {\n    const nameAction = recipeForm.getAttribute('action');\n    const nameMethod = recipeForm.getAttribute('method');\n\n    const name = recipeForm.querySelector('#nameField').value;\n    const description = recipeForm.querySelector('#descriptionField').value;\n    const imageField = recipeForm.querySelector('#imageField').value;\n    const prepTimeHours = recipeForm.querySelector('#prepTimeHours').value;\n    const prepTimeMin = recipeForm.querySelector('#prepTimeMin').value;\n    const cookTimeHours = recipeForm.querySelector('#cookTimeHours').value;\n    const cookTimeMin = recipeForm.querySelector('#cookTimeMin').value;\n    const difficulty = recipeForm.querySelector('#difficultyField').value;\n    const rating = recipeForm.querySelector('#ratingField').value;\n    const ingredients = recipeForm.querySelector('#ingredientsField').value;\n    const steps = recipeForm.querySelector('#stepsField').value;\n\n    const formData = `name=${name}&description=${description}&imageField=${imageField}&prepTimeHours=${prepTimeHours}&prepTimeMin=${prepTimeMin}&cookTimeHours=${cookTimeHours}&cookTimeMin=${cookTimeMin}&difficulty=${difficulty}&rating=${rating}&ingredients=${ingredients}&steps=${steps}`;\n\n    const response = await fetch(nameAction, {\n        method: nameMethod,\n        headers: {\n            'Accept': 'application/json',\n            'Content-Type': 'application/x-www-form-urlencoded',\n        },\n        body: formData,\n    });\n\n    handleResponse(response);\n};\n\n// const requestUpdate = async (recipeForm) => {\n//     const url = recipeForm.querySelector('#urlField').value;\n//     const method = recipeForm.querySelector('#methodSelect').value;\n\n//     // 'method,' is equivalent to method: method,\n//     const response = await fetch(url, {\n//         method,\n//         headers: {\n//             'Accept': 'application/json'\n//         }\n//     });\n\n//     handleResponse(response);\n// };\n\nconst renderRecipe = () => {\n\n}\n\n\nconst init = () => {\n    const recipeForm = document.querySelector('#recipeForm');\n    const addRecipe = (e) => {\n        e.preventDefault();\n        sendPost(recipeForm);\n\n        return false;\n    }\n    recipeForm.addEventListener('submit', addRecipe);\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://nk1327-igme430-project1/./client/client.js?");

/***/ }),

/***/ "./src/jsonResponses.js":
/*!******************************!*\
  !*** ./src/jsonResponses.js ***!
  \******************************/
/***/ ((module) => {

eval("const recipes = {};\n\nconst respond = (request, response, status, object) => {\n  response.writeHead(status, { 'Content-Type': 'application/json' });\n  response.write(JSON.stringify(object));\n  response.end();\n};\n\nconst respondMeta = (request, response, status) => {\n  response.writeHead(status, { 'Content-Type': 'application/json' });\n  response.end();\n};\n\nconst getRecipes = (request, response) => {\n  const responseJSON = { recipes };\n\n  respond(request, response, 200, responseJSON);\n};\n\nconst getRecipesMeta = (request, response) => {\n  return respondMeta(request, response, 200);\n};\n\nconst addRecipe = (request, response, body) => {\n  const responseJSON = {\n    message: 'Recipe name and image link are required',\n  };\n\n  console.log(body.name);\n  console.log(body.image);\n\n  if (!body.name || !body.image) {\n    responseJSON.id = 'addRecipeMissingParams';\n    return respond(request, response, 400, responseJSON);\n  }\n\n  let responseCode = 204;\n\n  if (!recipes[body.name]) {\n    responseCode = 201;\n    recipes[body.name] = { name: body.name, }\n  }\n\n  recipes[body.name].description = body.description;\n  recipes[body.name].image = body.image;\n  recipes[body.name].prepTime = body.prepTime;\n  recipes[body.name].cookTime = body.cookTime;\n  recipes[body.name].difficulty = body.difficulty;\n  recipes[body.name].rating = body.rating;\n  recipes[body.name].ingredients = body.ingredients;\n  recipes[body.name].steps = body.steps;\n\n  if (responseCode === 201) {\n    responseJSON.message = 'Created successfully';\n    // htmlHandler.getIndex;\n    return respond(request, response, responseCode, responseJSON);\n  }\n\n  return respond(request, response, responseCode);\n};\n\nconst notFound = (request, response, acceptedTypes) => {\n  const responseJSON = {\n    message: 'The page you are looking for was not found.',\n    id: 'notFound',\n  };\n\n  return respond(request, response, 404, responseJSON);\n};\n\nconst notFoundMeta = (request, response) => {\n  return respondMeta(request, response, 404);\n};\n\nmodule.exports = {\n  getRecipes,\n  getRecipesMeta,\n  addRecipe,\n  notFound,\n  notFoundMeta\n};\n\n\n//# sourceURL=webpack://nk1327-igme430-project1/./src/jsonResponses.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/client.js");
/******/ 	
/******/ })()
;