import express from "express";
import { scoreControllers } from "./score.controller";
const route = express.Router();

route.post("/addScore", scoreControllers.addScore);
route.patch("/updateScore", scoreControllers.updateScore);
route.get("/getAllTotalScore", scoreControllers.getAllTotalScore);
route.get("/getSingleUserScores/:userId", scoreControllers.getSingleUserScores);

export const scoreRoutes = route;