import path from "path";
import express from "express";
import randomNumRoutes from "./routes/randomNumRoutes.js";

const app = express();

app.use(express.json());

app.use("/random", randomNumRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname + "/frontend")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "index.html"))
);

app.listen(5000, () => console.log("App is listening on port 5000"));
