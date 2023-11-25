
// Function to redirect the user to the Instructions page
function redirectToInstructions() {
    const nameInput = document.querySelector('input[name="name"]');
    const nicknameInput = document.querySelector('input[name="nickname"]');

    // Check if the user has entered both the name and nickname
    if (nameInput.value && nicknameInput.value) {
        // If true redirect to the instructions page
        location.href = "./Instructions.html"; 
    } else {
        // If there is an empty field, the webpage shows an alret
        alert('✈️ Please enter your Name and Nickname to play ✈️');
    }
}