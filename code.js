
// Array of books
const myLibrary = [];


// Constructor
function Book(title) {
    this.title = title
}

function addBookToLibrary(title) {
    let book = new Book(title);
    myLibrary.push(book);
}

addBookToLibrary('The Hobbit');
addBookToLibrary('Narnia');
addBookToLibrary('Harry Potter');
addBookToLibrary('Game of Thrones');
addBookToLibrary('Lord of the Rings');
addBookToLibrary('A Tale of Two Cities');


let shelf = document.querySelector('.shelf');

function displayBook() {
    for (let book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("card");
        const textTitle = document.createTextNode(`${book.title}`);
        card.appendChild(textTitle);
        shelf.appendChild(card);
    }
}
displayBook();
