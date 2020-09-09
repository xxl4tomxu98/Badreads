import { handleErrors } from './utils.js'

const bookTitle = document.querySelector('.container_book-info_title')
const bookAuthor = document.querySelector('.container_book-info_author')
const bookDescription = document.querySelector('.container_book-info_description')
const form = document.querySelector('.container_form')
const container = document.querySelector('.container')

const fetchBook = async (id) => {
    const response = await fetch(`/api-books/${id}`)
    const { book } = await response.json()

    bookTitle.innerHTML = `<strong>${book.title}</strong>`
    bookAuthor.innerHTML = `by author <strong>${book.author}</strong>`
    bookDescription.innerHTML = book.description
}

// const handleResponse = ( res ) => {
//     if(!res.ok){
//         throw res
//     }

//    return res.json()
// }

window.addEventListener('DOMContentLoaded', async()=>{
    try{
        await fetchBook(2)    
    } catch(e) {
        handleErrors(e)
        console.log(e)
    }

        
})

form.addEventListener('submit', (e)=>{
    const reviewInput = document.querySelector('.container_reviews_input')
    e.preventDefault()
    
    let review;
    if(reviewInput.value != ''){
        console.log('hey')
        const reviewContainer = document.createElement('div')
        reviewContainer.classList.add('container_reviews')
        review = reviewInput.value

        reviewInput.value = ''
    
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
                        <a class='container_reviews_readmore' href="#">
                                readmore
                        </a> 
                    </div>
            `
            
            reviewContainer.innerHTML = newReview
            container.appendChild(reviewContainer)


        }

        addNewReview(review)

        return 

    }

})

