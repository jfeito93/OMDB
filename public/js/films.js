const keyword = document.querySelector('div#search > input[type="text"]');
const searchButton = document.querySelector("div#search > button");
if (searchButton) {
  function search() {
    if (keyword.value) {
      window.location.assign(`/search?s=${keyword.value}`);
    } else {
      window.location.assign("/search");
    }
  }
  searchButton.addEventListener("click", search);
};
