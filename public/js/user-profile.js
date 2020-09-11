import { handleErrors } from './utils.js'

let userId = 2;

// Get genres for the user
const getUserGenres = async () => {
  const res = await fetch('/api-user/profile');
  const { genres } = await res.json();
  return genres;
};

// Create genre names
const createGenreDiv = (genre, userId) => {

  let genreDiv = document.createElement('div');
  genreDiv.className = 'genre-in-profile';

  let genreCoverDiv = document.createElement('div');
  genreCoverDiv.className = 'genre-in-profile__genre-cover';

  let genreNameDiv = document.createElement('div');
  genreNameDiv.className = 'genre-in-profile__genre-name';
  genreNameDiv.innerHTML = `${genre.name}`;

  genreDiv.appendChild(genreCoverDiv);
  genreiv.appendChild(genreNameDiv);


  return genreDiv;

};


export const populateUserGenres = async () => {
  const userGenres = document.querySelector('.genre-list');
  //const userName = document.querySelector('.user-name');
  const genres = await getUserGenres();
  userGenres.innerHTML = '';
  //userName.innerHTML = user.name;

  for (let genre of genres) {
    const genreDiv = createGenreDiv(genre, userId);
    userGenres.appendChild(genreDiv);
  };
};
