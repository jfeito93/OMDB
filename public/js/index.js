let menuButton = document.querySelector("span");
const nav = document.querySelector("nav");
if (menuButton) {
    menuButton.addEventListener('click', () => {
        if (menuButton.innerText === "menu") {
            menuButton.innerText = "close"
            nav.classList = "";
        } else {
            menuButton.innerText = "menu";
            nav.classList = "none";
        }
    })
}