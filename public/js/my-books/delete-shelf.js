import {populateUserBookshelfList} from './get-bookshelf-list.js';


export const shelfDelete = (shelfId) => {
  console.log('delete shelf clicked')
  return async () => {
    try {
      const res = await fetch(`/api-user/shelves/${shelfId}`, {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem(
        //     "TWITTER_LITE_ACCESS_TOKEN"
        //   )}`,
        //},
      });

      const data = await res.json();
      console.log(data);
      // window.location.reload();

      if (!res.ok) {
        throw res;
      }

      populateUserBookshelfList();
    } catch (err) {
      console.error(err);
    }
  }
};
