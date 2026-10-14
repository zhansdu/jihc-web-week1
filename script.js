const modal = document.getElementById('authModal');
const openBtn = document.getElementById('openLoginBtn');
const closeBtn = document.getElementById('closeModalBtn');
const tabLogin = document.getElementById('tabLoginBtn');
const tabReg = document.getElementById('tabRegisterBtn');
const formLogin = document.getElementById('loginForm');
const formReg = document.getElementById('registerForm');
const tableBody = document.getElementById('usersTableBody');

openBtn.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
};

tabLogin.onclick = () => {
    tabLogin.classList.add('active');
    tabReg.classList.remove('active');
    formLogin.style.display = 'flex';
    formReg.style.display = 'none';
};

tabReg.onclick = () => {
    tabReg.classList.add('active');
    tabLogin.classList.remove('active');
    formReg.style.display = 'flex';
    formLogin.style.display = 'none';
};

function showUsers() {
    if (!tableBody) return;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    tableBody.innerHTML = '';
    users.forEach((user, i) => {
        tableBody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.destination}</td>
            </tr>
        `;
    });
}

formReg.onsubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        destination: document.getElementById('regDestination').value
    });
    localStorage.setItem('users', JSON.stringify(users));
    formReg.reset();
    modal.style.display = 'none';
    showUsers();
};

formLogin.onsubmit = (e) => {
    e.preventDefault();
    alert('Logged in!');
    modal.style.display = 'none';
    formLogin.reset();
};

showUsers();
