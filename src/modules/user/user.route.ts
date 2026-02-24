import express from "express";
import { userControllers } from "./user.controller";
const route = express.Router();

route.post("/createUser", userControllers.createUser);
route.post("/loginUser", userControllers.loginUser);
route.patch("/updateUserData/:userId", userControllers.updateUserData);
route.patch("/changeUserPassword", userControllers.changeUserPassword);
route.get("/getUserData/:userId", userControllers.getUserData);
route.get("/getAllUser", userControllers.getAllUser);

export const userRoutes = route;