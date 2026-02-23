import express from "express";
import { submissionControllers } from "./submission.controller";
const route = express.Router();

route.post("/addSubmission", submissionControllers.addSubmission);

export const submissionRoutes = route;