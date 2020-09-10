import {populateUserBookshelfList} from './get-bookshelf-list.js';


export const shelfDelete = (shelfId) => {
  return async () => {
    try {
      const res = await fetch(`/api-bookshelves/${shelfId}`, {
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
      populateUserBookshelfList();
    } catch (err) {
      console.error(err);
    }
  };
};
