// import { handleErrors } from './utils.js'

// to obtain any information stored in local storage related to user's genre selections
const genreInfo = JSON.parse(localStorage.getItem('genreInfo')) || {};
// select all the checkboxes
const genreSelections = document.querySelectorAll('genre-container__checkbox');
// listen for a change on the boxes and iterate to update our key value pairs
genreSelections.addEventListener("change", event => {

  genreSelections.forEach(() => {
    genreInfo[this.id] = this.checked;
  });
  // set new value of user genre selections in local storage
  localStorage.setItem("genreInfo", JSON.stringify(genreInfo));
  window.location.href = "user/shelves";
});

// when the page loads set the checkboxes
genreInfo.forEach((key, value) => {
  ('#' + key).checked = value;
});


// const updateGenres = document.querySelector('.genre-container__form');

// updateGenres.addEventListener('submit', event => {
//   event.preventDefault();

//   // const favoriteGenres = document.querySelectorAll('input[type="checkbox"]:checked');
//   // for (let favoriteGenre of favoriteGenres) {
//   //   if (checkbox.checked)
//   //     document.body.append(checkbox.value + ' ')
//   // }

//   const formData = new FormData(updateGenres)
//   try {
//   const res = await fetch('/user/shelves/user-profile', {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });

//   const data = await res.json();
//   if (!res.ok) {
//     throw res;
//   }


//   window.location.href = "/user/shelves";
// });

// const formData = new FormData(signUpForm)
// const username = formData.get('username')
// const email = formData.get('email')
// const password = formData.get('password')

// //create body to pass into post req later
// const body = { username, email, password }

// try {
//   const res = await fetch("/auth-user", {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   //fetches don't catch errors other than network failures so you
//   //have to check to see if it's another res beside 200 ok and throw an error so
//   //that the handleErrors ftn will catch them
//   if (!res.ok) {
//     throw res;
//   }

//   //previous post req to user route in user-api.js will send back a generated token for the user
//   //and user info. destructure to extract info
//   const {
//     token,
//     user: { id },
//   } = await res.json();

//   //add current user info to local storage
//   localStorage.setItem("BADREADS_ACCESS_TOKEN", token);
//   localStorage.setItem("BADREADS_CURRENT_USER_ID", id);

//   //redirect user to my-books page after login to display shelves
//   window.location.href = "/register";

// } catch (err) {
//   console.log(err)
//   handleErrors(err, '.signup-errors-container')
// }

// })

//event listener on genre selections and redirect to user/shelves
