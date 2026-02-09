import express from "express";
import { userControllers } from "./user.controller";
const route = express.Router();

route.post("/createUser", userControllers.createUser);
route.post("/loginUser", userControllers.loginUser);
route.patch("/updateUserData/:userId", userControllers.updateUserData);

export const userRoutes = route;