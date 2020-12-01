import { handleErrors } from './utils.js'

const loginForm = document.querySelector('.login-form')
const demoUserButton = document.querySelector('.demo-user')
const aboutLink = document.querySelector('.navbar-about-link')

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/about'){
    aboutLink.innerHTML = 'Home'
    aboutLink.setAttribute('href', '/')
  }
    // const id = localStorage.getItem("BADREADS_CURRENT_USER_ID")
})

//login logic
loginForm.addEventListener('submit', async (e) =>{
        e.preventDefault();
        const formData = new FormData(loginForm);
        const email = formData.get("email2");
        const password = formData.get("password2");
        const body = { email, password };
        try {
          const res = await fetch("/auth-user/token", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            throw res;
          }
          const {
            token,
            user: { id },
          } = await res.json();
          // storage access_token in localStorage:
          localStorage.setItem("BADREADS_ACCESS_TOKEN", token);
          localStorage.setItem("BADREADS_CURRENT_USER_ID", id);

          // redirect to home page to see all tweets:
          window.location.href = "/user/shelves";
        } catch (err) {
            console.log(err)
            handleErrors(err, '.login-errors-container')
      };
})

//demo user logic
demoUserButton.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const res = await fetch("/auth-user/token", {
      method: "POST",
      body: JSON.stringify({'email': 'demo@example.com', 'password': 'password'}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw res;
    }

    const {
      token,
      user: { id },
    } = await res.json();

    // storage access_token in localStorage:
    localStorage.setItem("BADREADS_ACCESS_TOKEN", token);
    localStorage.setItem("BADREADS_CURRENT_USER_ID", id);

    // redirect to home page to see all tweets:
    window.location.href = "/user/shelves";
  } catch (err) {
      console.log(err)
      handleErrors(err, '.login-errors-container')
};
})
