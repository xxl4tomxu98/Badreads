import { populateBookshelfBookList } from './get-bookshelf-books.js'

// Get shelves
const getBookshelves = async () => {
    const res = await fetch('/api-user/shelves', {
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
    li.addEventListener('click', () => populateBookshelfBookList(bookshelf.id))
    bookshelfList.appendChild(li);
};

const openCreateNewBookshelfField = async () => {
    const addBookshelfButton = document.querySelector('#add-new-bookshelf__button');
    const newBookshelfFormField = document.querySelector('#add-new-bookshelf__input-field')

    // Display form field // hide button
    addBookshelfButton.classList.add('hidden');
    newBookshelfFormField.classList.remove('hidden');
};

export const populateUserBookshelfList = async () => {
    const newBookshelfFormField = document.querySelector('#add-new-bookshelf__input-field')
    const addBookshelfButton = document.querySelector('.buttonButton');
    const newBookshelfForm = document.querySelector('.add-bookshelf-form')
    const { shelves, username } = await getBookshelves();

    var capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1)
    document.getElementById('welcome').innerHTML = `Welcome ${capitalizedUsername}!`


    if (shelves) {
        for (let bookshelf of shelves) {
            appendBookshelfLi(bookshelf);
        }
    }

    addBookshelfButton.addEventListener("click", openCreateNewBookshelfField);

    newBookshelfForm.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(newBookshelfForm);
        const newBookshelfName = formData.get('newBookshelfName');

        const body = {newBookshelfName}

        const res = await fetch('/api-user/shelves', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "BADREADS_ACCESS_TOKEN"
                )}`,
                "Content-Type": "application/json"
            }
        });

        //return newly created bookshelf
        const data = await res.json();
        const { bookshelf } = data;

        appendBookshelfLi(bookshelf);

        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('overlay-hidden');
        overlay.innerHTML = `'${newBookshelfName}' added to your shelves!`
        newBookshelfFormField.classList.add('hidden');
        addBookshelfButton.classList.remove('hidden');

        setTimeout(() => {
            overlay.classList.add('overlay-hidden');
        }, 3000)
    });
};
