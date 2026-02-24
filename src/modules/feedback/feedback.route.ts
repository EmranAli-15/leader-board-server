import express from "express";
import { feedbackControllers } from "./feedback.controller";
const route = express.Router();

route.post("/addFeedback", feedbackControllers.createFeedback);
route.get("/getSingleFeedback/:userId", feedbackControllers.getSingleFeedback);

export const feedbackRoutes = route;