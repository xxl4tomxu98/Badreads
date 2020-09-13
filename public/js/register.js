
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
