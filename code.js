
// Declare array of books
const myLibrary = [];


// Declare constructor to create book objects
function Book(title) {
    this.title = title
}

// Declare function to add books to library array
function addBookToLibrary(title) {
    let book = new Book(title);
    myLibrary.push(book);
}

// Add a bunch of books to the library array
addBookToLibrary('The Hobbit');
addBookToLibrary('Narnia');
addBookToLibrary('Harry Potter');
addBookToLibrary('Game of Thrones');
addBookToLibrary('Lord of the Rings');
addBookToLibrary('A Tale of Two Cities');

// Declare variable for element where books will be displayed
let shelf = document.querySelector('.shelf');

// Display books from library array on the shelf element
function displayBook() {
    for (let book of myLibrary) {
        const shelfCard = document.createElement("div");
        shelfCard.classList.add("shelfCard");
        const textTitle = document.createTextNode(`${book.title}`);
        shelfCard.appendChild(textTitle);
        shelf.appendChild(shelfCard);
    }
}
displayBook();

// Declare variables to open and close modal
const btnNewBook = document.getElementById("new-book-btn");
const btnClose = document.getElementById("close-btn");
const modal = document.querySelector(".form-modal")

function openModal() {
    modal.style.display = "block"; // Changes display from none to make element visible
    document.addEventListener('keydown', OnEscapePressed); // Creates listener for escape key
}
function closeModal() {
    modal.style.display = 'none'; // Changes display back to none to make element invisible
    document.removeEventListener('keydown', OnEscapePressed); // Removes as listener no longer required
}
// Closes modal when escape is pressed
function OnEscapePressed(event) {
    event.key === 'Escape' && closeModal();
}

// Registers clicks to call open/close Modal
btnNewBook.onclick = openModal;
btnClose.onclick = closeModal;
// Closes modal if clicking outside of the form
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

