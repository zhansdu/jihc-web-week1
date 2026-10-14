const STORAGE_KEY = "perfumeUsers";

function renderLayout() {
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  if (navbar) {
    navbar.innerHTML = `
      <a class="logo" href="index.html">AURA</a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="auth.html">Register / Login</a>
        <a href="users.html">Users</a>
        <a href="empty.html">Empty</a>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `© 2026 AURA Perfume. Simple student project.`;
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function showMessage(elementId, text, type) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.className = "message " + type;
}

function initRegistration() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;

    if (!name || !email || !password) {
      showMessage("registerMessage", "Барлық жолды толтыр.", "error");
      return;
    }

    const users = getUsers();
    const exists = users.some(user => user.email === email);

    if (exists) {
      showMessage("registerMessage", "Бұл email бұрын тіркелген.", "error");
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);

    showMessage("registerMessage", "Тіркелу сәтті аяқталды.", "success");
    form.reset();
  });
}

function initLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();
    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      showMessage("loginMessage", `Қош келдің, ${user.name}!`, "success");
      form.reset();
    } else {
      showMessage("loginMessage", "Email немесе пароль қате.", "error");
    }
  });
}

function renderUsersTable() {
  const body = document.getElementById("usersBody");
  if (!body) return;

  const users = getUsers();

  if (users.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="3">Әзірге тіркелген адам жоқ.</td>
      </tr>
    `;
    return;
  }

  body.innerHTML = users.map((user, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(user.name)}</td>
      <td>${escapeHtml(user.email)}</td>
    </tr>
  `).join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function initModal() {
  const modal = document.getElementById("infoModal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", () => modal.classList.add("open"));
  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("open");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderLayout();
  initRegistration();
  initLogin();
  renderUsersTable();
  initModal();
});