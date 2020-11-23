[Live Link](https://aa-badreads.herokuapp.com/)

<div align="center">
  <h2>Table of Contents</h2>
</div>


- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)


<div align="center">
  <h2>Installation</h2>
</div>


### Installation
1. Clone this repository

    ```
    Clone this repo to your local machine using `https://github.com/tjtaylorjr/goodreads-clone.git`
    ```
<br>

2. Install dependencies

> install npm packages

    ```
    $ npm install
    ```
<br>
3. Create user and database (PSQL)

    ```
    - CREATE USER badreads_app WITH PASSWORD <<good password>>
    - CREATE DATABASE badreads WITH OWNER badreads_app
    ```
    
4. Create .env and add configuration model

    ```
    PORT=8080
    DB_USERNAME=badreads_app
    DB_PASSWORD=<<your good password>>
    DB_DATABASE=badreads
    DB_HOST=localhost
    JWT_SECRET=db848d54f348cf7e9606293213f1169870c2f2268217ba093f1d0049e9928117
    JWT_EXPIRES_IN=604800
    ```
5. 

5. Start it up

    ```shell
    $ npm start
    ```
    
> browse to http://localhost:8080
---

<div align="center">
  <h2>Features</h2>
</div>

- TBD

---

<div align="center">
  <h2>Usage</h2>
</div>

- TBD

---

<div align="center">
  <h2>Documentation</h2>
</div>

- TBD
---

<div align="center">
  <h2>Tests</h2>
</div>

- TBD
---

<div align="center">
  <h2>Contributing</h2>
</div>


> To get started...

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/tjtaylorjr/goodreads-clone.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/tjtaylorjr/goodreads-clone/compare" target="_blank">`https://github.com/tjtaylorjr/goodreads-clone/compare`</a>.

---

<div align="center">
  <h2>Team</h2>
</div>


| <a href="https://github.com/qsmity" target="_blank">**Quynn Smith**</a> | <a href="https://github.com/remaley5" target="_blank">**remaley5**</a> | <a href="https://github.com/tjtaylorjr" target="_blank">**TJ Taylor**</a> | <a href="https://github.com/xxl4tomxu98" target="_blank">**Tom Xu**</a> |
|:---:|:---:|:---:|:---:|
| [![Quynn Smith](https://avatars2.githubusercontent.com/u/31673566?s=138&u=8bb0cab66020f684771e32addc9a76c22f3e17cb&v=4)](https://github.com/qsmity) | <a href="https://avatars0.githubusercontent.com/u/16943507?s=200&v=4" target="_blank"><img src="https://avatars0.githubusercontent.com/u/16943507?s=200&v=4" alt="remaley5" width="138" height="138" /></a> | [![TJ Taylor](https://avatars3.githubusercontent.com/u/62177226?s=138&u=034c0f894dd93f9eb2ed8e43e3172ed83d19a9cc&v=4)](https://github.com/tjtaylorjr) | [![Tom Xu](https://avatars2.githubusercontent.com/u/62292177?s=138&u=f3954ecc585c9e882be86ec184c159720ef1951f&v=4)](https://github.com/xxl4tomxu98) |
| <a href="http://github.com/qsmity" target="_blank">`github.com/qsmity`</a> | <a href="https://github.com/remaley5" target="_blank">`github.com/remaley5`</a> | <a href="http://github.com/tjtaylorjr" target="_blank">`github.com/tjtaylorjr`</a> | <a href="http://github.com/xxl4tomxu98" target="_blank">`github.com/xxl4tomxu98`</a> |


---

<div align="center">
  <h2>FAQ</h2>
</div>


- **How do I do *that*?**
    - Easy! Just do **this**.

---
