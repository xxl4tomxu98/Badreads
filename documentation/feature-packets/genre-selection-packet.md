# Favorite Genres FEATURE PACKET

### User Story
---
As a registering user,
I want to be able to select my favorite genres
So that I can get relevant information in searches.

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
  - reviews_id
  - genre_id

> to be built

- Genre
  - name

- join table Users_Genre
  - user_id
  - genre_id

### Endpoints
---

/favorite_genres

redirect to /bookshelf

### Templates
---

favgenres.pug


### Sketches?
![Model](../images/table-model-diagram.png)
---
