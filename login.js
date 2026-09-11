function loadUsers() {
    let text = localStorage.getItem("users");
    return JSON.parse(text) || [];
}

function saveUsers(userList) {
    localStorage.setItem("users", JSON.stringify(userList));
}

function showAlert(message) {
    return showModal(message);
}

let messageReturnFocus;

function showModal(message) {
    messageReturnFocus = document.activeElement;
    document.getElementById("ModalText").textContent = message;
    document.getElementById("Modal").style.display = "flex";
    document.getElementById("ModalCloseBtn").focus();
    return message;
}

function closeModal() {
    document.getElementById("Modal").style.display = "none";
    messageReturnFocus.focus();
}

let loginModal = document.getElementById("loginModal");
let loginForm = document.getElementById("loginForm");

document.getElementById("modalBtn").onclick = function () {
    loginModal.style.display = "flex";
    document.getElementById("loginEmail").focus();
};

function closeLogin() {
    loginModal.style.display = "none";
    document.getElementById("loginPassword").value = "";
    document.getElementById("modalBtn").focus();
}

document.getElementById("loginCloseBtn").onclick = closeLogin;

document.getElementById("ModalCloseBtn").onclick = closeModal;

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim().toLowerCase();
    let password = document.getElementById("loginPassword").value;
    let users = loadUsers();

    if (email === "" || password.trim() === "") {
        return showAlert("Please enter your email and password.");
    }

    let user = users.find(function (user) {
        return user.email.trim().toLowerCase() === email && user.password === password;
    });

    if (!user) {
        return showAlert("Wrong email or password.");
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    closeLogin();

    return showModal("Hello, " + user.name + "!");
});

document.addEventListener("keydown", function (event) {
    let popup = document.getElementById("Modal");
    if (popup.style.display !== "flex") {
        popup = loginModal;
    }
    if (popup.style.display !== "flex") {
        return;
    }

    if (event.key === "Escape") {
        if (popup.id === "Modal") {
            closeModal();
        } else {
            closeLogin();
        }
    }

    if (event.key === "Tab") {
        let fields = popup.querySelectorAll("input, button");
        let first = fields[0];
        let last = fields[fields.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});
