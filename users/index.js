let users = JSON.parse(localStorage.getItem("users")) || [];

const usersContainer = document.getElementById("usersContainer");

const userCount = document.getElementById("userCount");
userCount.textContent = users.length;

usersContainer.innerHTML = users
  .map((user, index) => {
    return `
            <div
              class="bg-white rounded-2xl p-6 
                   transition 
                     border border-gray-100 hover:bg-slate-300"
            >

              <div
                class="w-15 h-15 rounded-full
                       bg-blue-100 text-blue-600
                       flex items-center justify-center
                       text-2xl font-bold mx-auto mb-5"
              >
              ${user.username.charAt(0).toUpperCase()}
              </div>
              <h2
                class="text-xl font-bold text-gray-900 text-center"
              >
                ${user.username}
              </h2>


              <div class="mt-5 space-y-3 text-gray-600">

                <div class="flex items-center gap-3">
                  <span class="break-all">
                    Email : ${user.email}
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <span>
                    Phone number : +${user.phone}
                  </span>
                </div>

              </div>
            </div>
          `;
  })
  .join("");

console.log("Users:", users);

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
