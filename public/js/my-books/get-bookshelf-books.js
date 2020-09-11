import {dropDownBookInfo} from './drop-down-book-info.js'

const getBookList = async(bookshelfId) => {
    //console.log('in getBookList')
    const res = await fetch(`/api-user/${bookshelfId}`);
    const bookshelf = await res.json();
    console.log('bookshelf =', bookshelf)
    //console.log('data', data)
    return bookshelf;
};

const createBookDiv = (book, bookshelfId) => {
    console.log('in createBookDiv book.title=', book.title)
    // const bookDiv =  `<div class='book-on-shelf'>
    //             <div class='book-on-shelf__book-cover'></div>
    //             <div class='book-on-shelf__book-title'>${book.title}</div>
    //         </div>`

    var bookDiv = document.createElement('div');
    bookDiv.className = 'book-on-shelf';

    var bookCoverDiv = document.createElement('div');
    bookCoverDiv.className = 'book-on-shelf__book-cover';

    var bookTitleDiv = document.createElement('div');
    bookTitleDiv.className = 'book-on-shelf__book-title';
    bookTitleDiv.innerHTML = `${book.title}`;

    bookDiv.appendChild(bookCoverDiv);
    bookDiv.appendChild(bookTitleDiv);

    bookDiv.addEventListener('click', () => dropDownBookInfo(book, bookshelfId));
    return bookDiv;

};

export const populateBookshelfBookList = async (bookshelfId) => {
    const bookshelfBooks = document.querySelector('.book-list');
    const bookshelfTitle = document.querySelector('.bookshelf-title');
    const { bookshelf } = await getBookList(bookshelfId);
    bookshelfBooks.innerHTML = ''
    const books = bookshelf.Books
    //console.log('books', books)
    bookshelfTitle.innerHTML = bookshelf.name;
    console.log('bookshelf', bookshelf)
    console.log('title = ', bookshelf.name)
    for (let book in books) {
        //console.log('in for loop, book =', books[book])
        const bookDiv = createBookDiv(books[book], bookshelfId);
        //console.log('bookDiv', bookDiv)
        bookshelfBooks.appendChild(bookDiv)
    };
};
