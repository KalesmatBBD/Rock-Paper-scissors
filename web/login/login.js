let usernameEl;
let emailEl;
let passwordEl;
let confirmPasswordEl;

window.onload=function() {
    createForm()
}

const createInput = (id, type, name, placeholder) => {
    const section = document.createElement('section');
    section.classList.add('form-field')
    // section.classList.add('success')

    
    const input = document.createElement("input");
    input.setAttribute('id', id)
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('class', 'form__input');
    
    section.appendChild(input);
    const small = document.createElement('small');
    section.appendChild(small)
    return section;
}

const createForm = () => {
    const article = document.getElementById("card");
    const form = document.createElement('form')
    form.classList.add('login__form-container')
    form.id = 'loginForm'
    article.appendChild(form);

    const username = createInput('username', 'text', 'Username', 'Username');
    form.appendChild(username)

    const email = createInput('email', 'email', 'Email', 'Email');
    form.appendChild(email)

    const password = createInput('password', 'password', 'Password', 'Password');
    form.appendChild(password)

    const verifyPassword = createInput('verifyPassword', 'password', 'verifyPassword', 'Verify password');
    form.appendChild(verifyPassword)

    const button = document.createElement('button');
    button.classList.add('signIn');
    button.setAttribute('type', 'button');
    button.innerText = 'SIGN IN';
    button.addEventListener('click', (e) => {
        let isUsernameValid = checkUsername(),
            isEmailValid = checkEmail(),
            isPasswordValid = checkPassword(),
            isConfirmPasswordValid = checkConfirmPassword();

        let isFormValid = isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid;
        if (isFormValid) {
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const verifyPassword = document.getElementById("verifyPassword").value;
            console.log(username);
            console.log(email);

        }
    })
    form.appendChild(button)
    usernameEl = document.querySelector('#username');
    emailEl = document.querySelector('#email');
    passwordEl = document.querySelector('#password');
    confirmPasswordEl = document.querySelector('#verifyPassword');
    form.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'username':
                checkUsername();
                break;
            case 'email':
                checkEmail();
                break;
            case 'password':
                checkPassword();
                break;
            case 'verifyPassword':
                checkConfirmPassword();
                break;
        }
    }));    
}

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

