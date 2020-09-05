# Profile FEATURE PACKET

### User Story
---

as a registerd user
I want to see and edit my information
so that others can see what I am interested in

### Models
---

>dependent on
- User
  - username
  - email
  - hashedPassword

- Genre
  - name

- join table Users_Genre
  - user_id
  - genre_id



### Endpoints
---

/user-profile

### Templates
---

profile.pug
genre-edit.pug

### Sketches?
![Model](../images/table-model-diagram.png)
---
