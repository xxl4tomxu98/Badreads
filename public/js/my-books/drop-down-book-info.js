import { createAddToShelfDropdown } from './add-to-shelf-dropdown.js'

const populateDropDown = async (bookTitle, bookAuthor, bookDescription, bookPublicationYear, bookId, bookshelfId) => {
    let bookTitleBlock = document.querySelector('.bookshelf-books__book-title');
    let bookAuthorBlock = document.querySelector('.bookshelf-books__book-author');
    let bookDescriptionBlock = document.querySelector('.bookshelf-books__book-description')
    bookTitleBlock.innerHTML = bookTitle;
    bookAuthorBlock.innerHTML = bookAuthor;
    bookDescriptionBlock.innerHTML = bookDescription;

    const addToShelfDropdown = await createAddToShelfDropdown(bookId, bookshelfId);
    console.log('addToShelfDropdown = ', addToShelfDropdown)
    bookTitleBlock.appendChild(addToShelfDropdown);
}

export const dropDownBookInfo = async(book, bookshelfId) => {
    const res = await fetch(`/api-user/${bookshelfId}/books/${book.id}`);
    const bookInfo = await res.json();

    // console.log(bookInfo.book);
    const bookTitle = bookInfo.book.title;
    const bookAuthor = bookInfo.book.author;
    const bookDescription = bookInfo.book.description
    const bookPublicationYear = bookInfo.book.publicationYear

    populateDropDown(bookTitle, bookAuthor, bookDescription, bookPublicationYear, book.id, bookshelfId);
    // console.log(bookTitle, bookAuthor, bookDescription, bookPublicationYear);
}
