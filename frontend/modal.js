const moreButtons = document.querySelectorAll(".more");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalList = document.getElementById("modalList");


moreButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.parentElement;

        const title = card.querySelector("h2").textContent;
        const text = card.querySelector("p").textContent;

        modalTitle.textContent = title;
        modalText.textContent = text;

        modalList.innerHTML = `
            <li>Practice exercises</li>
            <li>Useful examples</li>
            <li>Short lessons</li>
        `;

        modal.classList.add("active");
    });

});


closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});