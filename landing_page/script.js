function goToRegister() {
  window.location.href = "../halaman_reg/index.html";
}

function login() {
  const inputUsername = document.getElementById("username").value.trim();
  const storedUsername = localStorage.getItem("juugo_username");
  const storedPassword = localStorage.getItem("juugo_password");

  if (!inputUsername) {
    showLoginMessage("Silakan masukkan username!", "red");
    return;
  }

  if (inputUsername === storedUsername) {
    showLoginMessage("Login berhasil! Mengarahkan ke menu utama...", "green");

    setTimeout(() => {
      window.location.href = "../menu_utama/index.html";
    }, 1500);
  } else {
    showLoginMessage("Username tidak ditemukan. Silakan daftar dulu!", "red");
  }
}

function showLoginMessage(msg, color) {
  let msgBox = document.getElementById("loginMessage");
  if (!msgBox) {
    msgBox = document.createElement("p");
    msgBox.id = "loginMessage";
    msgBox.style.marginTop = "10px";
    msgBox.style.fontWeight = "bold";
    document.querySelector(".form-container").appendChild(msgBox);
  }
  msgBox.textContent = msg;
  msgBox.style.color = color;
}
