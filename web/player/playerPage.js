let data;
const accessToken = sessionStorage.getItem("Authorization");
const refreshToken = sessionStorage.getItem("RefreshToken");

if(accessToken == null && refreshToken == null){
  window.location.replace("/login");
}
function logout(){
  sessionStorage.removeItem("Authorization");
  sessionStorage.removeItem("RefreshToken");
}
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const result = await fetch('http://localhost:4040/api/player/getScore', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': accessToken,
        'RefreshToken': refreshToken,
      }
      });
    data = await result.json();
  } catch (error) {
    window.location.replace("/login");
  }
  
  document.getElementById("name").innerText = data[0].username;
  document.getElementById("wins").innerText = data[0].wins;
  document.getElementById("losses").innerText = data[0].losses;

});