const Library = [];
const libraryDisplay = document.getElementById("Library");

//constructor (template) for books
//‣book template
function Book(cover, title, author, publicationDate, pages, readingStatus) {
    this.cover = cover;
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
function addBookToLibrary(cover, title, author, publicationDate, pages, readingStatus) { 
    const book = new Book(cover, title, author, publicationDate, pages, readingStatus); 
    Library.push(book);
};

//TEMPORARY ENTRIES (FOR TESTING)
const book1 = new addBookToLibrary("n/a", 'title1', 'author1', 'n/a', 200, 'not-read');
const book2 = new addBookToLibrary("n/a", 'title2', 'author2', 'n/a', 400, 'reading');
const book3 = new addBookToLibrary("n/a", 'title3', 'author3', 'n/a', 600, 'read');

//display books in the 'Library' array on the page
displayLibrary = function() {
    let bookIDCounter = 0;
    Library.forEach(function(book) {
        //◉ HTML container for each instance
        const bookInstanceContainer = document.createElement('div');
        libraryDisplay.appendChild(bookInstanceContainer);
        //bookInstanceContainer.innerText = `${book.info()}`;
            //◉ HTML containers for individual keys within each instance
            const coverContainer = document.createElement('div');
            coverContainer.setAttribute("class", "book-cover");
            const imageContainer = document.createElement('img');
            imageContainer.setAttribute("class", "cover-image");
            imageContainer.setAttribute("alt", "book cover"); //for screen-readers
            imageContainer.setAttribute("src", "/library/images/default-book-cover.png");

            coverContainer.appendChild(imageContainer);
            bookInstanceContainer.appendChild(coverContainer);

            const titleContainer = document.createElement('div');
            titleContainer.innerText = `${book.title}`;
            titleContainer.setAttribute("class", "book-title");
            bookInstanceContainer.appendChild(titleContainer);

            const authorContainer = document.createElement('div');
            authorContainer.innerText = `${book.author}`;
            authorContainer.setAttribute("class", "book-author");
            bookInstanceContainer.appendChild(authorContainer);

            const publicationContainer = document.createElement('div');
            publicationContainer.innerText = `${book.publicationDate}`;
            publicationContainer.setAttribute("class", "book-publication-date");
            bookInstanceContainer.appendChild(publicationContainer);

            const pagesContainer = document.createElement('div');
            pagesContainer.innerText = `${book.pages}`;
            pagesContainer.setAttribute("class", "book-pages");
            bookInstanceContainer.appendChild(pagesContainer);

        //◉ Removal button for each instance
        //‣ create & attach button to the instance container
        const removeBook = document.createElement('button');
            removeBook.innerText = "𝘅";
            bookInstanceContainer.appendChild(removeBook);
        //‣ attach button to object  
        bookInstanceContainer.setAttribute("data-bookID", bookIDCounter); //setting unique ID 
            bookIDCounter++;
        //‣‣ functionality
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
            bookInstanceContainer.appendChild(toggleStatus);  
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

            //‣‣ refresh DOM display
            instanceButtons();
        })
    });
}
displayLibrary();

//attaching HTML elements to JS script //I may have added these twice, gotta re-check
const bookDialog = document.getElementById("book-dialog");
    const bookForm = document.getElementById("book-form");
        const bookCover = document.getElementById("")
        const bookTitle = document.getElementById("book-title");
        const bookAuthor = document.getElementById("book-author");
        const bookDate = document.getElementById("book-publication-date");
        const bookPages = document.getElementById("book-pages");
        const bookStatus = document.getElementById("book-reading-status");
const openForm = document.getElementById("open-form");
const closeForm = document.getElementById("close-form");

//◉ 'New Book' button logic (dialog, form and submit handling)
//‣ open form
openForm.addEventListener("click", () => {
    bookDialog.showModal();
});
//‣ custom 'submit' handling 
closeForm.addEventListener("click", (event) => {
    event.preventDefault();

    //‣‣collect form input values
    let formCover = "n/a"; //functionality behind adding images (besides the default) isn't there yet
    let formTitle = bookTitle.value;
    let formAuthor = bookAuthor.value;
    let formDate = bookDate.value; 
    let formPages = bookPages.value;
    let formStatus = bookStatus.value;

    //‣‣verify if user inputted values
    if (formTitle === '') {
        alert("crucial: no title given");
        return;
    } else if (formAuthor === '') {
        alert("crucial: no author given");
        return;
    //the rest isn't so crucial, but I don't want empty values
    } else if (formDate === '') {
        formDate === "n/a";
    } else if (formPages === '') {
        formDate === "n/a";
    };

    //‣‣push collected values as arguments of the instance creation function
    addBookToLibrary(formCover, formTitle, formAuthor, formDate,formPages, formStatus);

    //? not sure if its efficient to clear the container & loop through the entire array after each new addition
    libraryDisplay.innerHTML = ''; //clear HTML container to avoid display duplicates
    displayLibrary(); //refresh
    console.log(`added book: ${formTitle}`, Library);
});

//◉ Display the number of books in the Library
const numberOfBooks = Library.length;
const librarySizeContainer = document.getElementById('number-of-books');
librarySizeContainer.innerText = `All (${numberOfBooks})`;