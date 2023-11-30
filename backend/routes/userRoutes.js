import express from "express";
const router = express.Router();
import {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    authUser,
    logoutUser
} from "../controllers/userController.js";

router.route("/").post(addUser).get(getUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);

export default router;