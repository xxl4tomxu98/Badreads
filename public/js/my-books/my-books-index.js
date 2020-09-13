import {populateUserBookshelfList} from './get-bookshelf-list.js';

//need tom's profile hooked up to access user from profile fetch
// const welcomeHeader = document.querySelector('welcome')

document.addEventListener("DOMContentLoaded", async () => {
        populateUserBookshelfList();

        // const res = await fetch('/api-user/profile', {
        //         headers: {
        //           Authorization: `Bearer ${localStorage.getItem(
        //             "BADREADS_ACCESS_TOKEN"
        //           )}`,
        //         },
        //       })

        // const { user } = res.json()
        // welcomeHeader.innerHTML =  `Welcome ${user.username}!`
});
