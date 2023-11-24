function redirectToInstructions() {
    const nameInput = document.querySelector('input[name="name"]');
    const nicknameInput = document.querySelector('input[name="nickname"]');

    if (nameInput.value && nicknameInput.value) {
        // Both fields are filled, proceed to the other webpage
<<<<<<< HEAD
        location.href = "./Instructions.html"; 
=======
        location.href = './Instructions.html'; 
>>>>>>> cdc6398dad0f29a0827289d499a4af441355dced
    } else {
        alert('✈️ Please enter your Name and Nickname to play ✈️');
    }
}
