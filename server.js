const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.post("/grade", (req, res) => {
  const name = req.body.name;
  const marks = req.body.marks.split(",").map(Number);

  const total = marks.reduce((a, b) => a + b, 0);
  const avg = total / marks.length;

  let grade;
  if (avg >= 90) grade = "A";
  else if (avg >= 75) grade = "B";
  else if (avg >= 60) grade = "C";
  else if (avg >= 45) grade = "D";
  else grade = "F";

  res.send(`
    <h2>Student Report</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Total:</strong> ${total}</p>
    <p><strong>Average:</strong> ${avg.toFixed(2)}</p>
    <p><strong>Grade:</strong> ${grade}</p>
    <a href="/">Go Back</a>
  `);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
