import express from "express";
import randomNumRoutes from "./routes/randomNumRoutes.js";

const app = express();

app.use(express.json());

app.use("/random", randomNumRoutes);

app.get("/", (req, res) => {
  res.send("Hey, Server is running :)");
});

app.listen(5000, () => console.log("App is listening on port 5000"));
