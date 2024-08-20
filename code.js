
// Declare array of books
const myLibrary = [];


// Declare constructor to create book objects
function Book(title, author="Not Specified", pages="Not Specified", read="Not Specified") {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Declare function to add books to library array
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// Add a bunch of books to the library array
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 300, "yes");
addBookToLibrary('Narnia', 'C.S.S Lewis', 528, "yes");
addBookToLibrary('Harry Potter');
addBookToLibrary('Game of Thrones');
addBookToLibrary('Lord of the Rings');
addBookToLibrary('A Tale of Two Cities');

// Declare variable for element where books will be displayed
let shelf = document.querySelector('.shelf');

// Display books from library array on the shelf element
function displayBooks() {
    shelf.innerHTML = '';

    const header = document.createElement("h1");
    header.innerText += "Shelf";
    shelf.appendChild(header);

    for (let book of myLibrary) {
        const shelfCard = document.createElement("div");
        shelfCard.classList.add("shelfCard");

        const titleNode = document.createElement("div");
        titleNode.classList.add("titleNode");
        const titleSpan = document.createElement("span");
        titleSpan.innerText = "Title: ";
        titleNode.appendChild(titleSpan);
        titleNode.appendChild(document.createTextNode(`${book.title}`));
        shelfCard.appendChild(titleNode);

        const authorNode = document.createElement("div");
        authorNode.classList.add("authorNode");
        const bySpan = document.createElement("span");
        bySpan.innerText = "By: ";
        authorNode.appendChild(bySpan);
        authorNode.appendChild(document.createTextNode(`${book.author}`));
        shelfCard.appendChild(authorNode);
        
        const pagesNode = document.createElement("div");
        pagesNode.classList.add("pagesNode");
        const pagesSpan = document.createElement("span");
        pagesSpan.innerText = "Pages: ";
        pagesNode.appendChild(pagesSpan);
        pagesNode.appendChild(document.createTextNode(`${book.pages}`));
        shelfCard.appendChild(pagesNode);

        const readNode = document.createElement("div");
        readNode.classList.add("readNode");
        const readSpan = document.createElement("span");
        readSpan.innerText = "Read Yet?: ";
        readNode.appendChild(readSpan);
        let readText;
        switch (book.read) {
            case "yes":
                readText = "Yes";
                break;
            case "no":
                readText = "No";
                break;
            default:
                readText = "Not Specified";
        };
        readNode.appendChild(document.createTextNode(readText));
        shelfCard.appendChild(readNode);

        shelf.appendChild(shelfCard);
    }
}
displayBooks();

// Declare variables to open and close modal
const btnNewBook = document.getElementById("newBookBtn");
const btnClose = document.getElementById("closeBtn");
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

// Declare variables to collect new book form data
const submitBtn = modal.querySelector(".modal-content input[type='submit']");

submitBtn.onclick = submitBook;

function submitBook(event) {
    event.preventDefault(); // Prevents form submission 
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");
    // Prevents blank fields
    if (title.value === "" || 
        author.value === "" || 
        pages.value === "" ||
        read.value === "default") {
        alert("All fields are required");
    } else { 
        addBookToLibrary(title.value, author.value, pages.value, read.value);
        displayBooks(); // Redisplayed books
        closeModal();
        // Clears form fields
        title.value = "";
        author.value = "";
        pages.value = "";
        read.value = "default";
    }
}
