document.getElementById("navbar").innerHTML = `
<nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
<div class="container">
    <a class="navbar-brand" href="index1.html">My Website</a>
    <ul class="navbar-nav ms-auto">
        <li class="nav-item">
            <a class="nav-link" href="index1.html">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="about.html">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="login.html">Log in</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="empty.html">Empty page</a>
        </li>
        </ul>
    </div>
</nav>
`;
document.getElementById("footer").innerHTML = `
<footer class="bg-dark text-light text-center py-3">
  <div class="container">
    <small>&copy; 2026 My Website. All rights reserved.</small>
  </div>
</footer>
`;
