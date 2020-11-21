import { handleErrors } from './utils.js'
import { createAddToShelfDropdown } from './my-books/add-to-shelf-dropdown.js'

const bookTitle = document.querySelector('.bookpage-container__book-info__title')
const bookAuthor = document.querySelector('.bookpage-container__book-info__author')
const bookDescription = document.querySelector('.bookpage-container__book-info__description')
const form = document.querySelector('.bookpage-container__form')
const allReviewsContainer = document.querySelector('.container__all-reviews');

//elements for readmore ellipses
const readmore = document.querySelectorAll('.container__reviews__readmore')
const readmoreText = document.querySelectorAll('.readmore-text')
const ellipses = document.querySelectorAll('.ellipses')

const userId = localStorage.getItem('BADREADS_CURRENT_USER_ID')
const bookId = window.location.pathname.split('/')[2]

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
}

const addNewReview = (review) => {
    const reviewContainer = document.createElement('div')
    reviewContainer.classList.add('container__reviews')

    let newReview;
    // to add ellipses for reviews that are over 250 characters in length
    if (review.length > 260) {
        newReview = `
                        <div class='container__reviews___star'>
                            <p class='container__reviews__text'>
                                    ${review.slice(0, 250)}
                                    <span class='ellipses'>...</span>
                                    <span class='readmore-text hide'>${review.slice(250)}</span>
                            </p>
                        </div>
                        <div class='container__reviews__text'>
                            <p class='container__reviews__readmore'>
                                    readmore
                            <p/>
                        </div>
                    `
        reviewContainer.innerHTML = newReview
        allReviewsContainer.prepend(reviewContainer)

        //add readmore button event listener when review added
        //had to add seperately since page doesn't refresh when review is added and the event listener doesn't
        //get add until the page is refreshed reflected by code at line 166
        const newReviewReadmoreButton = document.querySelector('.container__reviews__readmore')
        const newReviewReadmoreText = document.querySelector('.readmore-text')
        const newReviewEllipses = document.querySelector('.ellipses')
        newReviewReadmoreButton.addEventListener('click', (e) => {
            if (newReviewReadmoreText.classList.contains('hide')) {
                //reveal hidden text
                newReviewReadmoreText.classList.toggle('hide', false)
                //change reamdmore button to readless
                newReviewReadmoreButton.innerHTML = 'readless'
                //hide the ellipses
                newReviewEllipses.classList.toggle('hide', true)
            } else {
                //hide the text
                newReviewReadmoreText.classList.toggle('hide', true)
                //change button back to readmore
                newReviewReadmoreButton.innerHTML = 'readmore'
                //reveal the ellipses
                newReviewEllipses.classList.toggle('hide', false)
            }
        })

    } else {
        newReview = `
                        <div class='container__reviews___star'>
                            <p class='container__reviews__text'>
                                    ${review}
                            </p>
                        </div>
                    `
        reviewContainer.innerHTML = newReview
        allReviewsContainer.prepend(reviewContainer)
    }
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
            allReviewsContainer.innerHTML = ''
            const { reviews } = await res.json()

            if (reviews) {
                for (let eachReview of reviews) {
                    addNewReview(eachReview.description)
                }
            }
            //clear input
            reviewInput.value = ''

            //scroll back to top of page
            window.scroll(0,0)
        } else {
            return
        }
    } catch (e) {
        console.log(e)
        handleErrors(e)
    }
})

//readmore funtionality to reveal rest of reviews after 250 characters
readmore.forEach((readmoreButton, i) => {
    //give each readmore button an id that will relate to the ellipses and readmoretext id
    readmoreButton.setAttribute('id', i)
    readmoreButton.addEventListener('click', (e) => {
        let relatedId = e.target.id
        if (readmoreText[relatedId].classList.contains('hide')) {
            //reveal hidden text
            readmoreText[relatedId].classList.toggle('hide', false)
            //change reamdmore button to readless
            readmoreButton.innerHTML = 'readless'
            //hide the ellipses
            ellipses[relatedId].classList.toggle('hide', true)
        } else {
            //hide the text
            readmoreText[relatedId].classList.toggle('hide', true)
            //change button back to readmore
            readmoreButton.innerHTML = 'readmore'
            //reveal the ellipses
            ellipses[relatedId].classList.toggle('hide', false)
        }
    })
})