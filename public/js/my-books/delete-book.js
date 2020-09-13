import { populateBookshelfBookList } from './get-bookshelf-books.js';


export const bookDelete = (shelfId, bookId) => {
  return async () => {
    //try {
      const res = await fetch(`/api-user/shelves/${shelfId}/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
              "BADREADS_ACCESS_TOKEN"
          )}`,
        }
      });

      const bookshelfDropdown = document.querySelector('.bookshelf-books__dropdown');
      bookshelfDropdown.innerHTML = '';

      // if (!res.ok) {
      //   throw res;
      // }
      //const { message, updatedBooks } = await res.json();
      populateBookshelfBookList(shelfId);
    // } catch (err) {
    //   console.error(err);
    // }
  };
};
