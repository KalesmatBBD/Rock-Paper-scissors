// index.html javascript file
const accessToken = sessionStorage.getItem("Authorization")
const refreshToken = sessionStorage.getItem("RefreshToken")

fetch('http://localhost:4040/api/login', {
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AccessToken': accessToken,
          'RefreshToken': refreshToken,
        },
        body: JSON.stringify({})
})
.then(data => {
    console.log(data);
})