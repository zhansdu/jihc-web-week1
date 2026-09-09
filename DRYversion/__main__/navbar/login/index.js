function login(event){
  event.preventDefault()
  const formData = new FormData(event.target)
  const jsonData = Object.fromEntries(formData)
  const user = getSingleUser(jsonData.username,jsonData.password)
  if(user){
    alert("SUCCESS!!")
    window.location.href= '/DRYversion/users/index.html'
  }
  else{
    alert("WRONG !!")
  }

}
