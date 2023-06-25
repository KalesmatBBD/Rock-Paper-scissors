const player = [];
let data;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const obj = { user: "player1"  };
    console.log("tets");
    const result = await fetch("http://localhost:4040/api/player/getScore", {
      method: 'GET',
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
      });
    data = await result.json();
  } catch (error) {
    console.error(error);
  }

  player.push({
    name: data.recordset[0].username,
    wins: data.recordset[0].wins,
    losses: data.recordset[0].losses,
  });
  
  document.getElementById("name").innerHTML = player.name;
  document.getElementById("wins").innerHTML = player.wins;
  document.getElementById("losses").innerHTML = player.losses;

});