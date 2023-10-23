const recipeObject = require('../src/jsonResponses');

/**
 * Redirects user to home page when a recipe is added
 * @param {*} response: response given by the requests
 */
const handleResponse = async (response) => {
    const content = document.querySelector('body');

    let obj = await response.json();

    if (response.status === 201 || response.status === 204) {
        window.location.href = '/';
    }
};

/**
 * Sends a POST request to the server containing the recipe info
 * @param {*} recipeForm: the form sending the request
 */
const sendPost = async (recipeForm) => {
    const nameAction = recipeForm.getAttribute('action');
    const nameMethod = recipeForm.getAttribute('method');

    const name = recipeForm.querySelector('#nameField').value;
    const description = recipeForm.querySelector('#descriptionField').value;
    const image = recipeForm.querySelector('#imageField').value;
    const prepTimeHours = recipeForm.querySelector('#prepTimeHours').value;
    const prepTimeMin = recipeForm.querySelector('#prepTimeMin').value;
    const cookTimeHours = recipeForm.querySelector('#cookTimeHours').value;
    const cookTimeMin = recipeForm.querySelector('#cookTimeMin').value;
    const difficulty = recipeForm.querySelector('#difficultyField').value;
    const rating = recipeForm.querySelector('#ratingField').value;
    const ingredients = recipeForm.querySelector('#ingredientsField').value;
    const steps = recipeForm.querySelector('#stepsField').value;

    const formData = `name=${name}&description=${description}&image=${image}&prepTimeHours=${prepTimeHours}&prepTimeMin=${prepTimeMin}&cookTimeHours=${cookTimeHours}&cookTimeMin=${cookTimeMin}&difficulty=${difficulty}&rating=${rating}&ingredients=${ingredients}&steps=${steps}`;

    const response = await fetch(nameAction, {
        method: nameMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    });

    handleResponse(response);
};

// const requestUpdate = async (recipeForm) => {
//     const url = recipeForm.querySelector('#urlField').value;
//     const method = recipeForm.querySelector('#methodSelect').value;

//     // 'method,' is equivalent to method: method,
//     const response = await fetch(url, {
//         method,
//         headers: {
//             'Accept': 'application/json'
//         }
//     });

//     handleResponse(response);
// };

/**
 * Takes in the recipe object and renders the image and name on the  home page
 * 
 */
const renderRecipe = async () => {
    const response = await fetch('/getRecipes');

    if (response.status !== 200) return;

    const recipesObject = await response.json();
    const recipeArray = Object.values(recipesObject);
    const recipesInnerObject = recipeArray[0];
    const recipes = Object.values(recipesInnerObject);

    if (recipes.length > 0) {
        recipes.forEach(recipe => {
            const recipeGrid = document.querySelector("#recipeGrid");

            let recipeDetailsLink = document.createElement('a');
            recipeDetailsLink.href = '/'

            let recipeDiv = document.createElement('div');
            recipeDiv.id = 'recipeDiv';
            recipeDiv.className = '';

            let recipeName = document.createElement('h2');
            recipeName.innerHTML = recipe.name;
            recipeName.className = 'font-serif';

            let recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.className = "rounded-lg border-2 object-cover";

            recipeDiv.appendChild(recipeImage);
            recipeDiv.appendChild(recipeName);

            recipeGrid.appendChild(recipeDiv);
        });
    }

}

/**
 * Displays the recipe details when user clicks on recipe
 * [WORK IN PROGRESS]
 * @returns 
 */
const displayDetails = async () => {
    const response = await fetch('/getRecipes');

    if (response.status !== 200) return;

    const recipesObject = await response.json();
    const recipeArray = Object.values(recipesObject);
    const recipesInnerObject = recipeArray[0];
    const recipes = Object.values(recipesInnerObject);

    console.log(recipes);

    //name
    let nameDiv = document.querySelector('#nameDiv');
    let name = recipes.name; //change
    nameDiv.appendChild(name);

    let descriptionDiv = document.querySelector('#descriptionDiv');
    let description = recipes.description; //change
    descriptionDiv.appendChild(description);

    let imageDiv = document.querySelector('#imageDiv');
    let image = recipes.image; //change
    imageDiv.appendChild(image);

    let prepTimeDiv = document.querySelector('#prepTimeDiv');
    let prepTime = recipes.prepTime; //change
    prepTimeDiv.appendChild(prepTime);

    let cookTimeDiv = document.querySelector('#cookTimeDiv');
    let cookTime = recipes.cookTime; //change
    cookTimeDiv.appendChild(cookTime);

    let difficultyDiv = document.querySelector('#difficultyDiv');
    let difficulty = recipes.difficulty; //change
    difficulty += " / 10 <i class='fa-solid fa-star'></i>"
    difficultyDiv.appendChild(difficulty);

    let ratingDiv = document.querySelector('#ratingDiv');
    let rating = recipes.rating; //change
    rating += " / 10 <i class='fa-solid fa-star'></i>"
    ratingDiv.appendChild(rating);

    let ingredientsDiv = document.querySelector('#ingredientsDiv');
    let ingredients = recipes.ingredients; //change
    ingredientsDiv.appendChild(ingredients);

    let stepsDiv = document.querySelector('#stepsDiv');
    let steps = recipes.steps; //change
    stepsDiv.appendChild(steps);
}

/**
 * Reders recipe on page init. Prevents submit button from doing its ddefault actions. Adds event listener to the Add Recipe page
 */
const init = () => {
    renderRecipe();

    const recipeForm = document.querySelector('#recipeForm');
    const addRecipe = (e) => {
        e.preventDefault();
        sendPost(recipeForm);

        return false;
    }
    if (recipeForm != null) recipeForm.addEventListener('submit', addRecipe);
};

window.onload = init;