export const createAddToShelfDropdown = async(bookId, hidden) => {
    const res = await fetch(`http://localhost:8080/api-user/excluded-shelves/books/${bookId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "BADREADS_ACCESS_TOKEN"
          )}`,
        },
      });

    const bookshelves = await res.json();

    const dropdownForm = document.querySelector('.drop-down-form')
    const dropdownFormButton = document.querySelector('.drop-down-form__button');
    const dropdownFormSelect = document.querySelector('.drop-down-form__select');
    if(hidden) {
      dropdownForm.classList.remove('hidden');
    }
    if(bookshelves) {
        for (let shelf of bookshelves.allShelvesWithoutBook) {
            const option = new Option(shelf.name, shelf.id);
            option.classList = 'add-to-bookshelf-dropdown__option'
            dropdownFormSelect.appendChild(option);
        };
      }
/* =======
export const createAddToShelfDropdown = async(bookId, bookshelfId) => {
                                    //this route returns object of filtered array of shelves without current book
    const res = await fetch(`api-user/excluded-shelves/${bookshelfId}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "BADREADS_ACCESS_TOKEN"
          )}`,
        },
      }); */

//       //redirect user to login page if not logged in which is on the landing page path('/')
//       if (res.status === 401) {
//         window.location.href = "/";
//         return;
//       }

//     const { allShelvesWithoutBook } = await res.json();
//     let dropdownForm = document.createElement('form');
//     // dropdownForm.action = `/${bookId}/add-to-bookshelf`
//     // dropdownForm.method = 'POST'
//     let dropdown = document.createElement('select');
//     dropdown.classList = 'add-to-bookshelf-dropdown'
//     //dropdown.onchange = 'this.form.submit()'
//     for (let shelf of allShelvesWithoutBook) {
//         const option = new Option(shelf.name, shelf.id);
//         option.classList = 'add-to-bookshelf-dropdown__option'
//         dropdown.appendChild(option);
// >>>>>>> 45740940e2159ebf1b74740c08238c2d83a8bb2d
    console.log(dropdownFormSelect)

    dropdownFormButton.addEventListener('click', async e => {
        e.preventDefault();
        console.log('in the event listener')
        // const formData = new FormData(dropdownForm);
        // console.log('dropdownForm', dropdownForm)
        // var selected_option_value = dropDownForm.elements["dropdownFormSelect"].options[selected_index].value
        // console.log(selected_option_value);

        // console.log(bookshelfName);
        var selector = dropdownFormSelect;
        var shelfId = selector[selector.selectedIndex].value;
        const bookshelfId = `${shelfId}`
        const body = { "bookshelfId": bookshelfId};
        const res = await fetch(`http://localhost:8080/api-user/${bookId}/add-book-to-shelf`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "BADREADS_ACCESS_TOKEN"
                  )}`,
                "Content-Type": "application/json"
            }
        });


        let response = await res.json()
        console.log('ADD BOOK =',response)
    });


    // dropdownForm.addEventListener('click', async (e) => {
    //     console.log('submitting');
    //     e.preventDefault();
    //     const formData = new FormData(form);
    //     const bookshelf = formData.get('bookshelf');

    //     const body = { bookshelf };
    //     await fetch(`/api-user/${bookId}/add-to-bookshelf`, {
    //       method: "POST",
    //       body: JSON.stringify(body),
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    // });
// });

    return dropdownFormSelect;

};
