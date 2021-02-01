let menuButton = document.querySelector("span");
const nav = document.querySelector("nav");
if (menuButton) {
  menuButton.addEventListener("click", () => {
    if (menuButton.innerText === "menu" && nav.classList == "") {
      menuButton.innerText = "close";
      nav.classList = "open";
    } else if (menuButton.innerText === "close" && (nav.classList == "open")) {
      menuButton.innerText = "menu";
      nav.classList = "";
    }
    if (menuButton.innerText === "menu" && (nav.classList == "admin")) {
      menuButton.innerText = "close";
      nav.classList = "admin open";
    } else if (
      menuButton.innerText === "close" &&
      (nav.classList == "admin open")
    ) {
      menuButton.innerText = "menu";
      nav.classList = "admin";
    }
  });
}
