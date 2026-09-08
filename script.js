const usersStorageKey = "cinemaNexusUsers";
const get = id => document.getElementById(id);
const registerModal = get("registerModal"), loginModal = get("loginModal");
const registrationForm = get("registrationForm"), loginForm = get("loginForm");
const usersTableBody = get("usersTableBody");
const closeRegisterModal = get("closeRegisterModal"), closeLoginModal = get("closeLoginModal");

function getUsers() {
    const users = JSON.parse(localStorage.getItem(usersStorageKey) || "[]");
    return Array.isArray(users) ? users : [];
}

function saveUsers(users) {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function setModal(modal, open) {
    if (!modal) return;
    modal.style.display = open ? "flex" : "none";
    document.body.style.overflow = open ? "hidden" : "";
}

function message(id, text) {
    const element = get(id);
    if (element) {
        element.textContent = text;
        element.style.color = "red";
    }
}

function renderUsers() {
    if (!usersTableBody) return;
    const users = getUsers();
    usersTableBody.innerHTML = users.length ? "" : '<tr><td class="u7" colspan="3">No registered members yet</td></tr>';
    if (!users.length) return;

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        [index + 1, user.fullName, user.email].forEach(value => {
            const cell = document.createElement("td");
            cell.className = "u7";
            cell.textContent = value;
            row.append(cell);
        });
        usersTableBody.append(row);
    });
}

document.querySelectorAll('[data-modal-open="register"]').forEach(button => {
    button.onclick = () => {
        get("registrationMessage").textContent = "";
        setModal(registerModal, true);
    };
});

document.querySelectorAll('[data-modal-open="login"]').forEach(button => {
    button.onclick = () => {
        get("loginMessage").textContent = "";
        setModal(loginModal, true);
    };
});

if (closeRegisterModal) closeRegisterModal.onclick = () => setModal(registerModal, false);
if (closeLoginModal) closeLoginModal.onclick = () => setModal(loginModal, false);

if (registrationForm) registrationForm.onsubmit = event => {
    event.preventDefault();
    const fullName = get("fullName").value.trim();
    const email = get("registerEmail").value.trim().toLowerCase();
    const password = get("registerPassword").value;
    const confirmPassword = get("confirmPassword").value;

    if (password !== confirmPassword) {
        message("registrationMessage", "Passwords do not match.");
        return;
    }

    const users = getUsers();
    users.push({ fullName, email, password });
    saveUsers(users);
    renderUsers();
    registrationForm.reset();
    setModal(registerModal, false);
};

if (loginForm) loginForm.onsubmit = event => {
    event.preventDefault();
    const email = get("loginEmail").value.trim().toLowerCase();
    const password = get("loginPassword").value;
    const user = getUsers().find(item => item.email === email && item.password === password);

    if (!user) {
        message("loginMessage", "Incorrect email or password.");
        return;
    }
    loginForm.reset();
    setModal(loginModal, false);
};

renderUsers();
