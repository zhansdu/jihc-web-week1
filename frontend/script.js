function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const users = getUsers();

    // Check if email already exists
    const userExists = users.some(function (user) {
      return user.email.toLowerCase() === email.toLowerCase();
    });

    if (userExists) {
      alert("This email is already registered.");
      return;
    }

    // Create new user
    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    users.push(newUser);

    saveUsers(users);

    alert("Registration successful!");

    registerForm.reset();

    window.location.href = "index.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value;

    const users = getUsers();

    // Find user by email and password
    const user = users.find(function (user) {
      return (
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
      );
    });

    if (user) {
      // Save current logged-in user
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Welcome, " + user.name + "!");

      window.location.href = "index.html";
    } else {
      alert("Incorrect email or password.");
    }
  });
}

const usersTable = document.getElementById("usersTable");
const userCount = document.getElementById("userCount");
const emptyMessage = document.getElementById("emptyMessage");

if (usersTable) {
  const users = getUsers();

  if (userCount) {
    userCount.textContent = users.length;
  }

  if (users.length === 0) {
    if (emptyMessage) {
      emptyMessage.style.display = "block";
    }
  } else {
    if (emptyMessage) {
      emptyMessage.style.display = "none";
    }

    users.forEach(function (user, index) {
      const row = document.createElement("tr");

      const numberCell = document.createElement("td");
      numberCell.textContent = index + 1;

      const nameCell = document.createElement("td");
      nameCell.textContent = user.name;

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;

      row.appendChild(numberCell);
      row.appendChild(nameCell);
      row.appendChild(emailCell);

      usersTable.appendChild(row);
    });
  }
}

const modal = document.getElementById("bookModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");

// Open modal
if (modal && openModalButton) {
  openModalButton.addEventListener("click", function () {
    modal.style.display = "flex";
  });
}

// Close modal
if (modal && closeModalButton) {
  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

// Close modal when clicking outside
if (modal) {
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

const createAccountButton = document.getElementById("createAccount");

if (createAccountButton) {
  createAccountButton.addEventListener("click", function () {
    window.location.href = "register.html";
  });
}

const exploreBooksButton = document.getElementById("exploreBooks");

const featuredSection = document.querySelector(".featured");

if (exploreBooksButton && featuredSection) {
  exploreBooksButton.addEventListener("click", function () {
    featuredSection.scrollIntoView({
      behavior: "smooth",
    });
  });
}

const viewBooksButton = document.querySelector(".view-books");

if (viewBooksButton && featuredSection) {
  viewBooksButton.addEventListener("click", function () {
    alert("You are already viewing our featured books!");
  });
}
