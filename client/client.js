const handleResponse = async (response) => {
    const content = document.querySelector('#content');

    let obj = await response.json();

    if (obj.message) {
        content.innerHTML += `<p>${obj.message}</p>`;
    }
};

const sendPost = async (recipeForm) => {
    const nameAction = recipeForm.getAttribute('action');
    const nameMethod = recipeForm.getAttribute('method');

    const name = recipeForm.querySelector('#nameField').value;
    const description = recipeForm.querySelector('#descriptionField').value;
    const prepTimeHours = recipeForm.querySelector('#prepTimeHours').value;
    const prepTimeMin = recipeForm.querySelector('#prepTimeMin').value;
    const cookTimeHours = recipeForm.querySelector('#cookTimeHours').value;
    const cookTimeMin = recipeForm.querySelector('#cookTimeMin').value;
    const difficulty = recipeForm.querySelector('#difficultyField').value;
    const rating = recipeForm.querySelector('#ratingField').value;
    const ingredients = recipeForm.querySelector('#ingredientsField').value;
    const steps = recipeForm.querySelector('#stepsField').value;

    console.log(name);
    console.log(description);
    console.log(prepTimeHours);
    console.log(prepTimeMin);
    console.log(cookTimeHours);
    console.log(cookTimeMin);
    console.log(difficulty);
    console.log(rating);
    console.log(ingredients);
    console.log(steps);

    const formData = `name=${name}&description=${description}$prepTimeHours=${prepTimeHours}&prepTimeMin=${prepTimeMin}&cookTimeHours=${cookTimeHours}&cookTimeMin=${cookTimeMin}&difficulty=${difficulty}&rating=${rating}&ingredients=${ingredients}&steps=${steps}`;

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

const requestUpdate = async (recipeForm) => {
    const url = userForm.querySelector('#urlField').value;
    const method = userForm.querySelector('#methodSelect').value;

    // 'method,' is equivalent to method: method,
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json'
        }
    });

    //handleResponse(response, true);
    handleResponse(response);

};


const init = () => {
    const nameForm = document.querySelector('#nameForm');
    const addUser = (e) => {
        e.preventDefault();
        sendPost(nameForm);
        return false;
    }
    nameForm.addEventListener('submit', addUser);

    const userForm = document.querySelector('#userForm');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        requestUpdate(userForm);
        //sendPost(nameForm);
        return false;
    });
};

window.onload = init;