function register() {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter a username to register.');
    } else {
        alert(`Registered successfully as ${username}!`);
    }
}

function login() {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter your username to login.');
    } else {
        alert(`Logged in as ${username}!`);
    }
}
