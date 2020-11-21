import { handleErrors } from './utils.js'
const editButton = document.querySelector('.edit-button');
// Create genre names
const createGenreDiv = (genre, userId) => {

  let genreDiv = document.createElement('div');
  genreDiv.className = 'genre-in-profile';

  let genreCoverDiv = document.createElement('div');
  genreCoverDiv.className = 'genre-in-profile__genre-cover';

  let deleteGenreButton = document.createElement("button");
  deleteGenreButton.setAttribute("class", "genre-delete-button btn btn-info");

  let genreNameDiv = document.createElement('div');
  genreNameDiv.className = 'genre-in-profile__genre-name';
  genreNameDiv.innerHTML = `${genre.name}`;
  genreNameDiv.setAttribute("id", `${genre.id}`);

  deleteGenreButton.innerHTML = "x";
  genreNameDiv.appendChild(deleteGenreButton);
  genreDiv.appendChild(genreCoverDiv);
  genreDiv.appendChild(genreNameDiv);


  return genreDiv;

};

let userId = localStorage.getItem("BADREADS_CURRENT_USER_ID");

// Get genres for the user
const getUserGenres = async () => {
  const res = await fetch('/api-user/profile', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
          "BADREADS_ACCESS_TOKEN"
      )}`,
    }
  });
  const { genres } = await res.json();

  return genres;
};


export const populateUserGenres = async () => {
  const userGenres = document.querySelector('.container_favorite-genres');
  //const userName = document.querySelector('.user-name');
  const genres = await getUserGenres();
  userGenres.innerHTML = '';
  //userName.innerHTML = user.name;

  //add favorite genres header
  const favoriteGenreHeader = document.createElement('h3')
  favoriteGenreHeader.innerHTML = 'Favorite Genres:'
  favoriteGenreHeader.setAttribute('class', 'favorite-genres-header')
  userGenres.appendChild(favoriteGenreHeader)

  // add all genres from db
  for (let genre of genres) {
    const genreDiv = createGenreDiv(genre, userId);
    userGenres.appendChild(genreDiv);
  };
};

window.addEventListener("DOMContentLoaded", async () => {
  populateUserGenres();
  const genreContainer = document.querySelector('.container_favorite-genres');

  const res = await fetch('/api-user/username', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
          "BADREADS_ACCESS_TOKEN"
      )}`,
    }
  });
  const { user } = await res.json();
  const name = document.querySelector(".user-info__name");
  const email = document.querySelector(".user-info__email");
  name.innerHTML = `${user.username}`;
  email.innerHTML = `${user.email}`;

  genreContainer.addEventListener("click", async (event) => {

    const genreId = event.target.parentNode.id;

    const res = await fetch(`/api-user/profile/${genreId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
            "BADREADS_ACCESS_TOKEN"
        )}`,
      }
    });

    location.reload();
  });
})
