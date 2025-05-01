function refreshPage() {
    location.reload();
  }
  
  function submitReview(event) {
    event.preventDefault();
    const name = document.getElementById("reviewName").value.trim();
    const text = document.getElementById("reviewText").value.trim();
  
    if (!name || !text) {
      alert("Isi nama dan review terlebih dahulu!");
      return;
    }
  
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");
    reviewItem.innerHTML = `<strong>${name}:</strong> ${text}`;
    document.getElementById("reviewList").appendChild(reviewItem);
  
    const existing = JSON.parse(localStorage.getItem("juugoReviews") || "[]");
    existing.push({ name, text });
    localStorage.setItem("juugoReviews", JSON.stringify(existing));
  
    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";
  }
  
  function logout() {
    localStorage.removeItem("juugo_username");
    localStorage.removeItem("juugo_password");
    alert("Logout berhasil!");
    window.location.href = "../landing_page/index.html";
  }
  
  function triggerLogoutAnimation() {
    const logo = document.querySelector(".interactive-logo");
    logo.style.transition = "all 0.5s ease";
    logo.style.transform = "scale(1.3)";
    logo.style.color = "#ff5722";
  
    setTimeout(() => {
      logout();
    }, 700);
  }  

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  }
  
  window.onload = () => {
    const stored = JSON.parse(localStorage.getItem("juugoReviews") || "[]");
    stored.forEach(({ name, text }) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review-item");
      reviewItem.innerHTML = `<strong>${name}:</strong> ${text}`;
      document.getElementById("reviewList").appendChild(reviewItem);
    });
  
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  
    document.getElementById("reviewForm").addEventListener("submit", submitReview);
  };
  
