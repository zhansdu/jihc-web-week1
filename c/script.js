fetch("components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector("#navbar").innerHTML = data;
  });

fetch("components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector("footer").innerHTML = data;
  });
/////////////
function openModal() {
  console.log("cliked");
  let logbtn = document.querySelector(".logbtn");
  logbtn.style.color = logbtn.style.color === "red" ? "black" : "red";
  let logcontainer = document.querySelector(".logcontainer");
  logcontainer.classList.toggle("open");
}
////////
let register = document.querySelector("#registerForm");
if (register) {
  register.addEventListener("submit", function (event) {
    event.preventDefault();
    let user = {
      name: document.querySelector(".name").value,
      email: document.querySelector(".email1").value,
      password: document.querySelector(".password1").value,
      age: document.querySelector(".age").value,
    };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    register.reset();
    document.querySelector(".registerMessage").textContent =
      "Registration saved";
  });
}

////

let userstable = document.querySelector(".usersTable");
if (userstable) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach(function (element, index) {
    userstable.innerHTML += `<table>
        <thead>
          <tr>
            <th>${index + 1}</th>
            <th>${element.name}</th>
            <th>${element.email}</th>
            <th>${element.age}</th>
          </tr>
        </thead>`;
    localStorage.setItem("users", JSON.stringify(users));
  });
}
///////
let loginForm = document.querySelector("#loginForm");
let loginMessage = document.querySelector(".loginMessage");
let emailuse = loginForm.querySelector(".email");
let passworduse = loginForm.querySelector(".password");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(
    (u) => u.email === emailuse.value && u.password === passworduse.value,
  );
  if (user) {
    alert("Logged in");

    let logbtn = document.querySelector(".logbtn");
    logbtn.textContent = "Logged in";
    logbtn.style.color = "green";
    document.querySelector(".logcontainer").classList.remove("open");
  } else {
    loginMessage.textContent = "Email or password is wrong";
  }
});
