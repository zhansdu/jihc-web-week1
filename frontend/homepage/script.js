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

function switchTab(tab) {
  if (tab === "register") {
    document.getElementById("tabRegisterBtn").classList.add("active");
    document.getElementById("tabLoginBtn").classList.remove("active");

    document.getElementById("registerForm").hidden = false;
    document.getElementById("loginForm").hidden = true;
  } else {
    document.getElementById("tabRegisterBtn").classList.remove("active");
    document.getElementById("tabLoginBtn").classList.add("active");

    document.getElementById("registerForm").hidden = true;
    document.getElementById("loginForm").hidden = false;
  }
}

async function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const message = document.getElementById("registerMessage");

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    const result = await response.json();
    if (!response.ok) {
      message.textContent = result.error;
      message.className = "modal-message error";
      return;
    }

    message.textContent = result.message;
    message.className = "modal-message success";
    event.target.reset();
  } catch (error) {
    message.textContent = "Server error";
    message.className = "modal-message error";
  }
}
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      message.textContent = result.error;
      message.className = "modal-message error";
      return;
    }
    message.textContent = result.message;
    message.className = "modal-message success";
  } catch (error) {
    message.textContent = "Server error";
    message.className = "modal-message error";
  }
}
