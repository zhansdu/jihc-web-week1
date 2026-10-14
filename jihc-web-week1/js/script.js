let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

const modal = document.getElementById("infoModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalOkBtn = document.getElementById("modalOkBtn");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const usersTableBody = document.getElementById("usersTableBody");

function saveUsers() {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function showMessage(id, text, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = "message " + type;
}

// modal ашу/жабу
if (openModalBtn) {
  openModalBtn.onclick = () => modal.classList.add("show");
}

if (closeModalBtn) {
  closeModalBtn.onclick = () => modal.classList.remove("show");
}

if (modalOkBtn) {
  modalOkBtn.onclick = () => modal.classList.remove("show");
}

if (modal) {
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  };
}

// тіркелу формасы
if (registerForm) {
  registerForm.onsubmit = (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      showMessage("registerMessage", "Passwords do not match.", "error");
      return;
    }

    users.push({
      fullName,
      email,
      password,
      registeredAt: new Date().toLocaleString(),
    });

    saveUsers();
    registerForm.reset();
    showMessage(
      "registerMessage",
      "Registration completed successfully.",
      "success",
    );
  };
}

// кіру формасы
if (loginForm) {
  loginForm.onsubmit = (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const found = users.some(
      (u) => u.email === email && u.password === password,
    );

    if (found) {
      showMessage("loginMessage", "Login successful.", "success");
      loginForm.reset();
    } else {
      showMessage("loginMessage", "Wrong email or password.", "error");
    }
  };
}

// қолданушылар кестесі
if (usersTableBody) {
  if (users.length === 0) {
    usersTableBody.innerHTML =
      "<tr><td colspan='4'>No registered people yet.</td></tr>";
  } else {
    let rows = "";
    users.forEach((user, i) => {
      rows += `
        <tr>
          <td>${i + 1}</td>
          <td>${user.fullName}</td>
          <td>${user.email}</td>
          <td>${user.registeredAt}</td>
        </tr>
      `;
    });
    usersTableBody.innerHTML = rows;
  }
}
