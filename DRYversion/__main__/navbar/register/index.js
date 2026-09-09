function register(event){
  event.preventDefault()
  const formData = new FormData(event.target)
  const jsonData = Object.fromEntries(formData)
  addToUsers(jsonData)

  window.location.href= '/DRYversion/users/index.html'
}
