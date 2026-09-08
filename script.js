const usersStorageKey = "cinemaNexusUsers";

const registerModal = document.getElementById("registerModal");
const loginModal = document.getElementById("loginModal");
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");
const usersTableBody = document.getElementById("usersTableBody");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const closeLoginModal = document.getElementById("closeLoginModal");

function getUsers() {
    const savedUsers = localStorage.getItem(usersStorageKey);
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    return Array.isArray(users) ? users : [];
}

function saveUsers(users) {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function renderUsers() {
    if (!usersTableBody) return;

    const users = getUsers();
    usersTableBody.innerHTML = "";

    if (users.length === 0) {
        usersTableBody.innerHTML =
            '<tr><td class="u7" colspan="3">No registered members yet</td></tr>';
        return;
    }

    for (let i = 0; i < users.length; i++) {
        const row = document.createElement("tr");
        const numberCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const emailCell = document.createElement("td");

        numberCell.textContent = i + 1;
        nameCell.textContent = users[i].fullName;
        emailCell.textContent = users[i].email;

        numberCell.className = "u7";
        nameCell.className = "u7";
        emailCell.className = "u7";

        row.append(numberCell, nameCell, emailCell);
        usersTableBody.append(row);
    }
}

document.querySelectorAll('[data-modal-open="register"]')
    .forEach(function (button) {
        button.onclick = function () {
            document.getElementById("registrationMessage").textContent = "";
            registerModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        };
    });

document.querySelectorAll('[data-modal-open="login"]')
    .forEach(function (button) {
        button.onclick = function () {
            document.getElementById("loginMessage").textContent = "";
            loginModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        };
    });

if (closeRegisterModal) {
    closeRegisterModal.onclick = function () {
        registerModal.style.display = "none";
        document.body.style.overflow = "";
    };
}

if (closeLoginModal) {
    closeLoginModal.onclick = function () {
        loginModal.style.display = "none";
        document.body.style.overflow = "";
    };
}

if (registrationForm) {
    registrationForm.onsubmit = function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const error = document.getElementById("registrationMessage");

        if (password !== confirmPassword) {
            error.textContent = "Passwords do not match.";
            error.style.color = "red";
            return;
        }

        const users = getUsers();

        users.push({
            fullName: fullName,
            email: email,
            password: password
        });

        saveUsers(users);
        renderUsers();
        registrationForm.reset();

        registerModal.style.display = "none";
        document.body.style.overflow = "";
    };
}

if (loginForm) {
    loginForm.onsubmit = function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const error = document.getElementById("loginMessage");
        const users = getUsers();

        let foundUser = null;

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                foundUser = users[i];
                break;
            }
        }

        if (!foundUser) {
            error.textContent = "Incorrect email or password.";
            error.style.color = "red";
            return;
        }

        loginForm.reset();
        loginModal.style.display = "none";
        document.body.style.overflow = "";
    };
}

renderUsers();