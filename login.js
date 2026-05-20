//[navn] js kode 
//inspireret af youtube video:"Login form validation using javascript" https://www.youtube.com/watch?v=NyM4MCX2eIo
// Brugt AI til hjælp: [Ai], Prompts ligger inde på afleveringsmapppen/ dokumentet
// W3 Schools: 

function login() {

    let usernameInput = document.querySelector('input[name="email"]');
    let passwordInput = document.querySelector('input[name="password"]');

    let username = usernameInput.value;
    let password = passwordInput.value;

    // Standard login 
    let correctUsername = "test";
    let correctPassword = "123";

    // ARRAY
    let users = [
        {
            username: correctUsername,
            password: correctPassword
        }
    ];

    // Boolean datatype
    let loginSuccess = false;

    // LOOP
    for (let i = 0; i < users.length; i++) {

        if (
            username === users[i].username &&
            password === users[i].password
        ) {

            loginSuccess = true;
        }
    }

    // Fjerner gammel besked hvis den findes
    let oldMessage = document.getElementById("message");
    if (oldMessage) {
        oldMessage.remove();
    }

    // Opretter ny besked
    let message = document.createElement("p");
    message.id = "message";
    message.style.marginTop = "10px";

    // Finder knappen
    let button = document.querySelector(".login__button");
    button.parentNode.insertBefore(message, button.nextSibling);

    // Login validation
    if (loginSuccess) {

        message.innerText = "Du er logget ind!";
        message.style.color = "green";

        setTimeout(() => {
            window.location.href = "rejsens-overblik.html";
        }, 1000);

    } else {

        message.innerText = "Forkert adgangskode eller brugernavn";
        message.style.color = "red";
    }

    setTimeout(() => {
        if (message) {
            message.innerText = "";
        }
    }, 2000);

     let passwordField = document.querySelector('input[name="password"]');

    // Sætter beskeden under password feltet
    passwordField.parentNode.insertBefore(message, passwordField.nextSibling);

}