
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
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 300, 'yes');
addBookToLibrary('Narnia', 'C.S.S Lewis', 528, "yes");
addBookToLibrary('Harry Potter', 'J. K. Rowling', 320, 'no');
addBookToLibrary('Game of Thrones', 'George R. R. Martin', 694, 'yes');
addBookToLibrary('Lord of the Rings', 'J.R.R Tolkien', 1200, 'yes');
addBookToLibrary('A Tale of Two Cities', 'Charles Dickens', 304, 'no');

// Declare variable for element where books will be displayed
let shelf = document.querySelector('.shelf');

// Display books from library array on the shelf element
function displayBooks() {
    shelf.innerHTML = '';

    const header = document.createElement("h1");
    header.innerText += "Shelf";
    shelf.appendChild(header);

    for (let i = 0; i < myLibrary.length; i++) {
        
        // Set book from array index
        const book = myLibrary[i];

        // Create card for book options an info to be displayed on
        const shelfCard = document.createElement("div");
        shelfCard.classList.add("shelfCard");

        // Add title info
        const titleNode = document.createElement("div");
        titleNode.classList.add("titleNode");
        const titleSpan = document.createElement("span"); // Put into span to allow bold weight
        titleSpan.innerText = "Title: ";
        titleNode.appendChild(titleSpan);
        titleNode.appendChild(document.createTextNode(`${book.title}`));
        shelfCard.appendChild(titleNode);

        // Add author name
        const authorNode = document.createElement("div");
        authorNode.classList.add("authorNode");
        const bySpan = document.createElement("span");
        bySpan.innerText = "By: ";
        authorNode.appendChild(bySpan);
        authorNode.appendChild(document.createTextNode(`${book.author}`));
        shelfCard.appendChild(authorNode);
        
        // Add pages info
        const pagesNode = document.createElement("div");
        pagesNode.classList.add("pagesNode");
        const pagesSpan = document.createElement("span");
        pagesSpan.innerText = "Pages: ";
        pagesNode.appendChild(pagesSpan);
        pagesNode.appendChild(document.createTextNode(`${book.pages}`));
        shelfCard.appendChild(pagesNode);

        // Add info on read status 
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

        // Add button to update read status
        const btnContainer = document.createElement("div");
        shelfCard.appendChild(btnContainer);
        const updateReadBtn = document.createElement("button");
        updateReadBtn.setAttribute("id", `updateReadBtn${i}`);
        updateReadBtn.classList.add("update-read-btn");
        updateReadBtn.dataset.index = i; // Set data attribute giving reference for book index in array
        if (book.read === "yes") {
            updateReadBtn.appendChild(document.createTextNode("Not Finished"));
        } else {
            updateReadBtn.appendChild(document.createTextNode("I've Finished!"));
            updateReadBtn.classList.add("finished-btn")
        };
        btnContainer.appendChild(updateReadBtn);

        // Add button that removes book
        const removeBookBtn = document.createElement("button");
        removeBookBtn.setAttribute("id", `removeBookBtn${i}`);
        removeBookBtn.classList.add("remove-book-btn")
        removeBookBtn.dataset.index = i; // Set data attribute giving reference for book removal from array
        removeBookBtn.appendChild(document.createTextNode("Delete"));
        btnContainer.appendChild(removeBookBtn);

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

// Declare variables to collect new book data from form
const submitBtn = modal.querySelector(".modal-content input[type='submit']");

submitBtn.onclick = submitBook;

// Declare function which adds book to library array
function submitBook(event) {
    event.preventDefault(); // Prevents form submission 
    const form = document.querySelector("form");
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
        // Reset the form
        form.reset();
    }
}

// Declare function which removes book from library array and shelf display
function removeBook(index) {
    myLibrary.splice(index, 1); // Use splice to remove the indexed book from array
    displayBooks(); // Redisplay books in myLibrary index
}

// Detect buttons to remove book or update read status
shelf.addEventListener('click', (clickEvent) => {
    // Handle read status button
    if (clickEvent.target.tagName === 'BUTTON' && clickEvent.target.classList.contains("update-read-btn")) {
        if (myLibrary[clickEvent.target.dataset.index].read === "yes") {
            myLibrary[clickEvent.target.dataset.index].read = "no";
        } else {
            myLibrary[clickEvent.target.dataset.index].read = "yes";
        };
    }
    // Handle remove book button
    if (clickEvent.target.tagName === 'BUTTON' && clickEvent.target.classList.contains("remove-book-btn")) {
        removeBook(clickEvent.target.dataset.index);
    }

    displayBooks(); // Re-display the updated information
});

