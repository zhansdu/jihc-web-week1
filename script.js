const usersStorageKey = "cinemaNexusUsers";

const registerModal = document.getElementById("registerModal");
const loginModal = document.getElementById("loginModal");
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");
const usersTableBody = document.getElementById("usersTableBody");

const closeRegisterModal = document.getElementById("closeRegisterModal");
const closeLoginModal = document.getElementById("closeLoginModal");


function getUsers() {
    const users = JSON.parse(localStorage.getItem(usersStorageKey) || "[]");

    return Array.isArray(users) ? users : [];
}


function saveUsers(users) {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
}


function setModal(modal, isOpen) {
    if (!modal) return;

    modal.style.display = isOpen ? "flex" : "none";
    modal.setAttribute("aria-hidden", isOpen ? "false" : "true");
}


function showMessage(elementId, message, color) {
    const messageElement = document.getElementById(elementId);

    if (!messageElement) return;

    messageElement.textContent = message;
    messageElement.style.color = color;
}


function renderUsers() {
    if (!usersTableBody) return;

    const users = getUsers();
    usersTableBody.innerHTML = "";

    if (users.length === 0) {
        usersTableBody.innerHTML = `
            <tr>
                <td class="u7" colspan="3">No registered members yet</td>
            </tr>
        `;
        return;
    }

    users.forEach(function (user, index) {
        const row = document.createElement("tr");

        [index + 1, user.fullName, user.email].forEach(function (value) {
            const cell = document.createElement("td");

            cell.className = "u7";
            cell.textContent = value;

            row.appendChild(cell);
        });

        usersTableBody.appendChild(row);
    });
}


document
    .querySelectorAll('#openRegisterModal, [data-modal-open="register"]')
    .forEach(function (button) {
        button.onclick = function () {
            showMessage("registrationMessage", "", "");
            setModal(registerModal, true);
        };
    });


document
    .querySelectorAll('#openLoginModal, [data-modal-open="login"]')
    .forEach(function (button) {
        button.onclick = function () {
            showMessage("loginMessage", "", "");
            setModal(loginModal, true);
        };
    });


if (closeRegisterModal) {
    closeRegisterModal.onclick = function () {
        setModal(registerModal, false);
    };
}


if (closeLoginModal) {
    closeLoginModal.onclick = function () {
        setModal(loginModal, false);
    };
}


[registerModal, loginModal].forEach(function (modal) {
    if (modal) {
        modal.onclick = function (event) {
            if (event.target === modal) {
                setModal(modal, false);
            }
        };
    }
});


if (registrationForm) {
    registrationForm.onsubmit = function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            showMessage("registrationMessage", "Passwords do not match.", "red");
            return;
        }

        const users = getUsers();

        if (users.some(function (user) {
            return user.email === email;
        })) {
            showMessage(
                "registrationMessage",
                "An account with this email already exists.",
                "red"
            );
            return;
        }

        users.push({
            fullName: fullName,
            email: email,
            password: password
        });

        saveUsers(users);
        renderUsers();
        registrationForm.reset();

        showMessage(
            "registrationMessage",
            "Account created successfully.",
            "#54d66a"
        );
    };
}


if (loginForm) {
    loginForm.onsubmit = function (event) {
        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document.getElementById("loginPassword").value;
        const users = getUsers();

        const foundUser = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (!foundUser) {
            showMessage("loginMessage", "Incorrect email or password.", "red");
            return;
        }

        loginForm.reset();

        showMessage(
            "loginMessage",
            "Welcome back, " + foundUser.fullName + ".",
            "#54d66a"
        );
    };
}


document.onkeydown = function (event) {
    if (event.key === "Escape") {
        setModal(registerModal, false);
        setModal(loginModal, false);
    }
};


renderUsers();