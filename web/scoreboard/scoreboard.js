const sample = {
  name: "Dummy user",
  win: 13,
  loss: 2,
  score: 1400,
};


const tableBody = document.getElementById("table-body");
for (let i = 0; i <20; i++) {
  const row = document.createElement("tr");

  const count = document.createElement("td");
  const name = document.createElement("td");
  const score = document.createElement("td");
  //   const wins = document.createElement("td");
  //   const losses = document.createElement("td");

  count.textContent = i + 1;
  count.classList.add("score-count");
  name.textContent = sample.name;
  //   wins.textContent = data[i].win;
  //   losses.textContent = data[i].loss;
  score.textContent =sample.score;
  row.appendChild(count);
  row.appendChild(name);
  row.appendChild(score);

  tableBody.appendChild(row);
}
