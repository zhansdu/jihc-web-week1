function loadNavbar() {
  const modal = document.getElementById("loginModal");

  document.getElementById("modalLink").addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  document.getElementById("close").addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => {
      return user.email === email && user.password === password;
    });

    if (!user) {
      const error = document.getElementById("loginError");

      error.textContent = "Incorrect email or password";
      error.classList.remove("hidden");
      return;
    }
    

    window.location.href = "/index.html";
    window.alert("Successful login");
  });
}
