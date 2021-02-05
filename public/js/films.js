const favorite = document.querySelector('a#button');
if (document.querySelector("div#search > button")) {
  const searchButton = document.querySelector("div#search > button");
  const keyword = document.querySelector('div#search > input[type="text"]');
  function search() {
    if (keyword.value) {
      window.location.assign(`/search?s=${keyword.value}`);
    } else {
      window.location.assign("/search");
    }
  }
  searchButton.addEventListener("click", search);
};

favorite.addEventListener('click', () =>{
    fetch(window.location.href, )
})