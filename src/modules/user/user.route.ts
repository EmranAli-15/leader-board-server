import express from "express";
import { userControllers } from "./user.controller";
const route = express.Router();

route.post("/createUser", userControllers.createUser);
route.post("/loginUser", userControllers.loginUser);
route.patch("/updateUserData/:userId", userControllers.updateUserData);
route.patch("/changeUserPassword", userControllers.changeUserPassword);

export const userRoutes = route;