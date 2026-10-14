const apiUrl = "http://localhost:5001";

const registerModal = document.getElementById("registerModal");
const loginModal = document.getElementById("loginModal");
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");
const usersTableBody = document.getElementById("usersTableBody");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const closeLoginModal = document.getElementById("closeLoginModal");

async function getUsers() {
    const response = await fetch(`${apiUrl}/users`);

    if (!response.ok) {
        throw new Error("Could not load users.");
    }

    return await response.json();
}

async function renderUsers() {
    if (!usersTableBody) return;

    try {
        const users = await getUsers();
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
            nameCell.textContent = users[i].fullName || users[i].username;
            emailCell.textContent = users[i].email || users[i].username;

            numberCell.className = "u7";
            nameCell.className = "u7";
            emailCell.className = "u7";

            row.append(numberCell, nameCell, emailCell);
            usersTableBody.append(row);
        }
    } catch (error) {
        usersTableBody.innerHTML =
            '<tr><td class="u7" colspan="3">Could not load users</td></tr>';
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
    registrationForm.onsubmit = async function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("registrationMessage");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            message.style.color = "red";
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email,
                    fullName: fullName,
                    email: email,
                    password: password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            await renderUsers();
            registrationForm.reset();

            registerModal.style.display = "none";
            document.body.style.overflow = "";
        } catch (error) {
            message.textContent = error.message;
            message.style.color = "red";
        }
    };
}

if (loginForm) {
    loginForm.onsubmit = async function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                message.textContent = result.message;
                message.style.color = "red";
                return;
            }

            message.textContent = result.message;
            message.style.color = "green";
            loginForm.reset();
        } catch (error) {
            message.textContent = "Could not connect to the server.";
            message.style.color = "red";
        }
    };
}

renderUsers();