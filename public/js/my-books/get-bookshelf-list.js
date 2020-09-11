import { populateBookshelfBookList } from './get-bookshelf-books.js'

// Get shelves
const getBookshelves = async () => {
    const res = await fetch('/api-user',{
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

      
    const data = await res.json();
    return data;
};

// Create title with link to bookshelf
const appendBookshelfLi = (bookshelf) => {
    var li = document.createElement('li');
    li.innerHTML = `${bookshelf.name}`;
    li.className = 'bookshelf-list-item';
    const bookshelfList = document.querySelector('.bookshelf-list');
console.log(bookshelfList)
    li.addEventListener('click', () => populateBookshelfBookList(bookshelf.id))
    bookshelfList.appendChild(li);
};

const openCreateNewBookshelfField = async () => {

    const addBookshelfButton = document.querySelector('#add-new-bookshelf__button');
    const newBookshelfForm = document.querySelector('#add-new-bookshelf__input-field');
    // Display form field
    newBookshelfForm.classList.remove('hidden');

    // Change button type
    setTimeout(function () {
        addBookshelfButton.removeAttribute('type');
        addBookshelfButton.type = 'submit';

        newBookshelfForm.addEventListener('submit', async e => {
            e.preventDefault();

            const formData = new FormData(newBookshelfForm);
            const newBookshelfName = formData.get('newBookShelfName');
            const _csrf = formData.get('_csrf');

            const body = { newBookshelfName, _csrf }
            const res = await fetch('/api-user', {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            const { bookshelf } = data;
            appendBookshelfLi(bookshelf);
            newBookshelfForm.classList.add('hidden');
            addBookshelfButton.removeAttribute('type').type = 'button';
        });
    }, 1000);
};

export const populateUserBookshelfList = async () => {
    const { shelves } = await getBookshelves();
    
    if(shelves) { 
        for (let bookshelf of shelves) {
        console.log('bookshelf', bookshelf)
        appendBookshelfLi(bookshelf);
    }
}

    const addBookshelfButton = document.querySelector('#add-new-bookshelf__button');
    addBookshelfButton.addEventListener("click", openCreateNewBookshelfField);
};
