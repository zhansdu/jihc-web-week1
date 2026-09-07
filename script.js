const fullName = document.getElementById("name")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const regBtn = document.querySelector("button-reg")
const emailLogin = document.getElementById("emailLogin")
const passwordLogin = document.getElementById("passwordLogin")

const registerForm = document.getElementById("registerForm")
const loginForm = document.getElementById("loginForm")

const sheetBody = document.getElementById("sheetBody")
let idUsers = 0;
showUsers()
function showUsers(){
   const users = JSON.parse(localStorage.getItem("users")) || [];
    
   users.forEach(element => {
    
    sheetBody.innerHTML += `<tr>
            <td>${idUsers++}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            
            
        </tr>`
   });
   idUsers = 0
}


let id = 0

registerForm.addEventListener("submit", (e)=>{
   if(!registerForm.checkValidity()){
    registerForm.reportValidity();
    return;
   }

   let users = JSON.parse(localStorage.getItem("users")) || []
   const has = users.find(e => e.email === email.value)
   if(has){
    document.querySelector(".error").style.color = "red"
    document.querySelector(".error").innerHTML = "This email already registried"
    
    return
   }
   const user = {
    id: id++,
    name: fullName.value,
    email: email.value,
    phone: phone.value,
    password: password.value

   }
   id++

   users.push(user)

   localStorage.setItem("users", JSON.stringify(users))
   sheetBody.innerHTML = ""
  showUsers()
    registerForm.reset()
    document.querySelector(".error").innerHTML = "Congrulations you registered!"
    document.querySelector(".error").style.color = "green"
})

const errorLogin = document.querySelector(".errorLogin")
loginForm.addEventListener("submit", (e)=>{
  e.preventDefault()
  let users = JSON.parse(localStorage.getItem("users")) || []
  const has = users.find(e => emailLogin.value === e.email)
   if(has){
      if(has.password === passwordLogin.value){
        errorLogin.style.color = "green"
        errorLogin.innerHTML = "Your succesfuly logged in"

        loginForm.reset()
        return
      }else{
        
    errorLogin.style.color = "red"
        errorLogin.innerHTML = "Password isn't correct"
        return
      }
   }else{
    errorLogin.style.color = "red"
    errorLogin.innerHTML = "This email not exist"
    
        return
   }
})





