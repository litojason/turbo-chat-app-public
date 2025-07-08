import { Router } from "express";

import * as userController from "../controllers/user";
import { isAuthenticated } from "../middlewares/authentication";

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/register", userController.postUser);
userRouter.post("/login", userController.postLogin);

userRouter.get("/profile", isAuthenticated, userController.getProfile);
userRouter.put("/profile", isAuthenticated, userController.updateProfile);

export default userRouter;
