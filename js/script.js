document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("formInput");
  const submitFormSearch = document.getElementById("formSearch");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
  submitFormSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    showSearchResults();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
document.addEventListener("ondataloaded", () => {
  refresDataFromBook();
});
document.addEventListener("onsearchclicked", () => {
  filterTitle();
});
