import { handleErrors } from './utils.js'
import { createAddToShelfDropdown } from './my-books/add-to-shelf-dropdown.js'

const bookTitle = document.querySelector('.bookpage-container__book-info__title')
const bookAuthor = document.querySelector('.bookpage-container__book-info__author')
const bookDescription = document.querySelector('.bookpage-container__book-info__description')
const form = document.querySelector('.bookpage-container__form')
const container = document.querySelector('.book-container');
const allReviewsContainer = document.querySelector('.container__all-reviews');
const userId = localStorage.getItem('BADREADS_CURRENT_USER_ID')
const bookId = window.location.pathname.split('/')[2]
const addBookshelfSelect = document.querySelector('.container_genres_select');


// let id = localStorage.getItem("BADREADS_CURRENT_USER_ID")
// console.log('this is the current path: ', window.location.pathname)
// console.log(window.location.pathname.split('/'))
const fetchBook = async (bookId) => {
    const response = await fetch(`/api-books/${bookId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(
                "BADREADS_ACCESS_TOKEN"
            )}`,
        }
    }
    )

    //redirect user to login page if not logged in which is on the landing page path('/')
    if (response.status === 401) {
        window.location.href = "/";
        return;
    }
    const { book } = await response.json()
    createAddToShelfDropdown(bookId, false);

    bookTitle.innerHTML = `<strong>${book.title}</strong>`
    bookAuthor.innerHTML = `by author <strong>${book.author}</strong>`
    bookDescription.innerHTML = book.description
    // for(let shelf in shelves){
    //    const option = document.createElement('option')
    //    option.innerHTML = `${shelf.name}`
    //    option.setAttribute('value', `${shelf.id}`)
    //    addBookshelfSelect.appendChild(option)
    //                     //-     option(value=shelf.id) #{shelf.name}
    // }
}

// const fetchReview = async (id) => {
//     const response = await fetch(`/api-reviews/${id}`)
//     const { review } = await response.json()


// }

const addNewReview = (review) => {
    const reviewContainer = document.createElement('div')
    reviewContainer.classList.add('container__reviews')

    const newReview =
        `
             <div class='container__reviews__star-container'>
                 <img class='container__reviews__star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
                 <img class='container__reviews__star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
                 <img class='container__reviews__star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
                 <img class='container__reviews__star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
                 <img class='container__reviews__star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
             </div>
             <div class='container__reviews___star'>
                 <p class='container__reviews__text'>
                         ${review}
                 </p>
             </div>
             <div class='container__reviews__text'>
                 <a class='container__reviews__readmore' href='#'>
                         readmore
                 <a/>
             </div>
             </div>
     `
    reviewContainer.innerHTML = newReview
    allReviewsContainer.prepend(reviewContainer)
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        await fetchBook(bookId)
    } catch (e) {
        handleErrors(e)
        console.log(e)
    }


})

form.addEventListener('submit', async (e) => {
    const reviewInput = document.querySelector('.bookpage-container__reviews__input')
    e.preventDefault()

    try {
        //check review input is not emtpy before making fetch call
        if (reviewInput.value != '') {
            const writtenReview = reviewInput.value
            //create new review in database
            const res = await fetch(`/api-reviews/books/${bookId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "BADREADS_ACCESS_TOKEN"
                    )}`
                },
                body: JSON.stringify({ description: writtenReview, user_id: userId, book_id: bookId })
            })

            //redirect user to login page if not logged in which is on the landing page path('/')
            if (res.status === 401) {
                window.location.href = "/";
                return;
            }
            if (!res.ok) {
                throw res;
            }

            //remove previously displayed reviews
            while(container.firstChild.classList.contains('container__reviews')){
                container.removeChild(container.firstChild)
            }
            const { reviews } = await res.json()

            if (reviews) {
                for (let eachReview of reviews) {
                    addNewReview(eachReview.description)
                }
            }
            //clear input
            reviewInput.value = ''
        } else {
            return
        }
    } catch (e) {
        console.log(e)
        handleErrors(e)
    }
})
