function addToUsers(user){
  let usersList = JSON.parse(localStorage.getItem('users'))
  if(!usersList){
    usersList = []
  }
  usersList.push(user)
  localStorage.setItem('users',JSON.stringify(usersList))
}

function getUsers(){
  return JSON.parse(localStorage.getItem('users'))
}

function getSingleUser(username,password){
  const users = getUsers()
  return users.filter(u=>u.username ==username && u.password == password)[0]
}


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

  const usersList = document.getElementById('usersList')
  if(usersList){
    usersList.appendChild(table)
  }

}