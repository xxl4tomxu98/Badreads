import { handleErrors } from './utils.js'

const bookTitle = document.querySelector('.container_book-info_title')
const bookAuthor = document.querySelector('.container_book-info_author')
const bookDescription = document.querySelector('.container_book-info_description')
const form = document.querySelector('.container_form')
const container = document.querySelector('.book-container')
const userId = localStorage.getItem('BADREADS_CURRENT_USER_ID')
const bookId = window.location.pathname.split('/')[2]
const addBookshelfSelect = document.querySelector('.container_genres_select')


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
    const { book } = await response.json()

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
    reviewContainer.classList.add('container_reviews')

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
            if (!res.ok) {
                throw res;
            }

            //remove previously displayed reviews
            while(container.firstChild.classList.contains('container_reviews')){
                container.removeChild(container.firstChild)
            }

            const { reviews } = await res.json()
            
            if(reviews){
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



