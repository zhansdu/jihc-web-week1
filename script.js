const usersStorageKey = "cinemaNexusUsers";

const registerModal = document.getElementById("registerModal");
const loginModal = document.getElementById("loginModal");
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");
const usersTableBody = document.getElementById("usersTableBody");

const openRegisterModal = document.getElementById("openRegisterModal");
const openLoginModal = document.getElementById("openLoginModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const closeLoginModal = document.getElementById("closeLoginModal");

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem(usersStorageKey));

        if (Array.isArray(users)) {
            return users;
        }

        return [];
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function openRegisterForm() {
    if (registerModal) {
        registerModal.style.display = "flex";
        registerModal.setAttribute("aria-hidden", "false");
    }
}

function closeRegisterForm() {
    if (registerModal) {
        registerModal.style.display = "none";
        registerModal.setAttribute("aria-hidden", "true");
    }
}

function openLoginForm() {
    if (loginModal) {
        loginModal.style.display = "flex";
        loginModal.setAttribute("aria-hidden", "false");
    }
}

function closeLoginForm() {
    if (loginModal) {
        loginModal.style.display = "none";
        loginModal.setAttribute("aria-hidden", "true");
    }
}

function showMessage(elementId, message, color) {
    const messageElement = document.getElementById(elementId);

    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = color;
    }
}

function renderUsers() {
    if (!usersTableBody) {
        return;
    }

    const users = getUsers();
    usersTableBody.innerHTML = "";

    if (users.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.className = "u7";
        cell.colSpan = 3;
        cell.textContent = "No registered members yet";

        row.appendChild(cell);
        usersTableBody.appendChild(row);
        return;
    }

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const row = document.createElement("tr");
        const numberCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const emailCell = document.createElement("td");

        numberCell.className = "u7";
        nameCell.className = "u7";
        emailCell.className = "u7";

        numberCell.textContent = i + 1;
        nameCell.textContent = user.fullName;
        emailCell.textContent = user.email;

        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        usersTableBody.appendChild(row);
    }
}

if (openRegisterModal) {
    openRegisterModal.onclick = function () {
        showMessage("registrationMessage", "", "");
        openRegisterForm();
    };
}

if (openLoginModal) {
    openLoginModal.onclick = function () {
        showMessage("loginMessage", "", "");
        openLoginForm();
    };
}

document.querySelectorAll('[data-modal-open="register"]').forEach(function (button) {
    button.onclick = function () {
        showMessage("registrationMessage", "", "");
        openRegisterForm();
    };
});

document.querySelectorAll('[data-modal-open="login"]').forEach(function (button) {
    button.onclick = function () {
        showMessage("loginMessage", "", "");
        openLoginForm();
    };
});

if (closeRegisterModal) {
    closeRegisterModal.onclick = function () {
        closeRegisterForm();
    };
}

if (closeLoginModal) {
    closeLoginModal.onclick = function () {
        closeLoginForm();
    };
}

if (registerModal) {
    registerModal.onclick = function (event) {
        if (event.target === registerModal) {
            closeRegisterForm();
        }
    };
}

if (loginModal) {
    loginModal.onclick = function (event) {
        if (event.target === loginModal) {
            closeLoginForm();
        }
    };
}

if (registrationForm) {
    registrationForm.onsubmit = function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            showMessage("registrationMessage", "Passwords do not match.", "red");
            return;
        }

        const users = getUsers();

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                showMessage("registrationMessage", "An account with this email already exists.", "red");
                return;
            }
        }

        const newUser = {
            fullName: fullName,
            email: email,
            password: password
        };

        users.push(newUser);
        saveUsers(users);
        renderUsers();
        registrationForm.reset();
        showMessage("registrationMessage", "Account created successfully.", "#54d66a");
    };
}

if (loginForm) {
    loginForm.onsubmit = function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const users = getUsers();
        let foundUser = null;

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                foundUser = users[i];
            }
        }

        if (foundUser === null) {
            showMessage("loginMessage", "Incorrect email or password.", "red");
            return;
        }

        loginForm.reset();
        showMessage("loginMessage", "Welcome back, " + foundUser.fullName + ".", "#54d66a");
    };
}

document.onkeydown = function (event) {
    if (event.key === "Escape") {
        closeRegisterForm();
        closeLoginForm();
    }
};

renderUsers();
