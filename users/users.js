function getUsers() {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

function renderUsersTable() {
  const users = getUsers();
  document.getElementById("userCount").textContent =
    users.length + " people registered";

  const tableBody = document.getElementById("usersTableBody");
  tableBody.innerHTML = "";

  if (users.length === 0) {
    tableBody.innerHTML =
      "<tr><td colspan='2'>No one has registered yet.</td></tr>";
    return;
  }

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = "<td>" + user.email + "</td><td>" + user.password + "</td>";
    tableBody.appendChild(row);
  });
}

renderUsersTable();
