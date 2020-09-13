
const genreInfo = JSON.parse(localStorage.getItem('genreInfo')) || {};
// const activeInfo = JSON.parse(localStorage.getItem('activeInfo')) || {};
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

// function updateActive() {
//   $checkboxes.each(function () {
//     if($(this).is(":checked")) {
//       $(this).attr("id").addClass("active");
//     } else {
//       $(this).attr("id").removeClass("active");
//     }
//   })
// }

  genreInfo["buttonText"] = $selectAllButton.text();
  localStorage.setItem("genreInfo", JSON.stringify(genreInfo));
  // localStorage.setItem("activeInfo", JSON.stringify(activeInfo));
}

$selectAllButton.on("click", function () {
  handleButtonClick();
  updateButtonStatus();
  // updateActive();
  updateStorage();
});

$checkboxes.on("change", function () {
  updateButtonStatus();
  // updateActive();
  updateStorage();
});

// On page load
$.each(genreInfo, function (key, value) {
  $("#" + key).prop('checked', value);
  // updateActive();
});



$selectAllButton.text(genreInfo["buttonText"]);


$submitButton.on("click", function ( event ) {
  event.preventDefault();
  $(location).attr('href', '/user/shelves');
})


// old Code

// import { handleErrors } from './utils.js'

// // to obtain any information stored in local storage related to user's genre selections
// const genreInfo = JSON.parse(localStorage.getItem('genreInfo')) || {};
// // select all the checkboxes
// // const genreSelections = document.querySelectorAll('input[type="checkbox"]:checked'), values = [];
// const genreSelections = document.querySelectorAll('.genre-container__checkbox'), values = [];

// // select  button
// const selectAllButton = document.getElementById('genre-select-all-button');
// // listen for a change on the boxes and iterate to update our key value pairs
// function isChecked(checkbox) {
//   return checkbox.checked === true;
// }

// let allChecked = () => genreSelections.length === genreSelections.filter(isChecked(checkbox));

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
