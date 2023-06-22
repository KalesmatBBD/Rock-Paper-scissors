let usernameEl;
let passwordEl;

window.onload=function() {
    createForm()
}

const createInput = (id, type, name, placeholder) => {
    const section = document.createElement('section');
    section.classList.add('form-field')
    
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

const submitSignIn = (registration) => {
    fetch('http://localhost:8080/login', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registration)
    })
    .then(response => {
        console.log(response.status);
        if (response.status === 200) {
            window.location.href = '/';
        }
    });
}

const submitButtonEventListener = (button) => {
    button.addEventListener('click', (e) => {
        let isUsernameValid = checkUsername(),
            isPasswordValid = checkPassword();

        let isFormValid = isUsernameValid &&
            isPasswordValid;
        if (isFormValid) {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            submitSignIn({username, password})
        };
    })
}

const cancelButtonEventListener = (button) => {
    button.addEventListener('click', (e) => {
        window.location.href = '/';
    })
}

const createButton = (text, className) => {
    const button = document.createElement('button');
    button.classList.add(className);
    button.setAttribute('type', 'button');
    button.innerText = text;
    return button
}

const fromInputEventListener = (form) => {
    form.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'username':
                checkUsername();
                break;
            case 'password':
                checkPassword();
                break;
        }
    }));
}

const createForm = () => {
    const article = document.getElementById("card");
    const form = document.createElement('form')
    form.id = 'registerForm'
    article.appendChild(form);

    const username = createInput('username', 'text', 'Username', 'Username');
    form.appendChild(username)

    const password = createInput('password', 'password', 'Password', 'Password');
    form.appendChild(password)

    const signInButton = createButton('SIGN IN', 'signIn');
    submitButtonEventListener(signInButton);
    form.appendChild(signInButton);
    
    const cancelButton = createButton('CANCEL', 'cancel');
    cancelButtonEventListener(cancelButton);
    form.appendChild(cancelButton);

    usernameEl = document.querySelector('#username');
    passwordEl = document.querySelector('#password');
    
    fromInputEventListener(form);
}

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
}

const isUsernameValid = (username) => {
    const re = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])`);
    return re.test(username);
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const checkUsername = () => {
    let valid = false;
    const min = 5,
        max = 20;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    }
    else if (!isUsernameValid(username)) {
        showError(usernameEl, `Username must contain a-z A-Z or 0-9 characters.`)
    }
    else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    }
    else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    }
    else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    }
    else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

