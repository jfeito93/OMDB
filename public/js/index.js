const button = document.querySelector("span");
const nav = document.querySelector("nav");
console.log("hola")
button.addEventListener('click', () => {
    if(button.innerText === "menu"){
        button.innerText = "close"
        nav.classList = "";
    }else{
        button.innerText = "menu";
        nav.classList = "none";
    }
})