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
      wins: data.recordset[i].wins,
      losses: data.recordset[i].losses,
      score: data.recordset[i].score,
    });
    const row = document.createElement("tr");

    for (const column of ["count", "name", "wins", "losses", "score"]) {
      const cell = document.createElement("td");

      if (column === "count") {
        cell.classList.add("score-count");
        cell.textContent = i + 1;
      } else {
        cell.textContent = sample[i][column];
      }

      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
});
