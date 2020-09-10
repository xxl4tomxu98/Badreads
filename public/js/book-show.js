import { handleErrors } from './utils.js'

const bookTitle = document.querySelector('.container_book-info_title')
const bookAuthor = document.querySelector('.container_book-info_author')
const bookDescription = document.querySelector('.container_book-info_description')
const form = document.querySelector('.container_form')
const container = document.querySelector('.container')
const userId = 2
const bookId = document.querySelector('.container_form_hidden').value

const reviewContainer = document.createElement('div')

const fetchBook = async (id) => {
    const response = await fetch(`/api-books/${id}`)
    const { book } = await response.json()
    
    bookTitle.innerHTML = `<strong>${book.title}</strong>`
    bookAuthor.innerHTML = `by author <strong>${book.author}</strong>`
    bookDescription.innerHTML = book.description
}

// const fetchReview = async (id) => {
//     const response = await fetch(`/api-reviews/${id}`)
//     const { review } = await response.json()


// }

const addNewReview = (review) => {

    const newReview =
        `
             <div class='container_reviews_star-container'>
                 <img class='container_reviews_star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
                 <img class='container_reviews_star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
                 <img class='container_reviews_star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
                 <img class='container_reviews_star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
                 <img class='container_reviews_star' src="../images/transparent-background-star-115497268824j1ftohfyn.png" alt="star">
             </div>
             <div class='container_reviews_text-container'>
                 <p class='container_reviews_text'>
                         ${review}
                 </p>
             </div>
             <div class='container_reviews_readmore-container'>
                 <a class='container_reviews_readmore' href='#'>
                         readmore
                 <a/>
             </div>
             </div>
     `
    reviewContainer.innerHTML = newReview
    container.prepend(reviewContainer)
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
    const reviewInput = document.querySelector('.container_reviews_input')
    e.preventDefault()

    let review;
    let bookId;
    
    if (reviewInput.value != '') {

        reviewContainer.classList.add('container_reviews')
        review = reviewInput.value

        reviewInput.value = ''

        //append review to grid on pug file
        addNewReview(review)


        try {
            //grabs the current book id from the hidden input in pug file
            if(document.querySelector('.container_form_hidden').value){
                bookId = document.querySelector('.container_form_hidden').value
            }

            //create new review in database
            const res = await fetch(`/api-reviews/${bookId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ description: review, user_id: userId, book_id: bookId })
            })
            if (!res.ok) {
                throw res;
            }


        } catch (e) {
            console.log(e)
            handleErrors(e)
        }
        return

    }

})

