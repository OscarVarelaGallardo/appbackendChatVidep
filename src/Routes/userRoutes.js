
import { Router } from "express";
import { getUsers, getUserById, createUser
} from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:id', getUserById);
userRoutes.post('/users', createUser);


export default userRoutes;