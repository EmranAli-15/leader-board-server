import express from "express";
import { scoreControllers } from "./score.controller";
const route = express.Router();

route.post("/addScore", scoreControllers.addScore);
route.patch("/updateScore", scoreControllers.updateScore);

export const scoreRoutes = route;