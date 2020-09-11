import { populateBookshelfBookList } from './get-bookshelf-books.js';


export const bookDelete = (bookId, shelfId) => {
  return async () => {
    try {
      const res = await fetch(`/api-bookshelves/${shelfId}/books/${bookId}`, {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem(
        //     "TWITTER_LITE_ACCESS_TOKEN"
        //   )}`,
        //},
      });
      if (!res.ok) {
        throw res;
      }
      const { message, updatedBooks } = await res.json();
      populateBookshelfBookList(shelfId);
    } catch (err) {
      console.error(err);
    }
  };
};
