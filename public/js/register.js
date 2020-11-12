const genreButtons = document.querySelectorAll('.genre-button')
const submitGenreButton = document.querySelector('.genre-submit-button')
const selectAllGenresButton = document.querySelector('.genre-select-all-button')
let genreArray = []
window.addEventListener('DOMContentLoaded', async (e) => {
  //get all the genres the user has and make all related buttons active 
  try {
    const res = await fetch('/api-user/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("BADREADS_ACCESS_TOKEN")}`
      }
    })

    if (!res.ok) {
      throw res
    }

    const { genres } = await res.json()
    const genreNamesArray = genres.map( genreObj => {
      genreArray.push(genreObj.name)
      return genreObj.name
    })
    console.log(genres)
    genreButtons.forEach( genreButton => {
      if (genreNamesArray.includes(genreButton.id)){
        genreButton.classList.toggle('active', true)
      }
    })

  } catch (e) {
    console.log(e)
  }

})

genreButtons.forEach((genreButton) => {
  genreButton.addEventListener('click', (e) => {
    e.preventDefault
    const genreName = e.target.id

    //if genre name is not in the array when button is clicked add it
    if (!(genreArray.includes(genreName))) {
      genreArray.push(genreName)
      //toggle active class to change background color on click
      e.currentTarget.classList.toggle('active', true)

      console.log(genreArray)
      return
      //if the genre name is in the array already when clicked then it needs to be removed because the user
      //unchecked the genre
    } else {
      genreArray = genreArray.filter((name) => {
        return name != genreName
      })
      e.currentTarget.classList.toggle('active', false)

      //incase the select all button is active, make it inactive if one genre is pressed
      selectAllGenresButton.classList.toggle('active', false)

      console.log(genreArray)

      return

    }

  })
})


selectAllGenresButton.addEventListener('click', (e) => {
  if (selectAllGenresButton.classList.contains('active')) {
    selectAllGenresButton.classList.toggle('active', false)

    //loop through all genres and make button inactive state
    genreButtons.forEach(genreButton => {
      genreButton.classList.toggle('active', false)
    })

    //clear genres
    genreArray = []

    return
  } else {
    //make select all button actice to change color
    selectAllGenresButton.classList.toggle('active', true)

    //empty genres array so prep array to add all genres
    genreArray = []

    //loop through all genres and add all to genreArray
    genreButtons.forEach(genreButton => {
      genreArray.push(genreButton.id)
      genreButton.classList.toggle('active', true)

    })
    return
  }
})

submitGenreButton.addEventListener('click', async (e) => {
  try {
    const res = await fetch('/api-user/profile/genres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("BADREADS_ACCESS_TOKEN")}`
      },
      body: JSON.stringify({ genreArray })
    })

    if (!res.ok) {
      throw res
    }

    const { successMessage } = await res.json()
    console.log(successMessage);
    window.location.href = '/user/shelves'

  } catch (e) {
    console.log(e)
  }

})