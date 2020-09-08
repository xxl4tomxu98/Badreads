# BOOK FEATURE PACKET

### User Story
---

As an authorized user,
I want to be able to see information about my books
In order to read user reviews

### Models
---

> dependent on
- User
  - username
  - email
  - hashedPassword

- Book
  - Author
  - Title
  - Description
  - ratings
  - reviews_id (won't be built yet)
  - genre_id (won't be built yet)

> to be built
- migration to add reviews_id
### Endpoints.
---

/books/:id


### Templates
---

book.pug
reviews.pug
create-review.pug

### Sketches?
![Model](../images/table-model-diagram.png)
---
