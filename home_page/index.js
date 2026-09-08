const nav = document.getElementById("nav");
const footer = document.getElementById("footer");
const login = document.getElementById("login");

if (nav) {
  fetch("../components/nav.html")
    .then((res) => res.text())
    .then((data) => (nav.innerHTML = data));
}

if (footer) {
  fetch("../components/footer.html")
    .then((res) => res.text())
    .then((data) => (footer.innerHTML = data));
}

// USERS LIST FETCH
const usersList = document.getElementById("usersList");

if (usersList) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.forEach((user) => {
    usersList.innerHTML += `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
      </tr>`;
  });
}

// REGISTER MODAL

function openModal() {
  document.getElementById("contactModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("contactModal").style.display = "none";
}

function submitForm() {
  //   event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let usernameInput = document.querySelector(".usernameInput");
  let email = document.querySelector(".email");
  let password = document.querySelector(".password");
  if (!usernameInput || !email || !password) {
    console.error("One or more input elements not found.");
    return;
  }
  if (
    email.value.trim() === "" ||
    password.value.trim() === "" ||
    usernameInput.value.trim() === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }
  const userData = {
    username: usernameInput.value,
    email: email.value,
    password: password.value,
  };
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Thank you for joining the cabin! We will contact you soon.");
  closeModal();
}

// LOGIN FUNCTION
function logIn() {
    document.getElementById("login").style.display = "flex";
}
function closeLoginModal() {
  document.getElementById("login").style.display = "none";
}

function logInBas() {
    // if(event) event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let loginEmail = document.querySelector(".loginEmail");
  let loginName = document.querySelector(".loginName");
  let loginPassword = document.querySelector(".loginPassword");

  let founduser = users.find(
    (user) =>
      user.email === loginEmail.value &&
      user.password === loginPassword.value &&
      user.username === loginName.value,
  );
  if (founduser) {
    alert("Welcome back, " + founduser.username + "!");
  } else {
    alert("Wrong credentials. Please try again.");
  }
}
