function goToRegister() {
    window.location.href = "../halaman_reg/index.html";
  }
  
  function login() {
    alert("Fitur login belum tersedia 😅");
  }

function login() {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter your username to login.');
    } else {
        alert(`Logged in as ${username}!`);
    }
}
