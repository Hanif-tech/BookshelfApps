const STORAGE_KEY = "BOOKSHELF_APPS";
let book = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
}
function saveData() {
  const parsed = JSON.stringify(book);
  localStorage.setItem(STORAGE_KEY, parsed);
}
function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    book = data;
  }

  document.dispatchEvent(new Event("ondataloaded"));
}
function composeBookObject(judul, penulis, tahun, isButtonCompleted) {
  return {
    id: +new Date(),
    judul,
    penulis,
    tahun,
    isButtonCompleted,
  };
}
function findBookIndex(bookId) {
  let index = 0;
  for (b of book) {
    if (b.id === bookId) {
      return index;
    }
    index++;
  }
}
function findBook(bookId) {
  for (b of book) {
    if (b.id === bookId) {
      return b;
    }
  }
}

function refresDataFromBook() {
  for (b of book) {
    const newBook = makeBook(b.judul, b.penulis, b.tahun, b.isButtonCompleted);
    newBook[BOOK_ITEMID] = b.id;

    if (b.isButtonCompleted == true) {
      listTelahSelesai.append(newBook);
    } else {
      listBelumSelesai.append(newBook);
    }
  }
}
function showAlert() {
  alert("Berhasil menghapus data");
}
function filterTitle() {
  const inputSearch = document.getElementById("textCari").value.toUpperCase();
  // const splitInput = inputSearch.split(" ");
  for (b of book) {
    const splitBook = b.judul.split(" ");
    if (b.judul === inputSearch || splitBook[0] == inputSearch || splitBook[1] == inputSearch || splitBook[2] == inputSearch) {
      const newBook = makeBook(b.judul, b.penulis, b.tahun, b.isButtonCompleted);
      newBook[BOOK_ITEMID] = b.id;

      if (b.isButtonCompleted == true) {
        listTelahSelesai.append(newBook);
      } else {
        listBelumSelesai.append(newBook);
      }
    }
  }
}
function showSearchResults() {
  const inputSearch = document.getElementById("textCari").value;
  if (inputSearch == "") {
    if (listBelumSelesai.hasChildNodes() || listTelahSelesai.hasChildNodes()) {
      while (listBelumSelesai.hasChildNodes()) {
        listBelumSelesai.removeChild(listBelumSelesai.lastChild);
      }
      if (listTelahSelesai.hasChildNodes()) {
        while (listTelahSelesai.hasChildNodes()) {
          listTelahSelesai.removeChild(listTelahSelesai.lastChild);
        }
      }
    }
    document.dispatchEvent(new Event("ondataloaded"));
  } else {
    if (listBelumSelesai.hasChildNodes() || listTelahSelesai.hasChildNodes()) {
      while (listBelumSelesai.hasChildNodes()) {
        listBelumSelesai.removeChild(listBelumSelesai.lastChild);
      }
      if (listTelahSelesai.hasChildNodes()) {
        while (listTelahSelesai.hasChildNodes()) {
          listTelahSelesai.removeChild(listTelahSelesai.lastChild);
        }
      }
    }
    document.dispatchEvent(new Event("onsearchclicked"));
  }
}
