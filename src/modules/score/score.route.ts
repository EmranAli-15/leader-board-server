import express from "express";
import { scoreControllers } from "./score.controller";
import { Auth } from "../../utils/auth";
const route = express.Router();

route.post("/addScore", Auth("admin"), scoreControllers.addScore);
route.patch("/updateScore", Auth("admin"), scoreControllers.updateScore);
route.get("/getAllTotalScore", scoreControllers.getAllTotalScore);
route.get("/getSingleUserScores/:userId", scoreControllers.getSingleUserScores);
route.delete("/deleteScore/:scoreId", Auth("admin"), scoreControllers.deleteScore);

export const scoreRoutes = route;