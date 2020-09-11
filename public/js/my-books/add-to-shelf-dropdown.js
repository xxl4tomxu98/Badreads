export const createAddToShelfDropdown = async(bookId, bookshelfId) => {
    const res = await fetch(`api-user/${bookshelfId}/${bookId}`);
    const bookshelves = await res.json();
    let dropdownForm = document.createElement('form');
    // dropdownForm.action = `/${bookId}/add-to-bookshelf`
    // dropdownForm.method = 'POST'
    let dropdown = document.createElement('select');
    dropdown.classList = 'add-bookshelf-dropdown'
    //dropdown.onchange = 'this.form.submit()'
    for (let shelf of bookshelves.allShelvesWithoutBook) {
        dropdown.appendChild(new Option(shelf.name, shelf.id));
    };
    return dropdown;
};
