// import { handleErrors } from './utils.js'

// to obtain any information stored in local storage related to user's genre selections
// const genreInfo = JSON.parse(localStorage.getItem('genreInfo')) || {};
// // select all the checkboxes
// // const genreSelections = document.querySelectorAll('input[type="checkbox"]:checked'), values = [];
// const genreSelections = document.querySelectorAll('.genre-container__checkbox'), values = [];
// console.log(genreSelections);
// // select  button
// const selectAllButton = document.getElementById('genre-select-all-button');
// // listen for a change on the boxes and iterate to update our key value pairs
// function isChecked(checkbox) {
//   return checkbox.checked === true;
// }

// let allChecked = () => genreSelections.length === genreSelections.filter(isChecked(checkbox));
// console.
// genreSelections.addEventListener("change", event => {

//   genreSelections.forEach(() => {
//     genreInfo[this.id] = this.checked;
//   });
//   // set new value of user genre selections in local storage
//   localStorage.setItem("genreInfo", JSON.stringify(genreInfo));
//   window.location.href = "user/shelves";
// });

// // when the page loads set the checkboxes
// genreInfo.forEach((key, value) => {
//   ('#' + key).checked = value;
// });




// var isChecked = document.getElementById('elementName').checked;
// if (isChecked) { //checked
//   //execute code here
// } else { //unchecked
//   //execute code here
// }
// or if you want whenever the checkbox check is changed

// var checkbox = document.getElementById('elementName');
// checkbox.addEventListener("change", functionname, false);

// function functionname() {
//   var isChecked = checkbox.checked;
//   if (isChecked) { //checked

//   } else { //unchecked

//   }
// }

const genreInfo = JSON.parse(localStorage.getItem('genreInfo')) || {};
const $checkboxes = $("#availableGenres :checkbox");
const $selectAllButton = $("#genre-select-all");
const $submitButton = $("#genre-submit")

function allChecked() {
  return $checkboxes.length === $checkboxes.filter(":checked").length;
}

function updateButtonStatus() {
  $selectAllButton.text(allChecked() ? "Uncheck all" : "Check all");
}

function handleButtonClick() {
  $checkboxes.prop("checked", allChecked() ? false : true)
}

function updateStorage() {
  $checkboxes.each(function () {
    genreInfo[this.id] = this.checked;
  });

  genreInfo["buttonText"] = $selectAllButton.text();
  localStorage.setItem("genreInfo", JSON.stringify(genreInfo));
}

$selectAllButton.on("click", function () {
  handleButtonClick();
  updateButtonStatus();
  updateStorage();
});

$checkboxes.on("change", function () {
  updateButtonStatus();
  updateStorage();
});

// On page load
$.each(genreInfo, function (key, value) {
  $("#" + key).prop('checked', value);
});

$selectAllButton.text(genreInfo["buttonText"]);

$submitButton.on("click", function ( event ) {
  event.preventDefault();
  $(location).attr('href', '/user/shelves');
})

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
