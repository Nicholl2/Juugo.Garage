document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Simulasi proses register
    console.log("Registering user:", username);
  
    alert("Register berhasil untuk user: " + username);
  });
  