// import { sign } from "jsonwebtoken";

 export const handleErrors = async (err, errorContainerClass) => {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const signupErrorContainer = document.querySelector('.signup-errors-container')
      const loginErrorContainer = document.querySelector('.login-errors-container')
      //clear error containers after each submission
      signupErrorContainer.innerHTML = ''
      loginErrorContainer.innerHTML = ''

      //grab the intended errors container
      const errorsContainer = document.querySelector(errorContainerClass);

      let errorsHtml = [
        `
          <div>
              Something went wrong. Please try again.
          </div>
        `,
      ];
      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `
            <div>
                ${message}
            </div>
          `
        );
      }
      errorsContainer.innerHTML = errorsHtml.join("");
    } else {
      alert(
        "Something went wrong. Please check your internet connection and try again!"
      );
    }
  };

  