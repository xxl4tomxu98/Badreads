const getBookList = async(bookshelfId) => {
    //console.log('in getBookList')
    const res = await fetch(`/api-bookshelves/${bookshelfId}`);
    const bookshelf = await res.json();
    //console.log('data', data)
    return bookshelf;
};

const createBookDiv = (book) => {
    //console.log('in createBookDiv book.title=', book.title)
    return `<div class='book-on-shelf'>
                <div class='book-on-shelf__book-cover></div>
                <div class='book-on-shelf__book-title'>${book.title}</div>
            </div>`
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
        const bookDiv = createBookDiv(books[book]);
        //console.log('bookDiv', bookDiv)
        bookshelfBooks.innerHTML += bookDiv;
    };
};
