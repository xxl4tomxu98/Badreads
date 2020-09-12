// import { bookDelete } from "./delete-book.js";
import { createAddToShelfDropdown } from './add-to-shelf-dropdown.js'

const populateDropDown = async (bookTitle, bookAuthor, bookDescription, bookPublicationYear, bookId, bookshelfId) => {
    var element = document.querySelector('.add-to-bookshelf-dropdown');
    if(element) {
        element.parentNode.removeChild(element)
    };
    let bookTitleBlock = document.querySelector('.bookshelf-books__book-title');
    let bookAuthorBlock = document.querySelector('.bookshelf-books__book-author');
    let bookDescriptionBlock = document.querySelector('.bookshelf-books__book-description')
    bookTitleBlock.innerHTML = bookTitle;
    bookAuthorBlock.innerHTML = bookAuthor;
    bookDescriptionBlock.innerHTML = bookDescription;
    // const deleteBookButton = document.createElement("Button");
    // deleteBookButton.className = "delete-button";
    // bookTitleBlock.appendChild(deleteBookButton);
    // deleteBookButton.addEventListener("click", bookDelete(bookshelfId, bookId));


    const addToShelfDropdown = await createAddToShelfDropdown(bookId, bookshelfId);
    console.log('addToShelfDropdown = ', addToShelfDropdown)
    bookAuthorBlock.insertAdjacentElement('afterend', addToShelfDropdown);
}



export const dropDownBookInfo = async(book, bookshelfId) => {

    //need authorization header to access user shelves for when user is redirected to my-books page
    //after login or sign-up since requireAuth was added to frontend user route
    const res = await fetch(`/api-user/${bookshelfId}/books/${book.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "BADREADS_ACCESS_TOKEN"
          )}`,
        },
      });

      //redirect user to login page if not logged in which is on the landing page path('/')
      if (res.status === 401) {
        window.location.href = "/";
        return;
      }

    const bookInfo = await res.json();

    // console.log(bookInfo.book);
    const bookTitle = bookInfo.book.title;
    const bookAuthor = bookInfo.book.author;
    const bookDescription = bookInfo.book.description
    const bookPublicationYear = bookInfo.book.publicationYear

    populateDropDown(bookTitle, bookAuthor, bookDescription, bookPublicationYear, book.id, bookshelfId);
    // console.log(bookTitle, bookAuthor, bookDescription, bookPublicationYear);
}
