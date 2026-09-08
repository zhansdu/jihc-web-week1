const form = document.getElementById("registrationForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

  const user = {
    username: name,
    email: email,
    phone: phone,
    password: password,
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "/index.html";
  console.log("Registered userss:", users);
});
