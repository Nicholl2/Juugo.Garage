document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value;

  const messageEl = document.getElementById("message");

  if (!username || !password) {
    messageEl.style.color = "red";
    messageEl.textContent = "Username dan password tidak boleh kosong.";
    return;
  }

 
  localStorage.setItem("juugo_username", username);
  localStorage.setItem("juugo_password", password);

  messageEl.style.color = "green";
  messageEl.textContent = "Register berhasil! Mengarahkan ke halaman utama...";

  setTimeout(() => {
    window.location.href = "../landing_page/index.html";
  }, 1500);
});
