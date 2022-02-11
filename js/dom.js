const listBelumSelesai = document.getElementById("not-finished-reading");
const listTelahSelesai = document.getElementById("finished-reading");
const BOOK_ITEMID = "itemId";

function addBook() {
  const textJudul = document.getElementById("textJudul").value.toUpperCase();
  const textPenulis = document.getElementById("textPenulis").value;
  const textTahun = document.getElementById("textTahun").value;
  const checkbox = document.getElementById("check");

  if (checkbox.checked) {
    const item = makeBook(textJudul, textPenulis, textTahun, true);
    const bookObject = composeBookObject(textJudul, textPenulis, textTahun, true);

    item[BOOK_ITEMID] = bookObject.id;
    book.push(bookObject);
    listTelahSelesai.append(item);
  } else {
    const item = makeBook(textJudul, textPenulis, textTahun, false);
    const bookObject = composeBookObject(textJudul, textPenulis, textTahun, false);

    item[BOOK_ITEMID] = bookObject.id;
    book.push(bookObject);
    listBelumSelesai.append(item);
  }
  updateDataToStorage();
}

function makeBook(namaBuku, namaPenulis, tahun, isButtonSelesai) {
  const createH3 = document.createElement("h3");
  createH3.innerText = namaBuku;

  const createPenulis = document.createElement("p");
  createPenulis.classList.add("mt-2px");

  const createTahun = document.createElement("p");
  createTahun.classList.add("p2", "mt-2px");

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(createH3, createPenulis, createTahun);

  const container = document.createElement("div");
  container.classList.add("item");
  container.append(textContainer);

  if (isButtonSelesai) {
    const arrayPenulis = namaPenulis.split(" ");
    if (arrayPenulis.length == 2) {
      createPenulis.innerText = namaPenulis;
      createTahun.innerText = tahun;
    } else {
      createPenulis.innerText = "Penulis: " + namaPenulis;
      createTahun.innerText = "Tahun: " + tahun;
    }
    container.append(createAddButtonToNotCompleted());
    container.append(createButtonHapus());
  } else {
    const arrayPenulis = namaPenulis.split(" ");
    if (arrayPenulis.length == 2) {
      createPenulis.innerText = namaPenulis;
      createTahun.innerText = tahun;
    } else {
      createPenulis.innerText = "Penulis: " + namaPenulis;
      createTahun.innerText = "Tahun: " + tahun;
    }

    container.append(createAddButtonToCompleted());
    container.append(createButtonHapus());
  }

  return container;
}

function createButton(buttonTypeClass, eventListener, isDone) {
  const button = document.createElement("button");
  if (isDone == true) {
    button.innerText = "Belum selesai dibaca";
  } else if (isDone == null) {
    button.innerText = "Hapus buku";
  } else {
    button.innerText = "Selesai dibaca";
  }
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
}

function addToCompletedListBook(taskElement) {
  const judul = taskElement.querySelector(".inner h3").innerText;
  const penulis = taskElement.querySelector(".inner p").innerText;
  const Tahun = taskElement.querySelector(".inner .p2").innerText;

  const newItem = makeBook(judul, penulis, Tahun, true);
  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isButtonCompleted = true;
  newItem[BOOK_ITEMID] = book.id;
  listTelahSelesai.append(newItem);

  taskElement.remove();
  updateDataToStorage();
}
function addToNotCompletedListBook(taskElement) {
  const judul = taskElement.querySelector(".inner h3").innerText;
  const penulis = taskElement.querySelector(".inner p").innerText;
  const tahun = taskElement.querySelector(".inner .p2").innerText;

  const newItem = makeBook(judul, penulis, tahun, false);
  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isButtonCompleted = false;
  newItem[BOOK_ITEMID] = book.id;
  listBelumSelesai.append(newItem);

  taskElement.remove();
  updateDataToStorage();
}
function deleteItem(taskElement) {
  const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
  book.splice(bookPosition, 1);
  taskElement.remove();
  updateDataToStorage();
}

function createAddButtonToCompleted() {
  return createButton(
    "button-selesai",
    function (event) {
      addToCompletedListBook(event.target.parentElement);
    },
    false
  );
}

function createAddButtonToNotCompleted() {
  return createButton(
    "button-selesai",
    function (event) {
      addToNotCompletedListBook(event.target.parentElement);
    },
    true
  );
}

function createButtonHapus() {
  return createButton("button-hapus", function (event) {
    deleteItem(event.target.parentElement);
    setTimeout(showAlert, 200);
  });
}
