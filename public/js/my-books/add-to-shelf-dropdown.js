export const createAddToShelfDropdown = async(bookId, bookshelfId) => {
    const res = await fetch(`api-user/${bookshelfId}/${bookId}`);
    const bookshelves = await res.json();

    const dropdownForm = document.querySelector('.drop-down-form')
    const dropdownFormButton = document.querySelector('.drop-down-form__button');
    const dropdownFormSelect = document.querySelector('.drop-down-form__select');

    dropdownForm.classList.remove('hidden');
    if(bookshelves) {
        for (let shelf of bookshelves.allShelvesWithoutBook) {
            const option = new Option(shelf.name, shelf.id);
            option.classList = 'add-to-bookshelf-dropdown__option'
            dropdownFormSelect.appendChild(option);
        };
    };
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
                "Content-Type": "application/json"
            }
        });

        let response = await res.json()
        console.log(response)
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
