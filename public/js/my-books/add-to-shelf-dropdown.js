export const createAddToShelfDropdown = async(bookId, bookshelfId) => {
    //this route returns object of filtered array of shelves without current book
    const res = await fetch(`api-user/excluded-shelves/${bookshelfId}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "BADREADS_ACCESS_TOKEN"
          )}`,
        },
      });

      //redirect user to login page if not logged in which is on the landing page path('/')
      if (res.status === 401) {
        window.location.href = "/";
        return;
      }

    const { allShelvesWithoutBook } = await res.json();
    let dropdownForm = document.createElement('form');
    // dropdownForm.action = `/${bookId}/add-to-bookshelf`
    // dropdownForm.method = 'POST'
    let dropdown = document.createElement('select');
    dropdown.classList = 'add-to-bookshelf-dropdown'
    //dropdown.onchange = 'this.form.submit()'
    for (let shelf of allShelvesWithoutBook) {
        const option = new Option(shelf.name, shelf.id);
        option.classList = 'add-to-bookshelf-dropdown__option'
        dropdown.appendChild(option);
    };
    return dropdown;
};
