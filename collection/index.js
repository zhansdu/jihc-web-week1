function loadDocument(link, query) {
  fetch(link).then((response) => {
    response.text().then((text) => {
      document.querySelectorAll(query).forEach((doc) => {
        doc.innerHTML = text;
      });
      if (query === 'section[name="navbar"]') {
        loadNavbar();
      }
    });
  });
}

loadDocument("/navbar/index.html", 'section[name="navbar"]');
loadDocument("/footer/index.html", 'section[name="footer"]');
