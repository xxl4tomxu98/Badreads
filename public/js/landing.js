import { handleErrors } from './utils.js'

const quoteArea = document.querySelector('.quote-generator-quote')
const signUpForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form')
const ghandiQuotes= [
    '"An eye for eye only ends up making the whole world blind."',
    '"Happiness is when what you think, what you say, and what you do are in harmony."',
    '"Where there is love there is life."'
]
const randomNumGen = () => {
    return Math.floor(Math.random() * Math.floor(2))
}

window.addEventListener('DOMContentLoaded', () => {
    const randomNum = randomNumGen()
    quoteArea.innerHTML = ghandiQuotes[randomNum] + '   -Ghandi'
})

//logic for signing up
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    //grab formdata from signup form
    const formData = new FormData(signUpForm)
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    //create body to pass into post req later
    const body = { username, email, password }

    try {
        const res = await fetch("/auth-user", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        //fetches don't catch errors other than network failures so you
        //have to check to see if it's another res beside 200 ok and throw an error so
        //that the handleErrors ftn will catch them
        if (!res.ok) {
            throw res;
          }

          //previous post req to user route in user-api.js will send back a generated token for the user
          //and user info. destructure to extract info
          const {
            token,
            user: { id },
          } = await res.json();

          //add current user info to local storage
          localStorage.setItem("BADREADS_ACCESS_TOKEN", token);
          localStorage.setItem("BADREADS_CURRENT_USER_ID", id);

          //redirect user to my-books page after login to display shelves
          window.location.href = "/register";

      }catch(err){
          console.log(err)
          handleErrors(err, '.signup-errors-container')
      }

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
