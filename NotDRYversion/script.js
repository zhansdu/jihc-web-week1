function openLogin(){
  document.getElementById('modal').classList.add('openModal')
  document.getElementById('loginForm').style.display = 'flex'
  document.getElementById('registerForm').style.display = 'none'
}

function openRegister(){
  document.getElementById('modal').classList.add('openModal')
  document.getElementById('loginForm').style.display = 'none'
  document.getElementById('registerForm').style.display = 'flex'
}

function closeModal(){
  document.getElementById('modal').classList.remove('openModal')
}

function addToUsers(user){
  let usersList = JSON.parse(localStorage.getItem('users'))
  if(!usersList){
    usersList = []
  }
  usersList.push(user)
  localStorage.setItem('users',JSON.stringify(usersList))
}

function getUsers(){
  let usersList = JSON.parse(localStorage.getItem('users'))
  if(!usersList){
    usersList = []
  }
  return usersList
}

function getSingleUser(username,password){
  const users = getUsers()
  return users.filter(u=>u.username == username && u.password == password)[0]
}

function login(event){
  event.preventDefault()
  const formData = new FormData(event.target)
  const jsonData = Object.fromEntries(formData)
  const user = getSingleUser(jsonData.username,jsonData.password)
  if(user){
    alert("SUCCESS!!")
    window.location.href = 'users.html'
  }
  else{
    alert("WRONG !!")
  }
}

function register(event){
  event.preventDefault()
  const formData = new FormData(event.target)
  const jsonData = Object.fromEntries(formData)
  addToUsers(jsonData)

  window.location.href = 'users.html'
}

const usersListElement = document.getElementById('usersList')

if(usersListElement){
  const users = getUsers()

  if(users.length){
    const table = document.createElement('table')
    const theadr = document.createElement('tr')

    theadr.innerHTML = `
      <tr>
        <th> Name </th>
        <th> Age </th>
        <th> Gender </th>
      </tr>
    `
    table.appendChild(theadr)

    users.forEach(user => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
      <tr>
        <td>
          Name: ${user.username}
        </td>
        <td>
          Age: ${user.age.length ? user.age : 'no age'}
        </td>
        <td>
          Gender: ${user.gender}
        </td>
      </tr>
      `
      table.appendChild(tr)
    });

    usersListElement.appendChild(table)
  }
}
