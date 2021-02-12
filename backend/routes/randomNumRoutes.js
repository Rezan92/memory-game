import express from "express";
import { getRandomNums } from "../controllers/randomNumController.js";

const router = express.Router();

router
  .route("/numbers")
  .get((req, res) => {
    res.send("Welcome to the Random Numbers Route");
  })
  .post(getRandomNums);

export default router;
