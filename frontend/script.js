const fullName = document.getElementById("name")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const regBtn = document.querySelector("button-reg")
const emailLogin = document.getElementById("emailLogin")
const passwordLogin = document.getElementById("passwordLogin")

const registerForm = document.getElementById("registerForm")
const loginForm = document.getElementById("loginForm")
const error = document.querySelector(".error")

const sheetBody = document.getElementById("sheetBody")
let idUsers = 0;

async function showUsers() {
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();

    users.forEach(element => {
        sheetBody.innerHTML += `<tr>
            <td>${idUsers++}</td>
            <td>${element.username}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
        </tr>`;
    });

    idUsers = 0;
}

showUsers()




registerForm.addEventListener("submit", async(e)=>{
  e.preventDefault()
   if(!registerForm.checkValidity()){
    registerForm.reportValidity();
    return;
   }
  
  
  
   const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: fullName.value,
      email:email.value,
      phone: phone.value,
      password: password.value
    })
   })
   
   const data = await response.json()
  

   if(response.ok){
    error.style.color = "green";
    error.innerHTML = "You successfully registered!"
   }else{
    error.style.color = "red"
    error.innerHTML = data.message
}
  
})

const errorLogin = document.querySelector(".errorLogin")
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailLogin.value,
            password: passwordLogin.value
        })
    });

    const data = await response.json();

    if (response.ok) {
        errorLogin.style.color = "green";
        errorLogin.innerHTML = "You're successfully logged in";
        loginForm.reset();
    } else {
        errorLogin.style.color = "red";
        errorLogin.innerHTML = data.message;
    }
});





