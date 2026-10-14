const header = document.getElementById("siteHeader");
const onScroll = () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};
window.addEventListener("scroll", onScroll);
onScroll();

function openModal() {
  document.getElementById("accountModal").classList.add("open");
}
function closeModal() {
  document.getElementById("accountModal").classList.remove("open");
}

// function switchTab(tab) {
//   if (tab === "register") {
//     document.getElementById("tabRegisterBtn").classList.add("active");
//     document.getElementById("tabLoginBtn").classList.remove("active");

//     document.getElementById("registerForm").hidden = false;
//     document.getElementById("loginForm").hidden = true;
//   } else {
//     document.getElementById("tabRegisterBtn").classList.remove("active");
//     document.getElementById("tabLoginBtn").classList.add("active");

//     document.getElementById("registerForm").hidden = true;
//     document.getElementById("loginForm").hidden = false;
//   }
// }

function switchTab(tab) {
  const registerTrue = tab === "register";

  document.getElementById("registerForm").hidden = !registerTrue;
  document.getElementById("loginForm").hidden = registerTrue;

  document
    .getElementById("tabRegisterBtn")
    .classList.toggle("active", registerTrue);
  document
    .getElementById("tabLoginBtn")
    .classList.toggle("active", !registerTrue);
}

function getUsers() {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const message = document.getElementById("registerMessage");

  const users = getUsers();
  const alreadyExists = users.some((user) => user.email === email);

  if (alreadyExists) {
    message.textContent = "That email is already in use.";
    message.className = "modal-message error";
    return;
  }

  users.push({ username, email, password });
  saveUsers(users);

  message.textContent = "Account created! You can log in now.";
  message.className = "modal-message success";
  event.target.reset();
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  const users = getUsers();
  const found = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (found) {
    message.textContent = "Welcome back, " + found.username + "!";
    message.className = "modal-message success";
  } else {
    message.textContent = "Incorrect username or password.";
    message.className = "modal-message error";
  }
}
