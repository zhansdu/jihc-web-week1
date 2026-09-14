const usercount = document.getElementById("userCount");
async function renderUsersTable() {
  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const tableBody = document.getElementById("usersTableBody");
    tableBody.innerHTML = " ";
    if (users.length === 0) {
      tableBody.innerHTML =
        "<tr><td colspan='2'>No one has registered yet.</td></tr>";
      return;
    }
    usercount.textContent = `There are ${users.length} users registered`;
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + user.email + "</td><td>" + user.password + "</td>";
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to load users", error);
  }
}

renderUsersTable();
