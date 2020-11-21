import {populateUserBookshelfList} from './get-bookshelf-list.js';


export const shelfDelete = (shelfId) => {
  return async () => {
    try {
      const res = await fetch(`/api-user/shelves/${shelfId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
              "BADREADS_ACCESS_TOKEN"
          )}`,
        }
      });

      const data = await res.json();
      window.location.reload();

      if (!res.ok) {
        throw res;
      }

      populateUserBookshelfList();
    } catch (err) {
      console.error(err);
    }
  }
};
