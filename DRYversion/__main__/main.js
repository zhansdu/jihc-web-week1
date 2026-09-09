function loadDocument(link,query) {
  fetch(link).then(
    (response) => {
      response.text().then((text)=>{
        document.querySelectorAll(query).forEach(doc=>{
          doc.innerHTML = text
        })
      })
    }
  )
}

function toggleModal(link){
  const modal = document.getElementById('modal');
  if(modal.classList.contains('openModal')){
    modal.classList.remove('openModal')
  }
  else{
    modal.classList.add('openModal')
    if(link){
      loadDocument(link,'section[name="modalContent"')
    }
  }
}