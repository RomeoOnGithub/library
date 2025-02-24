const Library = [];
const libraryDisplay = document.getElementById("Library");

//constructor (template) for books
//‣book template
function Book(title, author, publicationDate, pages, readingStatus) {
    this.title = title;
    this.author = author;
    this.publicationDate = publicationDate; 
    this.pages = pages;
    this.readingStatus = readingStatus;
}
//‣book prototype template
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, released on ${this.publicationDate} with ${this.pages} pages. Status: ${this.readingStatus}`;
};
Book.prototype.updateStatus = function(newStatus) {
    this.readingStatus = newStatus;
    console.log(`Updated status: ${this.title} is now ${this.readingStatus}`);
};


//function for new books
function addBookToLibrary(title, author, publicationDate, pages, readingStatus) { 
    const book = new Book(title, author, publicationDate, pages, readingStatus); 
    Library.push(book);
};

//TEMPORARY ENTRIES (FOR TESTING)
const book1 = new addBookToLibrary('title1', 'author1', 'n/a', 200, 'not-read');
const book2 = new addBookToLibrary('title2', 'author2', 'n/a', 400, 'reading');
const book3 = new addBookToLibrary('title3', 'author3', 'n/a', 600, 'read');

//display books in the 'Library' array on the page
displayLibrary = function() {
    let bookIDCounter = 0;
    Library.forEach(function(book) {
        //the HTML container for each book.info
        const infoContainer = document.createElement('div');
        infoContainer.innerText = `${book.info()}`; 
        libraryDisplay.appendChild(infoContainer);
        
        //◉ the removal button
        //‣ create & attach button to div
        const removeBook = document.createElement('button');
            removeBook.innerText = "Remove";
            infoContainer.appendChild(removeBook);
        //‣ attach button to object  
        infoContainer.setAttribute("data-bookID", bookIDCounter); //setting unique ID 
            bookIDCounter++;
        //‣‣ the action of removing | for the button
            removeBook.addEventListener("click", function() {
            //‣‣‣ remove div from HTML container
            this.parentElement.remove();
            //‣‣‣ remove object from array container
            const bookIDCounterValue = this.parentElement.getAttribute("data-bookID");
                Library.splice(bookIDCounterValue, 1);
                console.log("removed book", Library);
            });
        
        //◉ the toggle button for reading-status
        const toggleStatus = document.createElement('button');
        //‣ create & attach button 
        let instanceButtons = function() {
            toggleStatus.innerHTML = book.readingStatus;
            infoContainer.appendChild(toggleStatus);  
        };
        instanceButtons();
        
        //‣ attach button to object
        toggleStatus.addEventListener("click", function () { //should cycle | unread - reading - read 
            currentStatus = book.readingStatus;
        
            //‣‣ cycle through statuses | unread - reading- read
            if (book.readingStatus === "unread") {
                book.readingStatus = "reading";
            } else if (book.readingStatus === "reading") {
                book.readingStatus = "read"; 
            } else {
                book.readingStatus = "unread";
            };
            console.log(`Changed status: ${book.title} is now ${book.readingStatus}`);

            //‣‣ refresh HTML/DOM display
            instanceButtons();
        })
    });
}
displayLibrary();

//attaching HTML elements to JS script
const bookDialog = document.getElementById("book-dialog");
    const bookForm = document.getElementById("book-form");
    const bookTitle = document.getElementById("book-title");
    const bookAuthor = document.getElementById("book-author");
    const bookDate = document.getElementById("book-publication-date");
    const bookPages = document.getElementById("book-pages");
    const bookStatus = document.getElementById("book-reading-status");
const openForm = document.getElementById("open-form");
const closeForm = document.getElementById("close-form");

//logic for the form nested in a dialog
//‣ open the form
openForm.addEventListener("click", () => {
    bookDialog.showModal();
});
//‣ submit the form by collecting its values and pushing it as arguments of the instance function
closeForm.addEventListener("click", (event) => {
    event.preventDefault();

    let formTitle = bookTitle.value;
    let formAuthor = bookAuthor.value;
    let formDate = bookDate.value; 
    let formPages = bookPages.value;
    let formStatus = bookStatus.value;

    addBookToLibrary(formTitle, formAuthor, formDate,formPages, formStatus);

    //*not sure if its efficient to clear the container & loop through the entire array after each new addition*
    libraryDisplay.innerHTML = ''; //clear HTML container to avoid display duplicates
    displayLibrary(); //refresh
    console.log("added book", Library);
});

