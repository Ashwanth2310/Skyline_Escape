function redirectToInstructions() {
    const nameInput = document.querySelector('input[name="name"]');
    const nicknameInput = document.querySelector('input[name="nickname"]');

    if (nameInput.value && nicknameInput.value) {
        // Both fields are filled, proceed to the other webpage
        location.href = "./Instructions.html"; 
    } else {
        alert('✈️ Please enter your Name and Nickname to play ✈️');
    }
}