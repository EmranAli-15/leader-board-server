import express from "express";
import { submissionControllers } from "./submission.controller";
const route = express.Router();

route.post("/addSubmission", submissionControllers.addSubmission);
route.get("/getSingleSubmission/:userId", submissionControllers.getSingleSubmission);

export const submissionRoutes = route;