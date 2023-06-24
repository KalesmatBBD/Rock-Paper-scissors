const sample = [];
let data;
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const result = await fetch("/api/scores/getScores");
    data = await result.json();
  } catch (error) {
    console.error(error);
  }

  const tableBody = document.getElementById("table-body");
  for (let i = 0; i < Math.min(data.recordset.length, 20); i++) {
    sample.push({
      name: data.recordset[i].username,
      score: data.recordset[i].score,
    });
    const row = document.createElement("tr");

    const count = document.createElement("td");
    const name = document.createElement("td");
    const score = document.createElement("td");
    count.classList.add("score-count");

    count.textContent = i + 1;
    name.textContent = sample[i].name;
    score.textContent = sample[i].score;
    row.appendChild(count);
    row.appendChild(name);
    row.appendChild(score);

    tableBody.appendChild(row);
  }
});
