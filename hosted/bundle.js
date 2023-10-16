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
/***/ (() => {

eval("const handleResponse = async (response) => {\n    const content = document.querySelector('#content');\n\n    let obj = await response.json();\n\n    if (obj.message) {\n        content.innerHTML += `<p>${obj.message}</p>`;\n    }\n};\n\nconst sendPost = async (recipeForm) => {\n    const nameAction = recipeForm.getAttribute('action');\n    const nameMethod = recipeForm.getAttribute('method');\n\n    // const name = recipeForm.querySelector('#nameField').value;\n    // const description = recipeForm.querySelector('#descriptionField').value;\n    // const prepTimeHours = recipeForm.querySelector('#prepTimeHours').value;\n    // const name = recipeForm.querySelector('#nameField').value;\n    // const name = recipeForm.querySelector('#nameField').value;\n    // const name = recipeForm.querySelector('#nameField').value;\n    // const name = recipeForm.querySelector('#nameField').value;\n    // const name = recipeForm.querySelector('#nameField').value;\n\n\n    // recipes[body.name].prepTime = body.prepTime;\n    // recipes[body.name].cookTime = body.cookTime;\n    // recipes[body.name].difficulty = body.difficulty;\n    // recipes[body.name].rating = body.rating;\n    // recipes[body.name].ingredients = body.ingredients;\n    // recipes[body.name].steps = body.steps;\n\n    console.log(name);\n    console.log(age);\n\n    const formData = `name=${name}&age=${age}`;\n\n    const response = await fetch(nameAction, {\n        method: nameMethod,\n        headers: {\n            'Accept': 'application/json',\n            'Content-Type': 'application/x-www-form-urlencoded',\n        },\n        body: formData,\n    });\n\n    handleResponse(response);\n};\n\nconst requestUpdate = async (userForm) => {\n    const url = userForm.querySelector('#urlField').value;\n    const method = userForm.querySelector('#methodSelect').value;\n\n    // 'method,' is equivalent to method: method,\n    const response = await fetch(url, {\n        method,\n        headers: {\n            'Accept': 'application/json'\n        }\n    });\n\n    //handleResponse(response, true);\n    handleResponse(response);\n\n};\n\n\nconst init = () => {\n    const nameForm = document.querySelector('#nameForm');\n    const addUser = (e) => {\n        e.preventDefault();\n        sendPost(nameForm);\n        return false;\n    }\n    nameForm.addEventListener('submit', addUser);\n\n    const userForm = document.querySelector('#userForm');\n    userForm.addEventListener('submit', (e) => {\n        e.preventDefault();\n        requestUpdate(userForm);\n        //sendPost(nameForm);\n        return false;\n    });\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://nk1327-igme430-project1/./client/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;