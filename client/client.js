const recipeObject = require('../src/jsonResponses');

const handleResponse = async (response) => {
    const content = document.querySelector('body');

    let obj = await response.json();

    content.innerHTML = `<p>${obj}</p>`;

    // let recipeDiv = document.createElement('div');
    // let recipeImage = document.createElement('img');
    // let recipeName = document.createElement('h3');

    // recipeDiv.className = 'rounded-lg border-2 bg-slate-300 h-1/4 min-h-1/4';
    // //recipeImage.src = recipeObject;
    // recipeName.innerHTML = recipeObject;

    //content.innerHTML += `<p>${obj}</p>`;
};

const sendPost = async (recipeForm) => {
    const nameAction = recipeForm.getAttribute('action');
    const nameMethod = recipeForm.getAttribute('method');

    const name = recipeForm.querySelector('#nameField').value;
    const description = recipeForm.querySelector('#descriptionField').value;
    const imageField = recipeForm.querySelector('#imageField').value;
    const prepTimeHours = recipeForm.querySelector('#prepTimeHours').value;
    const prepTimeMin = recipeForm.querySelector('#prepTimeMin').value;
    const cookTimeHours = recipeForm.querySelector('#cookTimeHours').value;
    const cookTimeMin = recipeForm.querySelector('#cookTimeMin').value;
    const difficulty = recipeForm.querySelector('#difficultyField').value;
    const rating = recipeForm.querySelector('#ratingField').value;
    const ingredients = recipeForm.querySelector('#ingredientsField').value;
    const steps = recipeForm.querySelector('#stepsField').value;

    const formData = `name=${name}&description=${description}&imageField=${imageField}&prepTimeHours=${prepTimeHours}&prepTimeMin=${prepTimeMin}&cookTimeHours=${cookTimeHours}&cookTimeMin=${cookTimeMin}&difficulty=${difficulty}&rating=${rating}&ingredients=${ingredients}&steps=${steps}`;

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

const renderRecipe = () => {

}


const init = () => {
    const recipeForm = document.querySelector('#recipeForm');
    const addRecipe = (e) => {
        e.preventDefault();
        sendPost(recipeForm);

        return false;
    }
    recipeForm.addEventListener('submit', addRecipe);
};

window.onload = init;